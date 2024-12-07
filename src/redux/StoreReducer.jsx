// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add slices here
  },
});

export default store;
