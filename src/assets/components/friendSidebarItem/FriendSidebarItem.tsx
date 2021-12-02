import React from "react";
import s from './FriendSidebarItem.module.scss';
import {FriendsSectionType} from "../../../redux/sidebar-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";

type PropsType = {
}

export const FriendSidebarItem = (props: PropsType) => {

    const friends = useSelector<AppRootStateType, Array<FriendsSectionType>>(state => state.sidebarReducer.friends)

    return (

        <ul className={s.friendList}>
            {friends.map(f=>{
                return(
                    <li key={f.id} className={s.friendItem}>
                        <img className={s.img} src={f.photo} alt="Friends Photo"/>
                        <span className={s.name}>{f.name}</span>
                    </li>
                )
            })}
        </ul>

    )
}