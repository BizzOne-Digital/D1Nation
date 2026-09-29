import { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    overview: { type: String, required: true },
    benefits: [{ type: String }],
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    ctaLabel: { type: String, default: "Inquire Now" },
    ctaHref: { type: String, default: "/contact" },
    internalPrice: { type: Number, default: null },
    showPublicPrice: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    icon: { type: String, default: "academy" },
  },
  { timestamps: true },
);

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
