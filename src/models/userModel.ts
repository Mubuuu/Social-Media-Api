import mongoose, { Schema, model, connect } from "mongoose";

// representing a document in mongodb
interface IUser {
  username: string;
  email: string;
  password: string;
  dob: string;
  relationship: String;
  mobile: string;
  place: string;
  bio: string;
  profile_img: string;
  cover_img: string;
  verified: boolean;
  active: boolean;
  following: any[];
  followers: any[];
}

// creating schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      default: "-",
    },
    mobile: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      default: "location",
    },
    bio: {
      type: String,
      default: "- -",
    },
    relationship: {
      type: String,
      default: "Relationship status",
    },
    profile_img: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    cover_img: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    followers: {type:[mongoose.Schema.Types.ObjectId],ref:'user',default:null},
    following: {type:[mongoose.Schema.Types.ObjectId],ref:'user',default:null},
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("user", userSchema);
