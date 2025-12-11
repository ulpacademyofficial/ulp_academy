import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeviceInfo {
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

export interface IGeolocation {
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

export interface INote {
  text: string;
  createdAt: Date;
}

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  degree: string;
  course?: string;
  source: string;
  status: "pending" | "done";
  notes: INote[];
  deviceInfo?: IDeviceInfo;
  geolocation?: IGeolocation;
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
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    notes: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    deviceInfo: {
      type: Schema.Types.Mixed,
      default: null,
    },
    geolocation: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Delete cached model in development to pick up schema changes
if (mongoose.models.Lead) {
  delete mongoose.models.Lead;
}

const Lead: Model<ILead> = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
