import { Schema, models, model } from "mongoose";

const InquirySchema = new Schema(
  {
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    athleteName: { type: String, required: true },
    graduationYear: { type: String, required: true },
    serviceInterest: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "archived"],
      default: "new",
    },
    ipHash: { type: String, default: "" },
  },
  { timestamps: true },
);

const Inquiry = models.Inquiry || model("Inquiry", InquirySchema);
export default Inquiry;
