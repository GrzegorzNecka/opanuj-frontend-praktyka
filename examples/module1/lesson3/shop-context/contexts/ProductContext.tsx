import { createContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '../types/Product';

type ProductContextType = {
  products: Product[];
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
});

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const value = useMemo(() => ({ products }), [products]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
