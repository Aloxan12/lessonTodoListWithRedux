import React from "react";

interface RoomPriceProps {
  price: number;
  dollarRate?: number | null;
}

export const RoomPrice = React.memo(({ price, dollarRate }: RoomPriceProps) => {
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
