import React, { useState } from 'react';

const AddProductPopup = ({ onAddProduct, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddProduct(newProduct);
    setNewProduct({
      title: '',
      price: 0,
      image: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleInputChange}
          placeholder="Product Title"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          placeholder="Product Image URL"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-red-600 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPopup;
