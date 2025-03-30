import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers';

// Redux store
const store = configureStore({
  //  Reducers
  reducer: {
    //Here we are passing the cartReducer to the store. cartReducer is a function that returns the initial state
    // of the cart and the actions that can be performed on the cart.
    cart: cartReducer,
  },
});

export default store;
