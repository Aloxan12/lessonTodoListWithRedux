import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../utils/images/logo.png";
import { getRoomsArr } from "../../helpers/getRoomsCount";

const navbarRoute = [
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Калькулятор",
    path: "/calculator",
  },
  {
    title: `Корзина`,
    path: "/basket",
  },
];

export const Header = React.memo(() => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const openCloseChangeShowHandler = useCallback(() => {
    setIsShowMenu((prevState) => !prevState);
  }, []);
  const closeChangeShowHandler = useCallback(() => {
    setIsShowMenu(false);
  }, []);
  const [basketCount, setBasketCount] = useState(0);
  const roomsCount = getRoomsArr().length;

  useEffect(() => {
    if (!!roomsCount) {
      setBasketCount(roomsCount);
    }
  }, [roomsCount]);
  return (
    <header className="header-main">
      <div className="container header-wrap">
        <div className="title">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="nav-wrap">
          <div className="burger-menu" onClick={openCloseChangeShowHandler}>
            <div />
          </div>
          <nav className={`nav ${isShowMenu ? "active-nav" : ""}`}>
            {navbarRoute.map((item) => {
              return (
                <NavLink
                  to={item.path}
                  key={item.title}
                  onClick={closeChangeShowHandler}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {item.title === "Корзина"
                    ? `Корзина (${basketCount})`
                    : item.title}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
});
