import { Schema, model } from "mongoose";

interface Comment {
  postId: string;
  comment: any[];
}

const commentSchema = new Schema<Comment>({
  postId: {
    type: String,
    ref: "post",
    required: true,
  },
  comment: {
    type: [
      {
        username: String,
        comments: String,
      },
    ],
  },
});

export default model<Comment>("comment", commentSchema);