import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  type: {
    type: String,
  },
  categoryImage: { type: String },
  
  parentId: {
    type: String,
  },
  createdBy: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
