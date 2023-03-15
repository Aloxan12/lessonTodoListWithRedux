import React from "react";
import { AppTitlePage } from "../../../components/AppTitlePage/AppTitlePage";
import "../Calculator.scss";

export const CalculatorTitle = React.memo(() => {
  return (
    <div className="calculator-title-wrap">
      <AppTitlePage title="Калькулятор" />
      <span className="sub-title">
        Здесь вы можете рассчитать примерную стоимость
      </span>
    </div>
  );
});
