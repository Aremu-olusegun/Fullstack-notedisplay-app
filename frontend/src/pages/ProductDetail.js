import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data based on the ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/product/${id}`
        ); // Replace with your API endpoint to fetch the product data
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{product.item}</h2>
      <p className="mb-2">{product.description}</p>
      <p className="mb-2">Price: ${product.price}</p>
      <img
        className="w-full rounded"
        src={product.productImage}
        alt={`Front of ${product.item}`}
      />
      {/* Additional product details can be displayed here */}
      <Link to="/">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default ProductDetailPage;
