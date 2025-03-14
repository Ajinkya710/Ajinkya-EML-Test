import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TLoginResponse } from "./types";
import { $post } from "../../http";

export const userLogIn = createAsyncThunk<TLoginResponse, void, { state: RootState }>(
  "userLogIn",
  async (_, { getState }) => {
    const { username, password } = getState().login.loginFormData;

    return await $post("/user/login", {
      username,
      password,
    });
  }
);