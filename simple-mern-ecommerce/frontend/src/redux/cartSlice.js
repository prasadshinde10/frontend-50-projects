import { createSlice } from '@reduxjs/toolkit';

const storedItems = localStorage.getItem('cartItems');

const initialState = {
  items: storedItems ? JSON.parse(storedItems) : [],
};

const persistCart = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((cartItem) => cartItem.product === item.product);

      if (existing) {
        existing.qty += item.qty;
      } else {
        state.items.push(item);
      }

      persistCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.product !== action.payload);
      persistCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persistCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
