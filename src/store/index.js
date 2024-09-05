import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage
import cartReducer from "./cartSlice" // Your cart slice

// Redux Persist configuration
const persistConfig = {
  key: "card-items",
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
})

const persistor = persistStore(store)

export { store, persistor }
