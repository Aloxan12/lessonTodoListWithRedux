import React, {useCallback, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = React.memo(() => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const onChangeShowHandler = useCallback(()=>{
        setIsShowMenu(prevState => !prevState)
    },[])
    return (
        <header className='header-main'>
            <div className='container header-wrap'>
                <div className="title">
                    <h1>
                        Натяжные потолки
                    </h1>
                </div>
                <div className="nav-wrap">
                    <div className='burger-menu' onClick={onChangeShowHandler}>
                        <div />
                    </div>
                    <nav className={`nav ${isShowMenu ? 'active-nav' : ''}`}>
                        <NavLink to='/'>Главная</NavLink>
                        <NavLink to='/calculator'>Калькулятор</NavLink>
                        <NavLink to=''>Мои Работы</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
})