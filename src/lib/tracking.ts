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

// Track page view event
export const trackPageView = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) {
      return { success: false, error: "Could not get visitor ID" };
    }

    if (
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("vercel.app")
    ) {
      return { success: true };
    }

    const pageInfo = getPageInfo();
    const trackingData = await getTrackingData();

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId,
        eventType: "pageView",
        pageUrl: pageInfo.pageUrl,
        queryParam: pageInfo.queryParam,
        pageSlug: pageInfo.pageSlug,
        referrer: pageInfo.referrer,
        deviceInfo: trackingData.deviceInfo,
        geolocation: trackingData.geolocation,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Failed to track page view");
    }

    return { success: true };
  } catch (error) {
    console.error("Error tracking page view:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
