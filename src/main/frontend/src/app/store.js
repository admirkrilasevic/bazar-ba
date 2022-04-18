import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../utils/CartSlice.js'

export default configureStore({
  reducer: {
      cart: cartReducer
  },
})