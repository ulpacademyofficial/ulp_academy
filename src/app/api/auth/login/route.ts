import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Log from "@/models/Log";
import { getIp } from "@/utils/getIp";

// Define allowed users
const ALLOWED_USERS = [
  { username: "sachin", password: process.env.SACHIN_PASSWORD || "admin@1215" },
  { username: "manohar", password: process.env.MANOHAR_PASSWORD || "manohar@ulp2025" },
  { username: "ulp_caller", password: process.env.ULP_CALLER_PASSWORD || "adminulp@2025" },
];

// Fallback for existing admin user if needed, or migration support
// Removed: const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
// Removed: const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ulp@2024";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { username, password } = body;

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check against allowed users
    const user = ALLOWED_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Log successful login
      const ip = await getIp(request);
      const userAgent = request.headers.get("user-agent") || "unknown";
      
      const host = request.headers.get("host") || "";
      const isRestricted = host.includes("localhost") || host.includes("vercel.app");

      if (!isRestricted) {
        await Log.create({
          type: "staff",
          action: "login",
          details: { username },
          ip,
          userAgent,
        });
      }

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: { username },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
