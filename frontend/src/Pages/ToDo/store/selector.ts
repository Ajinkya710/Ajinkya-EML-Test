import { RootState } from "../../../store";

const selectToDoList = (state: RootState) => state.toDo.todos;

const selectPaginationMeta = (state: RootState) => state.toDo.pagingMeta;

const selectIsLoading = (state: RootState) => state.toDo.isLoading;

const selectError = (state: RootState) => state.toDo.error

export { selectToDoList, selectPaginationMeta, selectIsLoading, selectError };
