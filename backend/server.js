const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const PORT = process.env.PORT;

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
  })
);

app.use(express.json());

app.use("/products", productRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/products")
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`The server is now listening on http://localhost:${PORT}`);
});
