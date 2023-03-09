import React, {useCallback, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const navbarRoute = [
    {
       title: 'Главная',
       path: '/'
    },
    {
        title: 'Калькулятор',
        path: '/calculator'
    },
    {
        title: 'Корзина',
        path: '/basket'
    }
]

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
                        {navbarRoute.map((item)=>{
                            return <NavLink
                                to={item.path}
                                key={item.title}
                                onClick={onChangeShowHandler}
                                className={({isActive})=> isActive ? 'active-link' : ''}
                            >{item.title}</NavLink>
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
})