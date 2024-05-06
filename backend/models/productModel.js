import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,

      unique: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    description: {
      type: String,

      trim: true,
    },
    offer: { type: Number },
    mainImages: [{ img: { type: String } }],

    productPictures: [{ img: { type: String } }],

    reviews: [
      {
        userId: { type: mongoose.ObjectId, ref: "User" },
        review: String,
      },
    ],
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    visibility: {
      type: String,
      required:true,
      trim: true,
    },
    updatedAt: Date,

   
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
