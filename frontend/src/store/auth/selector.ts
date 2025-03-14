import { RootState } from "..";

const selectError = (state: RootState) => state.auth.error;

const selectUser = (state: RootState) => state.auth.user;

const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

const selectIsLoading = (state: RootState) => state.auth.isLoading;

export { selectError, selectUser, selectIsAuthenticated, selectIsLoading };
