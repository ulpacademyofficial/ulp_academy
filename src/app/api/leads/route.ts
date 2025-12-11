import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Log from "@/models/Log";
import { getIp } from "@/utils/getIp";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, phone, degree, course, deviceInfo, geolocation } = body;

    // Validation
    if (!name || !email || !phone || !degree) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if lead already exists with same email or phone
    const existingLead = await Lead.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingLead) {
      // Update existing lead instead of creating duplicate
      existingLead.name = name;
      existingLead.degree = degree;
      if (course) existingLead.course = course;
      if (deviceInfo) existingLead.deviceInfo = deviceInfo;
      if (geolocation) existingLead.geolocation = geolocation;
      await existingLead.save();

      // Log lead update
      const ip = await getIp(request);
      const userAgent = request.headers.get("user-agent") || "unknown";
      await Log.create({
        type: "user",
        action: "lead_updated",
        details: { name, email, phone, degree, course },
        leadId: existingLead._id,
        ip,
        userAgent,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Lead updated successfully",
          data: existingLead,
        },
        { status: 200 }
      );
    }

    // Create new lead
    const lead = await Lead.create({
      name,
      email,
      phone,
      degree,
      course: course || undefined,
      source: "nios-open-board",
      deviceInfo: deviceInfo || undefined,
      geolocation: geolocation || undefined,
    });

    // Log new lead submission
    const ip = await getIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    await Log.create({
      type: "user",
      action: "lead_submitted",
      details: { name, email, phone, degree, course },
      leadId: lead._id,
      ip,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead saved successfully",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save lead",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all leads (for admin purposes)
export async function GET() {
  try {
    await dbConnect();

    const leads = await Lead.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: leads.length,
        data: leads,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
