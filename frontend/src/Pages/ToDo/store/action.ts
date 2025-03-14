import { createAsyncThunk } from "@reduxjs/toolkit";
import { $get } from "../../../http";
import { RootState } from "../../../store";
import { TToDoResponse } from "./types";

export const getToDoList = createAsyncThunk<
  TToDoResponse,
  void,
  { state: RootState }
>("getToDoList", async () => {
  return await $get(`/todos`);
});
