const express = require("express");
const { addProduct, getProducts, getProduct } = require("../controllers/productsController");
const router = express.Router();


router.post("/addProduct", addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

module.exports = router;