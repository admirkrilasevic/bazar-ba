import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    items: [],
    addressId: 0,
    paymentMethod: "",
    orderId: 0,
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
    remove: (state, action) => {
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.value = state.value - itemToRemove.selectedQuantity
    },
    setAddress: (state, action) => {
      state.addressId = action.payload
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount, clear, addItem, updateQuantity, remove, setAddress, setPaymentMethod, setOrderId } = cartSlice.actions

export default cartSlice.reducer
