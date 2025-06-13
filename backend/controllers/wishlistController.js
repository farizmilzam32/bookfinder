import Wishlist from "../models/Wishlist.js"

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.status(200).json(wishlist);
  } catch {
    res.status(500).json({ message: "Error retrieving wishlist" });
  }
};

export const addWishlist = async (req, res) => {
  try {
    const { title, thumbnail, authors, rating } = req.body;
    const newWishlistItem = new Wishlist({ title, thumbnail, authors, rating });
    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};
