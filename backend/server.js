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
  .connect(
    "mongodb+srv://productsdisplay:oA0QiGHQdyqIYpYC@products.i0tsm29.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`The server is now listening on http://localhost:${PORT}`);
});
