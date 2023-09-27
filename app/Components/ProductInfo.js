import React from 'react';

const ProductInfo = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg overflow-y-auto max-h-96">
        <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
        <div className="mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
        </div>
        <p className="text-gray-500 mb-2">
          Price:{' '}
          {typeof product.price === 'number'
            ? `$${product.price.toFixed(2)}`
            : 'Price not available'}
        </p>
        <p className="text-gray-500 mb-2">Category: {product.category}</p>
        <p className="text-gray-500 mb-2">Description: {product.description}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
