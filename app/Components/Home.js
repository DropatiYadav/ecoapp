import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: 0,
        image: '',
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductInfoVisible, setProductInfoVisible] = useState(false);

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        const sortedProducts = [...products].sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });

        setProducts(sortedProducts);
    };

    const confirmDeleteProduct = (productId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this product?');

        if (shouldDelete) {
            handleDeleteProduct(productId);
        }
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    const handleAddProduct = () => {
        setShowAddPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddPopup(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleAddProductSubmit = () => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setNewProduct({
            title: '',
            price: 0,
            image: '',
        });
        setShowAddPopup(false);
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setProductInfoVisible(true);
    };

    const closeProductInfo = () => {
        setSelectedProduct(null);
        setProductInfoVisible(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-blue-500 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-semibold">E-commerce App</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleSort}
                            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition focus:outline-none"
                        >
                            {sortOrder === 'asc' ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)'}
                        </button>
                        <button
                            onClick={handleAddProduct}
                            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition focus:outline-none"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </header>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer relative"
                            onClick={() => handleCardClick(product)}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-40 object-cover mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                            <p className="text-gray-600">
                                {typeof product.price === 'number'
                                    ? `$${product.price.toFixed(2)}`
                                    : 'Price not available'}
                            </p>
                            <div className="mt-4 flex justify-end items-center">
                                <button
                                    onClick={() => confirmDeleteProduct(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition focus:outline-none mr-10"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleCardClick(product)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition focus:outline-none"
                                >
                                    Product Info
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            {showAddPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
                        <input
                            type="text"
                            name="title"
                            value={newProduct.title}
                            onChange={handleInputChange}
                            placeholder="Product Title"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
                        />
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={handleInputChange}
                            placeholder="Product Image URL"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handlePopupClose}
                                className="bg-red-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-red-600 hover:text-white transition focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProductSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition focus:outline-none"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isProductInfoVisible && (
                <ProductInfo product={selectedProduct} onClose={closeProductInfo} />
            )}
        </div>
    );
};

export default Home;
