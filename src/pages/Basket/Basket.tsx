import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";
import "./Basket.scss";
import { IRoom } from "../Calculator/components/RoomForm";
import { formatRooms } from "../../helpers/formatRooms";
import { pluralizePoints } from "../../helpers/pluralizePoints";
import rubbish from "../../utils/icons/icon-rubbish.png";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeRoom } from "../../store/rooms/roomsSlice";

export const Basket = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.rooms);
  const [rate, setRate] = useState<null | number>(null);
  const totalPrice = useMemo(
    () => rooms.reduce((acc, el) => acc + el.price, 0),
    [rooms]
  );

  useEffect(() => {
    fetch("https://www.nbrb.by/api/exrates/rates/431", { method: "Get" })
      .then((response) => response.json())
      .then((data) => {
        setRate(data.Cur_OfficialRate);
      });
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      dispatch(removeRoom({ id }));
    },
    [rooms, dispatch]
  );

  return (
    <div className="basket-wrap">
      <AppTitlePage title="Корзина" />
      {!!rooms.length && (
        <h2>
          У вас в корзине {formatRooms(rooms.length)}. Общая стоимость{" "}
          {rate ? `${(rate * totalPrice).toFixed(0)} руб.` : `${totalPrice}$`}
        </h2>
      )}
      <div className="basket-rooms-wrap">
        {!!rooms.length ? (
          rooms.map((item: IRoom, index: number) => (
            <RoomItem
              rate={rate}
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
  rate: number | null;
  removeRoom: (id: string) => void;
}

const RoomItem = React.memo(({ room, removeRoom, rate }: IRoomItemProps) => {
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
        <b>Цена:</b>{" "}
        {rate ? `${(rate * room.price).toFixed(0)} руб.` : `${room.price}$`}
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
