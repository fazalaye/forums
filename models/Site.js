import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);

const SiteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    pricing: {
      type: String,
      enum: ["gratuit", "freemium", "payant"],
      default: "gratuit",
    },
    priceLabel: { type: String, default: "Gratuit" },
    logo: { type: String, default: "" },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedBy: { type: String, default: "" },
    clicks: { type: Number, default: 0 },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true }
);

SiteSchema.virtual("ratingAverage").get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

SiteSchema.set("toJSON", { virtuals: true });
SiteSchema.set("toObject", { virtuals: true });

export default mongoose.models.Site || mongoose.model("Site", SiteSchema);
