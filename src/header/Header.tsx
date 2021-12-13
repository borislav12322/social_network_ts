import React from "react";
import s from './Header.module.scss'
import Logo from '../assets/images/twice.png'
import {NavLink} from "react-router-dom";

type PropsType = {
    login: string | null
    isAuth: boolean
}

export const Header = (props: PropsType) => {

    const isAuth = props.isAuth ? props.login :(<NavLink to={'/login'}>Login</NavLink>);

    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <a className={s.logoLink} href="/">
                        <img className={s.logo} src={Logo} alt="logo"/>
                    </a>
                    {isAuth}
                </div>
            </div>
        </header>
    )
}