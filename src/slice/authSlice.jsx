import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: savedUsers, // List of signed-up users
    currentUser: savedCurrentUser, // Stores the currently logged-in user's data
    isAuthenticated: !!savedCurrentUser, // Boolean flag for login state
  },
  reducers: {
    signup: (state, action) => {
      const newUser = action.payload;
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        throw new Error("Invalid email or password");
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
