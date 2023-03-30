import React, { useCallback, useMemo } from "react";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";
import "./Basket.scss";
import { IRoom } from "../Calculator/components/RoomForm";
import { formatRooms } from "../../helpers/formatRooms";
import { pluralizePoints } from "../../helpers/pluralizePoints";
import rubbish from "../../utils/icons/icon-rubbish.png";
import { useAppSelector } from "../../store/store";

export const Basket = () => {
  const { rooms } = useAppSelector((state) => state.rooms);
  const totalPrice = useMemo(
    () => rooms.reduce((acc, el) => acc + el.price, 0),
    [rooms]
  );

  const removeItem = useCallback(
    (id: string) => {
      // const newArr = rooms.filter((room) => room.id !== id);
      // localStorage.setItem("rooms", JSON.stringify(newArr));
      // setRooms(newArr);
    },
    [rooms]
  );

  return (
    <div className="basket-wrap">
      <AppTitlePage title="Корзина" />
      <h2>
        У вас в корзине {formatRooms(rooms.length)}. Общая стоимость{" "}
        {totalPrice}$
      </h2>
      <div className="basket-rooms-wrap">
        {!!rooms.length ? (
          rooms.map((item: IRoom, index: number) => (
            <RoomItem
              room={item}
              key={`${item.id} ${index}`}
              removeRoom={removeItem}
            />
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
  removeRoom: (id: string) => void;
}

const RoomItem = React.memo(({ room, removeRoom }: IRoomItemProps) => {
  const removeRoomHandler = useCallback(() => {
    if (!!room.id) {
      removeRoom(room.id);
    }
  }, [room]);
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
      <div className="rubbish">
        <img
          className="rubbish-icon"
          src={rubbish}
          alt="удалить"
          onClick={removeRoomHandler}
        />
      </div>
    </div>
  );
});
