import React from "react";
import s from './Sidebar.module.scss';
import ProfileImg from '../../images/profile.png';
import MessagesImg from '../../images/messages.png';
import NewsImg from '../../images/news.png';
import MusicImg from '../../images/music.png';
import SettingsImg from '../../images/settings.png';
import { NavLink } from "react-router-dom";
import {FriendSidebarItem} from "../friendSidebarItem/FriendSidebarItem";

type PropsType = {}

export const Sidebar = (props: PropsType) =>{
    return(
        <aside className={s.sidebar}>
            <div className={s.container}>
                <ul className={s.sidebarList}>
                    <li className={s.sidebarItem}>
                        <NavLink to="/profile" className={s.sidebarLink}>
                            <img className={s.menuImg} src={ProfileImg} alt=""/>
                            <span className={s.menuText}>Profile</span>
                        </NavLink>
                    </li>
                    <li className={s.sidebarItem}>
                        <NavLink to="/messages" className={s.sidebarLink}>
                            <img className={s.menuImg} src={MessagesImg} alt=""/>
                            <span className={s.menuText}>Messages</span>
                        </NavLink>
                    </li>
                    <li className={s.sidebarItem}>
                        <a href="" className={s.sidebarLink}>
                            <img className={s.menuImg} src={NewsImg} alt=""/>
                            <span className={s.menuText}>News</span>
                        </a>
                    </li>
                    <li className={s.sidebarItem}>
                        <a href="" className={s.sidebarLink}>
                            <img className={s.menuImg} src={MusicImg} alt=""/>
                            <span className={s.menuText}>Music</span>
                        </a>
                    </li>
                    <li className={s.sidebarItem}>
                        <a href="" className={s.sidebarLink}>
                            <img className={s.menuImg} src={SettingsImg} alt=""/>
                            <span className={s.menuText}>Settings</span>
                        </a>
                    </li>
                    <li className={`${s.sidebarItem}  ${s.friendsSection}`}>
                        <FriendSidebarItem/>
                    </li>

                </ul>
            </div>
        </aside>
    )
};