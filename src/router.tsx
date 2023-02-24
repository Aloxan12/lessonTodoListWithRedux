import { BrowserRouter, Route, Routes } from "react-router-dom"
import {App} from "./App";

const routes = [
    {
        id: 'Home',
        path: '/',
        component: <App />
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