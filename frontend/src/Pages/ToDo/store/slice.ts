import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToDoList } from "./action";
import { TToDo, TToDoResponse } from "./types";

interface ToDoSlice {
  todos: TToDo[];
  error: string | null;
  isLoading: boolean;
}

const initialState: ToDoSlice = {
  todos: [],
  error: null,
  isLoading: false,
};

const toDoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getToDoList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getToDoList.fulfilled,
        (state, action: PayloadAction<TToDoResponse>) => {
          state.todos = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getToDoList.rejected, (state) => {
        state.error = "Failed to fetch todo list";
        state.isLoading = false;
      });
  },
});

export default toDoSlice.reducer;
