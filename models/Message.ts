// models/Message.ts
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    read: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt و updatedAt خودکار
  }
);

// برای نمایش تاریخ به فرمت فارسی
messageSchema.virtual("formattedDate").get(function () {
  return this.date.toLocaleDateString("fa-IR");
});

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);