import { Schema, models, model } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    headline: {
      type: String,
      default: "A Complete Sports System for Today's Athletes and Their Families",
    },
    subheadline: {
      type: String,
      default:
        "Elite training, competitive teams, recruiting guidance, and NIL education — built for families pursuing college athletics.",
    },
    aboutShort: {
      type: String,
      default:
        "D1 Nation is a high-end sports club with a legacy of over 1,000 athletes placed in college.",
    },
    logoUrl: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    heroVideoUrl: { type: String, default: "" },
    heroVideoPublicId: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
    heroImagePublicId: { type: String, default: "" },
    email: { type: String, default: "RealD1Nation@gmail.com" },
    phone: { type: String, default: "+1 (512) 508-4632" },
    address: { type: String, default: "" },
    addressLine2: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    socialFacebook: { type: String, default: "" },
    socialInstagram: { type: String, default: "" },
    socialTiktok: { type: String, default: "" },
    socialTwitter: { type: String, default: "" },
    placementClaim: { type: String, default: "1,000+" },
    placementClaimLabel: {
      type: String,
      default: "athletes placed in college programs",
    },
    metaTitle: { type: String, default: "D1 Nation | Luxury Sports Club" },
    metaDescription: {
      type: String,
      default:
        "D1 Nation — a complete sports system for today's athletes and families pursuing college athletics.",
    },
  },
  { timestamps: true },
);

const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export default SiteSettings;
