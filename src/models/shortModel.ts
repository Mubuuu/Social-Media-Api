import { Schema, model } from "mongoose";

interface shorts {
  userId: string;
  url: string;
  likes: any[];
}

const shortsSchema = new Schema<shorts>({
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: [],
    required: true,
  },
},{
  timestamps:true
});

export default model<shorts>("short", shortsSchema);
