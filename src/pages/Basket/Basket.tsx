import React, { useMemo } from "react";
import { AppTitlePage } from "../../components/AppTitlePage/AppTitlePage";
import { getRoomsArr } from "../../helpers/getRoomsCount";

export const Basket = () => {
  const rooms = useMemo(() => getRoomsArr(), [localStorage]);

  return (
    <div className="calculator-wrap">
      <AppTitlePage title="Корзина" />
      <div></div>
    </div>
  );
};
