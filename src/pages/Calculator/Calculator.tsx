import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Calculator.scss";
import { AppInput, InputMaskType } from "../../components/AppInput/AppInput";
import { AppToggle } from "../../components/AppToggle/AppToggle";
import { AppDropdown } from "../../components/AppDropdown/AppDropdown";
import { AppButton } from "../../components/AppButton/AppButton";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";

export const Calculator = () => {
  return (
    <div className="calculator-wrap">
      <CalculatorTitle />
      <RoomForm />
    </div>
  );
};

const CalculatorTitle = React.memo(() => {
  return (
    <div className="calculator-title-wrap">
      <AppTitlePage title="Калькулятор" />
      <span className="sub-title">
        Здесь вы можете рассчитать примерную стоимость
      </span>
    </div>
  );
});

type CorniceType =
  | "Открытая ниша"
  | "Ниша с аллюминевым карнизом (закрытая ниша)"
  | "Потолочный";

interface IRoom {
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
}

interface IPriceSumProps {
  room: IRoom;
}

const priceSum = ({ room }: IPriceSumProps) => {
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
};

const RoomForm = React.memo(() => {
  const [newRoom, setNewRoom] = useState<IRoom>(emptyRoom);

  const [errorTitle, setErrorTitle] = useState("");
  const [errorSquare, setErrorSquare] = useState("");

  const [rate, setRate] = useState<null | number>(null);
  const price = useMemo(() => priceSum({ room: newRoom }), [newRoom]);

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
    console.log("создаем");
  }, [newRoom, price]);

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

interface RoomPriceProps {
  price: number;
  dollarRate?: number | null;
}

const RoomPrice = React.memo(({ price, dollarRate }: RoomPriceProps) => {
  return (
    <div className="room-price-wrap">
      <span>
        <b>Итого:</b>
      </span>
      <span>
        <b>
          {!!dollarRate
            ? `${(dollarRate * price).toFixed(2)} руб.`
            : `${price} $`}
        </b>
      </span>
    </div>
  );
});
