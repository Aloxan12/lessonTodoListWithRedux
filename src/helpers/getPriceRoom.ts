import { IRoom } from "../pages/Calculator/components/RoomForm";

interface IGetPriceRoomProps {
  room: IRoom;
}

export const getPriceRoom = ({ room }: IGetPriceRoomProps) => {
  const {
    bigWidth,
    square,
    corniceLong,
    corniceType,
    lampCount,
    pipeCount,
    cornice,
    trackLightCount,
  } = room;
  let totalPrice: number = 0;
  if (bigWidth) {
    totalPrice += +square * 10;
  } else {
    totalPrice += +square * 8;
  }

  totalPrice += +lampCount * 6; // Точки света
  totalPrice += +pipeCount * 5; // Трубы
  totalPrice += +trackLightCount * 20; // Трубы

  if (cornice) {
    switch (corniceType) {
      case "Открытая ниша":
        totalPrice += +corniceLong * 10;
        break;
      case "Ниша с аллюминевым карнизом (закрытая ниша)":
        totalPrice += +corniceLong * 20;
        break;
      case "Потолочный":
        totalPrice += +corniceLong * 8;
        break;
      default:
        return totalPrice;
    }
  }

  return totalPrice;
};
