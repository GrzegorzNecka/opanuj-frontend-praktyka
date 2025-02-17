import React, { useContext } from 'react';
import { BsPlus } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import type { Product as ProductType } from '../types/Product';

const AddToCartButton = React.memo(({ product }: { product: ProductType }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(product)} data-testid="add-to-cart-button">
      <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
        <BsPlus className="text-3xl" />
      </div>
    </button>
  );
});

export default AddToCartButton;
