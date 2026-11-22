
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthChecked = true;
    },

    clearUserData: (state) => {
      state.userData = null;
      state.isAuthChecked = true;
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setAuthChecked,
} = userSlice.actions;

export default userSlice.reducer;
