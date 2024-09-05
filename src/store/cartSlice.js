import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.totalQuantity += 1
      state.totalPrice += action.payload.price
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalPrice -= existingItem.price * existingItem.quantity
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        )
      }
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      )
      if (existingItem) {
        existingItem.quantity += 1
        state.totalQuantity += 1
        state.totalPrice += existingItem.price
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      )
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
        state.totalQuantity -= 1
        state.totalPrice -= existingItem.price
      }
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions
export default cartSlice.reducer
