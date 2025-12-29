import { IHome } from "@/lib/data/mock-data";
import mongoose from "mongoose";



interface HomeDocument extends IHome, mongoose.Document {}

const HomeSchema = new mongoose.Schema<HomeDocument>(
  {
    id: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true, unique: true },
    heroDescription: { type: String, required: true },

    ctaButtons: {
      type: [{ text: String, link: String }], // آرایه از آبجکت‌ها
      required: true,
      default: [],
    },

    socialLinks: {
      type: [
        {
          platform: String,
          url: String,
          icon: String,
        },
      ],
      required: true,
      default: [],
    },

    stats: {
      type: [
        {
          label: String,
          value: String,
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Home =
  mongoose.models.Home || mongoose.model<HomeDocument>("Home", HomeSchema);

export default Home;
