import { RootState } from "../../../store";

const selectToDoList = (state: RootState) => state.toDo.todos;

const selectIsLoading = (state: RootState) => state.toDo.isLoading;

const selectShowAddToDo = (state: RootState) => state.toDo.showAddToDo;

const selectError = (state: RootState) => state.toDo.error

export { selectToDoList, selectIsLoading, selectShowAddToDo, selectError };
