import { UAParser } from "ua-parser-js";

export interface DeviceInfo {
  browser?: {
    name?: string;
    version?: string;
  };
  os?: {
    name?: string;
    version?: string;
  };
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  cpu?: {
    architecture?: string;
  };
}

export interface GeolocationData {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  org?: string;
}

export const getUserDeviceInfo = async (): Promise<{
  success: boolean;
  data?: DeviceInfo;
  error?: string;
}> => {
  try {
    const uap = new UAParser();
    const result = uap.getResult();
    
    const deviceInfo: DeviceInfo = {
      browser: {
        name: result.browser.name,
        version: result.browser.version,
      },
      os: {
        name: result.os.name,
        version: result.os.version,
      },
      device: {
        model: result.device.model,
        type: result.device.type,
        vendor: result.device.vendor,
      },
      cpu: {
        architecture: result.cpu.architecture,
      },
    };
    
    return { success: true, data: deviceInfo };
  } catch (error) {
    console.error("Error getting user device info:", error);
    return { success: false, error: "Failed to get user device information" };
  }
};

export const getGeolocationData = async (): Promise<{
  success: boolean;
  data?: GeolocationData;
  error?: string;
}> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    const geolocationData: GeolocationData = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country_name: data.country_name,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
    };
    
    return { success: true, data: geolocationData };
  } catch (error) {
    console.error("Error getting geolocation data:", error);
    return { success: false, error: "Failed to get geolocation data" };
  }
};

export const getTrackingData = async () => {
  const [deviceResult, geoResult] = await Promise.all([
    getUserDeviceInfo(),
    getGeolocationData(),
  ]);

  return {
    deviceInfo: deviceResult.success ? deviceResult.data : null,
    geolocation: geoResult.success ? geoResult.data : null,
  };
};

// Visitor ID management
const VISITOR_ID_KEY = "ulp_visitor_id";

export const getOrCreateVisitorId = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  
  if (!visitorId) {
    // Generate a UUID v4 with VISITOR_ prefix and uppercase
    const uuid = crypto.randomUUID().toUpperCase();
    visitorId = `VISITOR_${uuid}`;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  
  return visitorId;
};

// Page info collection
export interface PageInfo {
  pageUrl: string;
  queryParam: string;
  pageSlug: string;
  referrer: string;
}

export const getPageInfo = (): PageInfo => {
  if (typeof window === "undefined") {
    return { pageUrl: "", queryParam: "", pageSlug: "", referrer: "" };
  }

  const fullUrl = window.location.href;
  const queryParam = window.location.search || "";
  const pageSlug = window.location.pathname;

  return {
    pageUrl: fullUrl,
    queryParam,
    pageSlug,
    referrer: document.referrer || "",
  };
};

// Track generic event
export const trackEvent = async (
  eventType: string,
  additionalData: Record<string, any> = {}
): Promise<{ success: boolean; error?: string }> => {
  try {
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) {
      return { success: false, error: "Could not get visitor ID" };
    }

    if (
      typeof window !== "undefined" &&
      (window.location.hostname.includes("localhost") ||
        window.location.hostname.includes("vercel.app"))
    ) {
      console.log(`Event detected (skipped): ${eventType}`, additionalData);
      return { success: true };
    }

    const pageInfo = getPageInfo();
    // For button clicks, we might not need full device/geo data every time to save bandwidth/latency,
    // but the API expects it or handles it. The API model has optional fields.
    // Let's send what we have or is cheap.
    // For consistency, let's just get everything. It's client side.
    const trackingData = await getTrackingData();

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId,
        eventType,
        pageUrl: pageInfo.pageUrl,
        queryParam: pageInfo.queryParam,
        pageSlug: pageInfo.pageSlug,
        referrer: pageInfo.referrer,
        deviceInfo: trackingData.deviceInfo,
        geolocation: trackingData.geolocation,
        ...additionalData,
      }),
    });

    if (!response.ok) {
        // Silent fail mostly
    }

    return { success: true };
  } catch (error) {
    console.error(`Error tracking event ${eventType}:`, error);
    return { success: false, error: "Failed to track event" };
  }
};

// Track page view event
export const trackPageView = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  return trackEvent("pageView");
};
