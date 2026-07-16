import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    authorEmail: { type: String, default: "" },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const PromptSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, index: true },
    tags: { type: [String], default: [] },
    author: { type: String, required: true },
    authorEmail: { type: String, default: "" },
    upvotes: { type: Number, default: 0 },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Prompt ||
  mongoose.model("Prompt", PromptSchema);
