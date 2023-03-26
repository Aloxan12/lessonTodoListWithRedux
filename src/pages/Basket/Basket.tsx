import React, { useMemo } from "react";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";
import { getRoomsArr } from "../../helpers/getRoomsCount";
import "./Basket.scss";
import { IRoom } from "../Calculator/components/RoomForm";
import { formatRooms } from "../../helpers/formatRooms";
import { pluralizePoints } from "../../helpers/pluralizePoints";

export const Basket = () => {
  const rooms: IRoom[] = useMemo(() => getRoomsArr(), [localStorage]);
  const totalPrice = useMemo(
    () => rooms.reduce((acc, el) => acc + el.price, 0),
    [rooms]
  );

  return (
    <div className="basket-wrap">
      <AppTitlePage title="Корзина" />
      <h2>
        У вас в корзине {formatRooms(rooms.length)}. Общая стоимость
        {totalPrice}$
      </h2>
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
        {!!room.lampCount
          ? `${pluralizePoints(Number(room.lampCount))} света`
          : "без точек света"}{" "}
        {room.cornice && ", есть карниз"}
      </div>
    </div>
  );
});
