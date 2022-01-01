import React from "react";
import s from './Sidebar.module.scss';
import ProfileImg from '../../images/profile.png';
import MessagesImg from '../../images/messages.png';
import NewsImg from '../../images/news.png';
import MusicImg from '../../images/music.png';
import SettingsImg from '../../images/settings.png';
import { NavLink } from "react-router-dom";
import {FriendSidebarItem} from "../friendSidebarItem/FriendSidebarItem";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";

type PropsType = {}

export const Sidebar = (props: PropsType) =>{
    const id = useSelector<AppRootStateType, number|null>(state => state.authReducer.id);
    const sideBarData = [
        {icon: ProfileImg, title: 'Profile', navTitle: '/profile/' + id || ''},
        {icon: MessagesImg, title: 'Messages', navTitle: '/messages'},
        {icon: '', title: 'Users', navTitle: '/users'},
        {icon: NewsImg, title: 'News', navTitle: ''},
        {icon: MusicImg, title: 'Music', navTitle: ''},
        {icon: SettingsImg, title: 'Settings', navTitle: ''},
    ]

    return(
        <aside className={s.sidebar}>
            <div className={s.container}>
                <ul className={s.sidebarList}>
                    {sideBarData.map((item, i) =>{
                        return(
                            <li key={i} className={s.sidebarItem}>
                                <NavLink to={item.navTitle} className={s.sidebarLink}>
                                    <img className={s.menuImg} src={item.icon} alt=""/>
                                    <span className={s.menuText}>{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    })}

                    <li className={`${s.sidebarItem}  ${s.friendsSection}`}>
                        <FriendSidebarItem/>
                    </li>

                </ul>
            </div>
        </aside>
    )
};