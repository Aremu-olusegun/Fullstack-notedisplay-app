import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    item: "",
    description: "",
    price: "",
    productImage: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="item"
            className="block text-sm font-medium text-gray-700"
          >
            Item
          </label>
          <input
            type="text"
            id="item"
            name="item"
            value={product.item}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={product.productImage}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
