import { Schema, model } from "mongoose";

interface Post {
  userId: string;
  image: string;
  caption: string;
  place: string;
  likes: any[];
}

const postSchema = new Schema<Post>({
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  place: {
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

export default model<Post>("post", postSchema);
