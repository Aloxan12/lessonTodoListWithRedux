import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  // [api.reducerPath]: api.reducer,
  // unloading: UnloadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
