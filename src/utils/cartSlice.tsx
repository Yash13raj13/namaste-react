import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "./types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // ✅ Add item
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },

    // ✅ Remove item by id (better than pop)
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // ✅ Clear cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
