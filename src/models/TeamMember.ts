import { Schema, models, model } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    role: { type: String, default: "" },
    bio: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    photoPublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const TeamMember = models.TeamMember || model("TeamMember", TeamMemberSchema);
export default TeamMember;
