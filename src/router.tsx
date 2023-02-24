import { BrowserRouter, Route, Routes } from "react-router-dom"
import {App} from "./App";

export const About = ()=>{
    return <div>about</div>
}

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