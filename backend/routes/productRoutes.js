const router = require("express").Router({ mergeParams: true });
const Products = require("../models/Products");

router.get("/", (req, res) => {
  Products.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve products" });
    });
});

router.route("/product/:id").get((req, res) => {
  const productId = req.params.id;
  console.log("Request Id:", req.params.id);
  Products.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve product" });
    });
});

router.post("/product", (req, res) => {
  const product = req.body; // Get the product data from the request body

  // Perform server-side validation
  const { item, description, price } = product;
  if (!item || !description || !price) {
    return res.status(400).json({ error: "Invalid product details" });
  }

  // Check if a similar product already exists
  Products.findOne({ item, description, price })
    .then((existingProduct) => {
      if (existingProduct) {
        // A similar product already exists
        return res
          .status(409)
          .json({ error: "Similar product already exists" });
      }

      // Create a new product in the database
      Products.create(product)
        .then((result) => {
          res.status(201).json(result); // Send the created product as the response
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to create product" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to check for existing product" });
    });
});

router.delete("/:id", (req, res) => {
  Products.findOneAndRemove({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete product" });
    });
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  // Perform server-side validation
  const { item, description, price } = updatedProduct;
  if (
    !updatedProduct ||
    !updatedProduct.item ||
    !updatedProduct.description ||
    !updatedProduct.price
  ) {
    return res.status(400).json({ error: "Invalid product details" });
  }

  Products.findOneAndUpdate({ _id: productId }, updatedProduct, { new: true })
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to update product" });
    });
});

module.exports = router;
