import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  description,
  item,
  price,
  image,
  removeSingleProduct,
}) => {
  return (
    <>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80">
          <Link to={`/products/product/${id}`}>
            <img
              src={image}
              alt={`Front of ${item}`}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </Link>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            {item}
            <div>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">${price}</p>
            <h3 className="text-sm text-gray-700">
              <div>
                <button
                  type="button"
                  onClick={() => removeSingleProduct(id)}
                  className="focus:outline-none text-white bg-red-300 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
                <Link to={`/products/${id}/edit`}>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-500 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
