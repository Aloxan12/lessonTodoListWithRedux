import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getRoomsArr } from "../../../helpers/getRoomsCount";
import { AppInput, InputMaskType } from "../../../components/AppInput/AppInput";
import { AppToggle } from "../../../components/AppToggle/AppToggle";
import { AppDropdown } from "../../../components/AppDropdown/AppDropdown";
import { AppButton } from "../../../components/AppButton/AppButton";
import { getPriceRoom } from "../../../helpers/getPriceRoom";
import { RoomPrice } from "./RoomPrice";

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

const emptyRoom: IRoom = {
  title: "",
  square: "0",
  lampCount: "0",
  pipeCount: "0",
  trackLightCount: "0",
  bigWidth: false,
  cornice: false,
  corniceLong: "0",
  corniceType: "Открытая ниша",
  price: 0,
};

export const RoomForm = React.memo(() => {
  const [newRoom, setNewRoom] = useState<IRoom>(emptyRoom);

  const [errorTitle, setErrorTitle] = useState("");
  const [errorSquare, setErrorSquare] = useState("");

  const [rate, setRate] = useState<null | number>(null);
  const price = useMemo(() => getPriceRoom({ room: newRoom }), [newRoom]);

  useEffect(() => {
    fetch("https://www.nbrb.by/api/exrates/rates/431", { method: "Get" })
      .then((response) => response.json())
      .then((data) => {
        setRate(data.Cur_OfficialRate);
      });
  }, []);

  const changeTitleHandler = useCallback(
    (value: string) => {
      setNewRoom((prevState) => ({
        ...prevState,
        title: value,
      }));
      !!errorTitle && setErrorTitle("");
    },
    [errorTitle]
  );
  const changeSquareHandler = useCallback(
    (value: string) => {
      setNewRoom((prevState) => ({
        ...prevState,
        square: value,
      }));
      !!errorSquare && setErrorSquare("");
    },
    [errorSquare]
  );
  const changeLampCountHandler = useCallback(
    (value: string) =>
      setNewRoom((prevState) => ({
        ...prevState,
        lampCount: value,
      })),
    []
  );
  const changeTrackLampHandler = useCallback(
    (value: string) =>
      setNewRoom((prevState) => ({
        ...prevState,
        trackLightCount: value,
      })),
    []
  );
  const changePipeCountHandler = useCallback(
    (value: string) =>
      setNewRoom((prevState) => ({
        ...prevState,
        pipeCount: value,
      })),
    []
  );
  const changeBidWidthHandler = useCallback(
    (value: boolean) =>
      setNewRoom((prevState) => ({
        ...prevState,
        bigWidth: value,
      })),
    []
  );
  const changeCorniceLongHandler = useCallback(
    (corniceLong: string) =>
      setNewRoom((prevState) => ({
        ...prevState,
        corniceLong,
      })),
    []
  );
  const changeCorniceHandler = useCallback(
    (value: boolean) =>
      setNewRoom((prevState) => ({
        ...prevState,
        cornice: value,
      })),
    []
  );
  const changeCorniceTypeHandler = useCallback(
    (value: CorniceType) =>
      setNewRoom((prevState) => ({
        ...prevState,
        corniceType: value,
      })),
    []
  );

  const addInBasketHandler = useCallback(() => {
    if (!newRoom.title) {
      setErrorTitle("Обязательное поле");
      return;
    }
    if (!newRoom.square || newRoom.square === "0") {
      setErrorSquare("Обязательное поле");
      return;
    }
    const rooms = getRoomsArr();
    const newRoomsArr = [
      { ...newRoom, price, id: new Date().valueOf() },
      ...rooms,
    ];
    localStorage.setItem("rooms", JSON.stringify(newRoomsArr));
    setNewRoom(emptyRoom);
  }, [newRoom, price, localStorage]);

  return (
    <div className="calculator-form">
      <AppInput
        value={newRoom.title}
        label={"Название помещения"}
        onChange={changeTitleHandler}
        error={!!errorTitle ? errorTitle : undefined}
      />
      <div className={"input-row"}>
        <AppInput
          value={`${newRoom.square}`}
          label={`Площадь помещения(м²)`}
          placeholder={"0"}
          onChange={changeSquareHandler}
          inputMask={InputMaskType.float}
          error={!!errorSquare ? errorSquare : undefined}
        />
        <AppInput
          value={newRoom.lampCount}
          label={"Количество люстр, светильников(шт.)"}
          placeholder={"0"}
          onChange={changeLampCountHandler}
          inputMask={InputMaskType.integer}
        />
      </div>
      <div className={"input-row"}>
        <AppInput
          value={newRoom.trackLightCount}
          label={`Трековый светильник(м.п.)`}
          placeholder={"0"}
          onChange={changeTrackLampHandler}
          inputMask={InputMaskType.integer}
        />
        <AppInput
          value={newRoom.pipeCount}
          label={"Труба под обход батареи(шт.)"}
          placeholder={"0"}
          onChange={changePipeCountHandler}
          inputMask={InputMaskType.integer}
        />
      </div>
      <div className={"checkbox-row"}>
        <AppToggle
          value={newRoom.bigWidth}
          onChange={changeBidWidthHandler}
          text={"Ширина помещения больше 3.2м ?"}
        />
        <AppToggle
          value={newRoom.cornice}
          onChange={changeCorniceHandler}
          text={"Добавить карниз"}
        />
      </div>
      {newRoom.cornice && (
        <React.Fragment>
          <div className={"dropdown-row"}>
            <div className="app-dropdown" />
            <AppDropdown
              label={"Выберетие тип карниза"}
              value={newRoom.corniceType}
              onChange={changeCorniceTypeHandler}
              data={[
                "Открытая ниша",
                "Ниша с аллюминевым карнизом (закрытая ниша)",
                "Потолочный",
              ]}
            />
          </div>
          <div className={"input-row"}>
            <div className={"app-input"} />
            <AppInput
              value={newRoom.corniceLong}
              label={"Длинна корниза(м)"}
              onChange={changeCorniceLongHandler}
              inputMask={InputMaskType.float}
              maxValue={10}
            />
          </div>
        </React.Fragment>
      )}
      <RoomPrice price={price} dollarRate={rate} />
      <div className="buttons-wrap">
        <AppButton title="Добавить в корзину" onClick={addInBasketHandler} />
      </div>
    </div>
  );
});
