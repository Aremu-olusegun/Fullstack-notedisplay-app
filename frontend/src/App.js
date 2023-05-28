import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import OtherPage from "./pages/OtherPage";
import EditProductPage from "./pages/EditProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:4000/products");
      setProducts(data);
    }

    fetchData();
  }, []);

  const removeProduct = async (e) => {
    console.log(e);
    let id = e;
    await axios.delete(`http://localhost:4000/products/${id}`);
    setProducts((products) => products.filter((item) => item._id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProductList
              products={products}
              setProducts={setProducts}
              removeProduct={removeProduct}
            />
          }
        />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
        <Route path="/products/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
