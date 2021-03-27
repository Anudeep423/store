const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    user : {
      type: ObjectId,
      ref: "User",
      required: true
    },
    stock: {
      type: Number
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
