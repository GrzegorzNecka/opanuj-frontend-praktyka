import { createContext, useCallback, useMemo, useState } from 'react';
import type { CartItem } from '../types/CartItem';
import type { Product } from '../types/Product';

type CartContextType = {
  cart: CartItem[];
  itemAmount: number;
  total: number;
  addToCart: (product: Product | CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  decreaseAmount: (id: number) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Memoizowane obliczenia zamiast useEffect
  const itemAmount = useMemo(
    () => cart.reduce((acc, item) => acc + item.amount, 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.amount, 0),
    [cart]
  );

  // Memoizowane funkcje do modyfikacji koszyka
  const addToCart = useCallback((product: Product | CartItem) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === product.id);
      if (cartItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prevCart, { ...product, amount: 1 }];
    });
  }, []);

  const decreaseAmount = useCallback((id: number) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === id);
      if (!cartItem) return prevCart;
      if (cartItem.amount <= 1) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Memoizowana wartość kontekstu
  const contextValue = useMemo(
    () => ({
      cart,
      itemAmount,
      total,
      addToCart,
      removeFromCart,
      clearCart,
      decreaseAmount,
    }),
    [
      cart,
      itemAmount,
      total,
      addToCart,
      removeFromCart,
      clearCart,
      decreaseAmount,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
