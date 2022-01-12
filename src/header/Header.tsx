import React from "react";
import s from './Header.module.scss'
import Logo from '../assets/images/twice.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {logoutTC} from "../redux/auth-reducer";

type PropsType = {
    login: string | null
    isAuth: boolean
    id: number|null
}

export const Header = (props: PropsType) => {

    const dispatch = useDispatch();
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn);
    const isAuth = isLogged ? props.login :(<NavLink to={'/login'}>Login</NavLink>);

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.wrapper}>

                    <a className={s.logoLink} href="/">
                        <img className={s.logo} src={Logo} alt="logo"/>
                    </a>
                    <span>{isAuth}</span>
                    {isLogged && <button onClick={logout}>Logout</button>}
                </div>
            </div>
        </header>
    )
}