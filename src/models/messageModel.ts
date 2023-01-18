import { Schema, model, Model } from "mongoose";

interface Message {
  chatId: string;
  senderId: string;
  text: string;
}

const messageSchema = new Schema<Message>(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model <Message>("message",messageSchema)