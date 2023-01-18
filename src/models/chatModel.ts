import { Schema, model } from "mongoose";

interface Chat {
  members: any[];
}

const chatSchema = new Schema<Chat>(
  {
    members: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<Chat>("chat", chatSchema);