import React from 'react';

const ProductCard = ({ product, onDelete, onInfoClick }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer relative">
      {/* Delete button */}
      <button
        onClick={() => onDelete(product.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
      >
        Delete
      </button>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-32 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-500">
        {typeof product.price === 'number'
          ? `$${product.price.toFixed(2)}`
          : 'Price not available'}
      </p>
      <button
        onClick={() => onInfoClick(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
      >
        Product Info
      </button>
    </div>
  );
};

export default ProductCard;
