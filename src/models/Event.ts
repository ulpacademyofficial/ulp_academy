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

export interface IEvent extends Document {
  visitorId: string;
  eventType: string;
  pageUrl: string;
  queryParam: string;
  pageSlug: string;
  referrer?: string;
  deviceInfo?: IDeviceInfo;
  geolocation?: IGeolocation;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    visitorId: {
      type: String,
      required: [true, "Visitor ID is required"],
      index: true,
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: ["pageView", "click", "formSubmit", "custom"],
      default: "pageView",
    },
    pageUrl: {
      type: String,
      required: [true, "Page URL is required"],
    },
    queryParam: {
      type: String,
      default: "",
    },
    pageSlug: {
      type: String,
      required: [true, "Page slug is required"],
    },
    referrer: {
      type: String,
      default: "",
    },
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

// Index for efficient querying
EventSchema.index({ createdAt: -1 });
EventSchema.index({ eventType: 1, createdAt: -1 });

// Delete cached model in development to pick up schema changes
if (mongoose.models.Event) {
  delete mongoose.models.Event;
}

const Event: Model<IEvent> = mongoose.model<IEvent>("Event", EventSchema);

export default Event;
