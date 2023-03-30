import React from "react";
import "./Calculator.scss";
import { CalculatorTitle } from "./components/CalculatorTitle";
import { RoomForm } from "./components/RoomForm";

export const Calculator = () => {
  return (
    <div className="calculator-wrap">
      <CalculatorTitle />
      <RoomForm />
    </div>
  );
};
