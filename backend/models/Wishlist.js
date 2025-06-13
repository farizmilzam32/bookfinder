import moongoose from "mongoose";

const WishlistSchema = new moongoose.Schema(
  {
    title: String,
    thumbnail: String,
    authors: [String],
    rating: Number,
  },
  {
    timestamps: true,
  }
);

export default moongoose.model("Wishlist", WishlistSchema);
