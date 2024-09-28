import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const cart = sessionStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCart(), 
  },
  reducers: {
    additem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items)); 
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      sessionStorage.setItem('cart', JSON.stringify(state.items)); 
    },
    clearCart: (state, action) => {
      state.items = [];
      sessionStorage.setItem('cart', JSON.stringify(state.items)); 
    },
    decrementItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    }
  }
});

export const { additem, removeItem, clearCart, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;
