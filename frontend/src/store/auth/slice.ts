/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogIn } from "./action";
import { TLoginResponse, TUser } from "./types";

interface AuthSlice {
  user: TUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthSlice = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorNull: (state) => {
      state.error = null;
    },
    logout(state) {
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogIn.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(
        userLogIn.fulfilled,
        (state, action: PayloadAction<TLoginResponse>) => {
          state.user = action.payload
          const { accessToken } = action.payload;
          state.isLoading = false;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("authToken", accessToken);
        }
      )
      .addCase(userLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Something went wrong. Please try again.";
      })
  },
});

export const { setErrorNull, logout } = authSlice.actions;

export default authSlice.reducer;
