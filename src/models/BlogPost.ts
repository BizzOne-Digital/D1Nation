import { Schema, models, model } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    category: { type: String, default: "News" },
    coverImageUrl: { type: String, default: "" },
    coverImagePublicId: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);
export default BlogPost;
