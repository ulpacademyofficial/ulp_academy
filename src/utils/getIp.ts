import { NextRequest } from "next/server";

export async function getIp(request: NextRequest): Promise<string> {
  let ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  
  // Handle multiple IPs in x-forwarded-for (client, proxy1, proxy2...)
  if (ip && ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }

  // If local, try to get public IP
  if (ip === "::1" || ip === "127.0.0.1" || ip === "unknown") {
    try {
      const response = await fetch("https://api.ipify.org/?format=json", {
        next: { revalidate: 3600 } // Cache for 1 hour to avoid spamming
      });
      if (response.ok) {
        const data = await response.json();
        return data.ip;
      }
    } catch (error) {
      console.warn("Failed to fetch public IP:", error);
    }
  }

  return ip;
}
