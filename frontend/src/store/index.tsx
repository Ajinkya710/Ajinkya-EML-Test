import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth/slice";
import loginSlice from "../Pages/Login/store/slice";
import toDoSlice from "../Pages/ToDo/store/slice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    auth: authSlice,
    toDo: toDoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
