import React, { useState } from "react";
import axios from "axios";

const AddProductForm = ({ products, setProducts }) => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const newProduct = {
          item,
          description,
          price,
        };

        const response = await axios.post(
          "http://localhost:4000/products/product",
          newProduct
        );
        console.log(response.data); // Log the created product data

        const { data: updatedProducts } = await axios.get(
          "http://localhost:4000/products"
        );
        setProducts(updatedProducts);

        // Reset form fields after successful submission
        setItem("");
        setDescription("");
        setPrice("");
        setErrors({});
      } catch (error) {
        console.error(error);
        // Handle error states
      }
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!item.trim()) {
      formErrors.item = "Item name is required";
    }

    if (!description.trim()) {
      formErrors.description = "Description is required";
    }

    if (!price.trim()) {
      formErrors.price = "Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      formErrors.price = "Invalid price format";
    }

    return formErrors;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Add a product
      </h2>
      <div>
        <label
          htmlFor="item"
          className="block text-sm font-medium text-gray-700"
        >
          Item:
        </label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm bg-slate-200 p-3 ${
            errors.item ? "border-red-500" : ""
          }`}
        />
        {errors.item && (
          <p className="mt-2 text-sm text-red-500">{errors.item}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm bg-slate-200 p-3 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-500">{errors.description}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price:
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm bg-slate-200 p-2 ${
            errors.price ? "border-red-500" : ""
          }`}
        />
        {errors.price && (
          <p className="mt-2 text-sm text-red-500">{errors.price}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
