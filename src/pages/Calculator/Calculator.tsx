import React from "react";
import "./Calculator.scss";
import { CalculatorTitle } from "./components/CalculatorTitle";
import { RoomForm } from "./components/RoomForm";

interface ICalculatorProps {
  setRoomCount?: (value: number) => void;
}

export const Calculator = ({ setRoomCount }: ICalculatorProps) => {
  return (
    <div className="calculator-wrap">
      <CalculatorTitle />
      <RoomForm setRoomCount={setRoomCount} />
    </div>
  );
};
