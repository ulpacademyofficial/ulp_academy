import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      visitorId,
      eventType,
      pageUrl,
      queryParam,
      pageSlug,
      referrer,
      deviceInfo,
      geolocation,
    } = body;

    // Validation
    if (!visitorId || !pageUrl || !pageSlug) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: visitorId, pageUrl, pageSlug" },
        { status: 400 }
      );
    }

    // Check for restricted domains
    const host = request.headers.get("host") || "";
    if (host.includes("localhost") || host.includes("vercel.app")) {
      return NextResponse.json(
        { success: true, message: "Event ignored on restricted domain" },
        { status: 200 }
      );
    }

    // Create event
    const event = await Event.create({
      visitorId,
      eventType: eventType || "pageView",
      pageUrl,
      queryParam: queryParam || "",
      pageSlug,
      referrer: referrer || "",
      deviceInfo: deviceInfo || null,
      geolocation: geolocation || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event tracked successfully",
        data: { id: event._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to track event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all events with pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const total = await Event.countDocuments();
    const events = await Event.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        data: events,
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
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

