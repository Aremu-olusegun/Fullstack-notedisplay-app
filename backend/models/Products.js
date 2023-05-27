const mongoose = require("mongoose");

/* const productSchema = new mongoose.Schema({
  item: String,
  description: String,
  productImage: String,
  price: Number,
}); */

const productSchema = new mongoose.Schema({
  item: String,
  description: String,
  productImage: String,
  price: Number,
});

module.exports = mongoose.model("Products", productSchema);
