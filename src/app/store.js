import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/Productlist/ProductSlice';
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/Order/orderSlice'
import userReducers from '../features/user/userSlice'
export const store = configureStore({
  reducer: {
    product:productReducer,
    auth: authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducers
    
  },
});
