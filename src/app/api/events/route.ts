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
