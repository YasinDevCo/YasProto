import { Profile } from "@/lib/data/mock-data";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<Profile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  { timestamps: true } // اینجا اضافه شد
);

export type UserDocument = Profile & mongoose.Document;

const User =
  mongoose.models.User || mongoose.model<Profile>("User", UserSchema);

export default User;
