import React from "react";
import s from './Header.module.scss'
import Logo from '../assets/images/twice.png'

export const Header = () =>{
    return(
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <a className={s.logoLink} href="/">
                        <img className={s.logo} src={Logo} alt="logo"/>
                    </a>
                </div>
            </div>
        </header>
    )
}