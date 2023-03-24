import React, { useMemo } from "react";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";
import { getRoomsArr } from "../../helpers/getRoomsCount";
import "./Basket.scss";
import { IRoom } from "../Calculator/components/RoomForm";
import { formatRooms } from "../../helpers/formatRooms";

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
