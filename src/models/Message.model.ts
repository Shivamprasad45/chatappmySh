// models/Message.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface MessageDocument extends Document {
  sender: string;
  text: string;
  groupId: string;
  senderName: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  groupId: { type: String, required: true },
  senderName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<MessageDocument>("Message", MessageSchema);
