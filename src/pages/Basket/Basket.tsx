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
            <RoomItem room={item} key={`${item.id} ${index}`} />
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

const RoomItem = React.memo(({ room }: IRoomItemProps) => {
  return (
    <div className="room-item">
      <div className="room-title">
        <b>Название:</b> {room.title}
      </div>
      <div className="room-price">
        <b>Цена:</b> {room.price}$
      </div>
      <div className="room-price">
        <b>Описание:</b> Площадь помещения {room.square}м²,{" "}
        {!!room.lampCount ? room.lampCount + " точек света" : "без точек света"}
      </div>
    </div>
  );
});
