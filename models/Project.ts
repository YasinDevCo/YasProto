// src/models/Project.ts
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    demoUrl: { type: String },
    githubUrl: { type: String },
    category: {
      type: String,
      required: true,
      enum: ["فروشگاه", "داشبورد", "اپلیکیشن", "وبلاگ", "لندینگ", "سایر"],
    },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// جلوگیری از بازسازی مدل اگر قبلاً وجود داشته باشد
export const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);