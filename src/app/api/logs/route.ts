import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Log from "@/models/Log";

// POST - Create a new log entry
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { type, action, details, leadId } = body;

    // Validate required fields
    if (!type || !action) {
      return NextResponse.json(
        { success: false, message: "Type and action are required" },
        { status: 400 }
      );
    }

    if (!["user", "staff"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Type must be 'user' or 'staff'" },
        { status: 400 }
      );
    }

    // Get IP and User Agent from headers
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const log = await Log.create({
      type,
      action,
      details: details || null,
      leadId: leadId || null,
      ip,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Log created successfully",
        data: log,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create log",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve logs with optional filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const action = searchParams.get("action");
    const leadId = searchParams.get("leadId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // Build filter
    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;
    if (action) filter.action = action;
    if (leadId) filter.leadId = leadId;

    // Get total count for pagination
    const total = await Log.countDocuments(filter);

    const logs = await Log.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        data: logs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch logs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
