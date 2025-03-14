import { createAsyncThunk } from "@reduxjs/toolkit";
import { $delete, $get, $post, $put } from "../../../http";
import { RootState } from "../../../store";
import { TToDo, TToDoResponse } from "./types";
import moment from "moment";

export const getToDoList = createAsyncThunk<
  TToDoResponse,
  void,
  { state: RootState }
>("getToDoList", async () => {
  return await $get(`/todos`);
});

export const addToDo = createAsyncThunk<
  TToDoResponse,
  Omit<TToDo, "id">,
  { state: RootState }
>("addToDo", async (todoData) => {
  return await $post(`/todos`, todoData);
});


export const updateToDo = createAsyncThunk<
  TToDoResponse,
  { id: string; data: Partial<Omit<TToDo, "id" | "userId">> },
  { state: RootState }
>("updateToDo", async ({ id, data }) => {
  const formattedData = {
    ...data,
    dueDate: data.dueDate ? moment(data.dueDate).format("YYYY-MM-DD") : null,
  };

  return await $put(`/todos/${id}`, formattedData);
});


export const deleteToDo = createAsyncThunk<
  TToDoResponse,
  { id: string },
  { state: RootState }
>("deleteToDo", async ({ id }) => {
  return await $delete(`/todos/${id}`);
});

