import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILog extends Document {
  type: "user" | "staff";
  action: string;
  details?: Record<string, unknown>;
  leadId?: mongoose.Types.ObjectId;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const LogSchema = new Schema<ILog>(
  {
    type: {
      type: String,
      required: true,
      enum: ["user", "staff"],
    },
    action: {
      type: String,
      required: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: null,
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
LogSchema.index({ type: 1, createdAt: -1 });
LogSchema.index({ action: 1 });
LogSchema.index({ leadId: 1 });

// Delete cached model in development
if (mongoose.models.Log) {
  delete mongoose.models.Log;
}

const Log: Model<ILog> = mongoose.model<ILog>("Log", LogSchema);

export default Log;
