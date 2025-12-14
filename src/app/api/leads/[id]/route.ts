import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Log from "@/models/Log";
import { getIp } from "@/utils/getIp";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: lead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lead",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();
    const { status, note } = body;

    // Use native MongoDB to bypass Mongoose schema validation for legacy data
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.Types.ObjectId;
    
    // Get the raw document from MongoDB
    const collection = mongoose.connection.collection("leads");
    const rawLead = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!rawLead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    // Build update object
    const updateFields: Record<string, unknown> = {};

    // Handle status update
    if (status) {
      if (!["pending", "done"].includes(status)) {
        return NextResponse.json(
          { success: false, message: "Invalid status. Must be 'pending' or 'done'" },
          { status: 400 }
        );
      }
      updateFields.status = status;
    }

    // Handle note addition
    if (note && typeof note === "string" && note.trim()) {
      const newNote = { text: note.trim(), createdAt: new Date() };
      
      // Check if notes is currently a string (old format) or not an array
      if (typeof rawLead.notes === "string") {
        // Convert old string to array format with the new note
        const oldNotes = rawLead.notes 
          ? [{ text: rawLead.notes, createdAt: new Date() }] 
          : [];
        updateFields.notes = [...oldNotes, newNote];
      } else if (Array.isArray(rawLead.notes)) {
        // Push to existing array
        updateFields.notes = [...rawLead.notes, newNote];
      } else {
        // No existing notes, create new array
        updateFields.notes = [newNote];
      }
    }

    // Check if any updates were made
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Update using native MongoDB
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    // Fetch updated document
    const updatedLead = await collection.findOne({ _id: new ObjectId(id) });

    if (!updatedLead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    // Log the actions
    const ip = await getIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    const host = request.headers.get("host") || "";
    const isRestricted = host.includes("localhost") || host.includes("vercel.app");

    if (!isRestricted) {
      if (status) {
        await Log.create({
          type: "staff",
          action: "status_change",
          details: { oldStatus: rawLead.status, newStatus: status, leadName: rawLead.name },
          leadId: new ObjectId(id),
          ip,
          userAgent,
        });
      }

      if (note && typeof note === "string" && note.trim()) {
        await Log.create({
          type: "staff",
          action: "note_added",
          details: { note: note.trim(), leadName: rawLead.name },
          leadId: new ObjectId(id),
          ip,
          userAgent,
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead updated successfully",
        data: updatedLead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update lead",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
