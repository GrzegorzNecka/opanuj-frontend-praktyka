import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CartItem } from '../types/CartItem';
import type { Product } from '../types/Product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product | CartItem>) => {
      const cartItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });

      if (cartItem) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        );
      } else {
        const newItem = { ...action.payload, amount: 1 };
        state.items.push(newItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseAmount: (state, action: PayloadAction<number>) => {
      const cartItem = state.items.find((item) => item.id === action.payload);
      if (!cartItem) return;
      cartItem.amount += 1;
    },
    decreaseAmount: (state, action: PayloadAction<number>) => {
      const cartItem = state.items.find((item) => item.id === action.payload);

      if (!cartItem) return;

      if (cartItem.amount <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        cartItem.amount -= 1;
      }
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseAmount,
  removeFromCart,
  increaseAmount,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectItemAmount = (state: RootState) =>
  state.cart.items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

export default cartSlice.reducer;
