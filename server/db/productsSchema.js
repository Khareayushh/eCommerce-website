const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  prod_name: { type: String, required: true },
  prod_description: { type: String, required: true },
  prod_image: { type: String, required: true },
  prod_price: { type: Number, required: true },
  category_name: {type: String, required: true},
  // category_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   required: true,
  // },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;