const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 2,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "Category",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
