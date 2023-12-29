const asyncHandler = require("express-async-handler");
const Products = require("../db/productsSchema");

// Adding data to the database, ** This will be the private route.
const addProduct = asyncHandler(async (req, res) => {
  const { prod_name, prod_description, prod_image, prod_price, category_name } =
    req.body;
  if (
    !prod_description ||
    !prod_image ||
    !prod_name ||
    !prod_price ||
    !category_name
  ) {
    res.status(400);
    throw new Error("Some field is not there");
  }

  const product = await Products.create({
    prod_name,
    prod_description,
    prod_image,
    prod_price,
    category_name,
  });

  res.status(201).json(product);
});

// Here getting all the data from product database.
const getProducts = asyncHandler(async (req, res) => {
  const allProducts = await Products.find();
  res.status(200).json(allProducts);
});

const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(400);
    throw new Error("Product id should be there");
  }

  const product = await Products.findById(productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.status(200).json(product);
});

module.exports = { addProduct, getProducts, getProduct };
