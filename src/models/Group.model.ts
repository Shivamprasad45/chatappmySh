// models/Group.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface GroupDocument extends Document {
  name: string;
  admin: string;
  members: string[];
  isPublic: boolean;
  createdAt: Date;
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  admin: { type: String, required: true },
  members: { type: [String], default: [] },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<GroupDocument>("Group", GroupSchema);
