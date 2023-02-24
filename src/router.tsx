import { BrowserRouter, Route, Routes } from "react-router-dom"
import {App} from "./pages/Main/App";
import {About} from "./pages/About/About";

const routes = [
    {
        id: 'Home',
        path: '/',
        component: <App />
    },
    {
        id: 'About',
        path: '/about',
        component: <About />
    }
]

export const AppRouter = ()=>{
    return <BrowserRouter>
        <Routes>
            {routes
                .map(({id, path, component})=>
                    <Route key={id} path={path} element={component} />
                )}
        </Routes>
    </BrowserRouter>
}