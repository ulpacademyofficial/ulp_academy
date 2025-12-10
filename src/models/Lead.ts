import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  degree: string;
  course?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      enum: ["10th", "12th", "graduation", "post-graduation"],
    },
    course: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      default: "nios-open-board",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
