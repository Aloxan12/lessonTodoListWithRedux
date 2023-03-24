import React, { useMemo } from "react";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";
import { getRoomsArr } from "../../helpers/getRoomsCount";
import "./Basket.scss";
import { IRoom } from "../Calculator/components/RoomForm";

function formatRooms(num: number) {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["комната", "комнаты", "комнат"];
  const index =
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5];
  return `${num} ${titles[index]}`;
}

export const Basket = () => {
  const rooms = useMemo(() => getRoomsArr(), [localStorage]);

  return (
    <div className="calculator-wrap">
      <AppTitlePage title="Корзина" />
      <h2>У вас в корзине {formatRooms(rooms.length)}</h2>
      <div className="basket-rooms-wrap">
        {!!rooms.length ? (
          rooms.map((item: IRoom, index: number) => (
            <div key={`${item.id} ${index}`}>
              {item.title} {item.price}$
            </div>
          ))
        ) : (
          <div className="empty-block">
            <span>Помещений нет</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface IRoomItemProps {
  room: IRoom;
}

const RoomItem = React.memo(({}: IRoomItemProps) => {
  return <div></div>;
});
