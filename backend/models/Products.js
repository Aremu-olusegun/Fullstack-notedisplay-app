const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
  productImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Products", productSchema);
