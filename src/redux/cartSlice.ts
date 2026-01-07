import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../components/types/product";

export interface CartItem extends Product {
  quantity: number;
}


interface CartState {
  items: CartItem[];
}

// Helper functions for localStorage
const loadFromLocalStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    if (data) return JSON.parse(data);
    return [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const saveToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const initialState: CartState = {
  items: loadFromLocalStorage(), // load cart from localStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state.items); // persist in localStorage
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
      saveToLocalStorage(state.items);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

