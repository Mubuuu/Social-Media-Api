import mongoose, { Schema, model, connect } from "mongoose";
interface IAdmin {
    email: string;
    password: string;
  }

  const adminSchema = new Schema<IAdmin>(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  );
  
  export default model<IAdmin>("admin", adminSchema);