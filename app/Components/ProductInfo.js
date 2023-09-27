import React from 'react';

const ProductInfo = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-3xl rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition focus:outline-none"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-contain"
            />
          </div>
          <div>
            <p className="text-gray-500 mb-2">
              Price:{' '}
              {typeof product.price === 'number'
                ? `$${product.price.toFixed(2)}`
                : 'Price not available'}
            </p>
            <p className="text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-gray-500 mb-2">Description: {product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
