import React from 'react';
import './AppTitlePage.scss'

interface IAppTitlePageProps{
    title: string
}

export const AppTitlePage = React.memo(({title}:IAppTitlePageProps) => {
    return (
        <header className='title-page-wrap'>
            <h1>{title}</h1>
            <div className='line' />
        </header>
    );
})