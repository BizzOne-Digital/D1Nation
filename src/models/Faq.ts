import { Schema, models, model } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      enum: ["general", "services", "pricing", "home"],
      default: "general",
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Faq = models.Faq || model("Faq", FaqSchema);
export default Faq;
