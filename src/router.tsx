import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./pages/Main/App";
import { About } from "./pages/About/About";
import { Calculator } from "./pages/Calculator/Calculator";
import { Header } from "./components/Header/Header";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { Footer } from "./components/Footer/Footer";
import { Basket } from "./pages/Basket/Basket";
import { getRoomsArr } from "./helpers/getRoomsCount";
import { useEffect } from "react";

const routes = [
  {
    id: "Home",
    path: "/",
    component: <App />,
  },
  {
    id: "About",
    path: "/about",
    component: <About />,
  },
  {
    id: "Calculator",
    path: "/calculator",
    component: <Calculator />,
  },
  {
    id: "Basket",
    path: "/basket",
    component: <Basket />,
  },
  {
    id: "Default",
    path: "*",
    component: <App />,
  },
];

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainLayout>
        <Routes>
          {routes.map(({ id, path, component }) => (
            <Route key={id} path={path} element={component} />
          ))}
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  );
};
