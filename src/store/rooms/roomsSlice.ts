import { createSlice } from "@reduxjs/toolkit";
import { RoomSInitialState } from "./roomsState";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: RoomSInitialState,
  reducers: {},
});

export const { reducer: roomsReducer } = roomsSlice;
export const {} = roomsSlice.actions;
