import { Schema, models, model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    quote: { type: String, required: true },
    context: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    photoPublicId: { type: String, default: "" },
    isSample: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export default Testimonial;
