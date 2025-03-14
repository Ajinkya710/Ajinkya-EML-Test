import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToDo, deleteToDo, getToDoList, updateToDo } from "./action";
import { TToDo, TToDoResponse } from "./types";
import { message } from "antd";

interface ToDoSlice {
  todos: TToDo[];
  error: string | null;
  isLoading: boolean;
  showAddToDo: boolean;
}

const initialState: ToDoSlice = {
  todos: [],
  error: null,
  isLoading: false,
  showAddToDo: false,
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    setShowAddToDo: (state, action) => {
      state.showAddToDo = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getToDoList.fulfilled,
        (state, action: PayloadAction<TToDoResponse>) => {
          state.todos = action.payload.data;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getToDoList.rejected, (state) => {
        state.error = "Failed to fetch todo list";
        state.isLoading = false;
      })
      .addCase(
        deleteToDo.fulfilled,
        (state) => {
          state.isLoading = false;
          message.success("ToDo deleted successfully.");
        }
      )
      .addCase(deleteToDo.rejected, (state) => {
        message.error("Failed to delete ToDo.");
        state.isLoading = false;
      })
      .addCase(
        updateToDo.fulfilled,
        (state) => {
          state.isLoading = false;
          message.success("ToDo updated successfully.");
        }
      )
      .addCase(updateToDo.rejected, (state) => {
        message.error("Failed to update ToDo.")
        state.isLoading = false;
      })
      .addCase(
        addToDo.fulfilled,
        (state) => {
          state.isLoading = false;
          message.success("ToDo Added successfully.")
        }
      )
      .addCase(addToDo.rejected, (state) => {
        message.error("Failed to add ToDo.")
        state.isLoading = false;
      });
  },
});

export const { setShowAddToDo, setIsLoading } = toDoSlice.actions;

export default toDoSlice.reducer;
