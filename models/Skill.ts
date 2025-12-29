// src/models/Skill.ts
import mongoose from "mongoose";

  const skillSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String },
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "tools"],
    },
  });

export const SkillModel =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);