import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <header className='header-main'>
            <div className='container header-wrap'>
                <div className="title">Натяжные потолки</div>
                <nav className='nav'>
                    <NavLink to=''>Главная</NavLink>
                    <NavLink to=''>Калькулятор</NavLink>
                    <NavLink to=''>Мои Работы</NavLink>
                </nav>
            </div>
        </header>
    );
};