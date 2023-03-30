import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom, RoomSInitialState } from "./roomsState";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: RoomSInitialState,
  reducers: {
    addRoom: (state, { payload: { room } }: PayloadAction<{ room: IRoom }>) => {
      return { ...state, rooms: [...state.rooms, room] };
    },
  },
});

export const { reducer: roomsReducer } = roomsSlice;
export const { addRoom } = roomsSlice.actions;
