import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom, RoomSInitialState } from "./roomsState";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: RoomSInitialState,
  reducers: {
    addRoom: (state, { payload: { room } }: PayloadAction<{ room: IRoom }>) => {
      return { ...state, rooms: [...state.rooms, room] };
    },
    removeRoom: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      const newArr = state.rooms.filter((room) => room.id !== id);
      return { ...state, rooms: newArr };
    },
  },
});

export const { reducer: roomsReducer } = roomsSlice;
export const { addRoom, removeRoom } = roomsSlice.actions;
