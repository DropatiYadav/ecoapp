import React from 'react';
import { useRouter } from 'next/router';
import ProductInfo from '../Components/ProductInfo';
import products from '@/data/product-data';

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
  
    // Temporary hardcoded product for testing
    const product = {
      id: '1', // Match this with the id in your data
      title: 'Test Product',
      // ... other product details
    };
  
    return <ProductInfo product={product} />;
  };

export default ProductDetailPage;
