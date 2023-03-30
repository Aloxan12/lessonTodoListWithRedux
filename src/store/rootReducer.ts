import { combineReducers } from "@reduxjs/toolkit";
import { roomsReducer } from "./rooms/roomsSlice";

export const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
