type CorniceType =
  | "Открытая ниша"
  | "Ниша с аллюминевым карнизом (закрытая ниша)"
  | "Потолочный";

export interface IRoom {
  id?: string;
  title: string;
  lampCount: string;
  pipeCount: string;
  trackLightCount: string;
  square: string;
  bigWidth: boolean;
  cornice: boolean;
  corniceLong: string;
  corniceType: CorniceType;
  price: number;
}

interface RoomsState {
  rooms: IRoom[];
}

export const RoomSInitialState: RoomsState = {
  rooms: [],
};
