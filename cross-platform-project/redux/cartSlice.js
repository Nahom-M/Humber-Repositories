import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cart.find(
        (item) =>
          (item.idMeal && item.idMeal === action.payload.idMeal) ||
          (item.id && item.id === action.payload.id)
      );
      if (!existingItem) {
        const itemToAdd = {
          ...action.payload,
          quantity: 1,
        };
        state.cart.push(itemToAdd);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.idMeal !== action.payload && item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(
        (item) => item.idMeal === id || item.id === id
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity, setLoading } = cartSlice.actions;

export default cartSlice.reducer;
