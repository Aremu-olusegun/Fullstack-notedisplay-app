import React from "react";
import ProductCard from "./ProductCard";
import AddProductForm from "../AddProductForm";

const ProductList = ({ products, removeProduct }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              removeSingleProduct={removeProduct}
              key={product._id}
              id={product._id}
              image={product.productImage}
              item={product.item}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>

        <div className="mt-6">
          <AddProductForm products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
