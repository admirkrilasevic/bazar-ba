import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    items: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    clear: (state) => {
      state.value = 0
      state.items = []
    },
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    updateQuantity: (state, action) => {
      state.items[action.payload.index].selectedQuantity += action.payload.value
    },
  },
})

export const { increment, decrement, incrementByAmount, clear, addItem, updateQuantity } = cartSlice.actions

export default cartSlice.reducer
