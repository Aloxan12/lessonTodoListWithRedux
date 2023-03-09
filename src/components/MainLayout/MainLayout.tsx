import React from 'react';
import './MainLayout.scss'

interface IMainLayoutProps{
    children: JSX.Element
}

export const MainLayout = ({children}:IMainLayoutProps) => {
    return <main className='container'>
        {children}
    </main>
}