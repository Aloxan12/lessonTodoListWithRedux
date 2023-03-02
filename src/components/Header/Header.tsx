import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    return (
        <header className='header-main'>
            <div className='container header-wrap'>
                <div className="title">
                    <h1>
                        Натяжные потолки
                    </h1>
                </div>
                <div className="nav-wrap">
                    <div className='burger-menu' onClick={()=>setIsShowMenu(prevState => !prevState)}>
                        <div />
                    </div>
                    <nav className={`nav ${isShowMenu ? 'active-nav' : ''}`}>
                        <NavLink to=''>Главная</NavLink>
                        <NavLink to=''>Калькулятор</NavLink>
                        <NavLink to=''>Мои Работы</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};