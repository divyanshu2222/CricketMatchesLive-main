import { createReducer } from '@reduxjs/toolkit';

const cartReducer = createReducer(
  {
    cartItems: [],
    totalProfit: 0,
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(i => i.id === item.id);

      if (!isItemExist) {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    calculatePrice: state => {
      const { cartItems } = state;

      let totalProfit = 0;

      cartItems.forEach(item => {
        if (item.betAmount && item.betAmount > 0) {
          const profit = item.betAmount * item.odds;
          totalProfit += profit;
        }
      });

      state.totalProfit = totalProfit.toFixed(2);
    },
    placeBet: (state, action) => {
      const { itemId, betAmount } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].betAmount = betAmount;
      }
    },
  }
);

export default cartReducer;
