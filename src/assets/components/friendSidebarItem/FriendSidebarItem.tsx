import React from "react";
import s from './FriendSidebarItem.module.scss';
import {FriendsSectionType} from "../../../redux/state";

type PropsType = {
    friends: Array<FriendsSectionType>
}

export const FriendSidebarItem = (props: PropsType) => {
    return (


        <ul className={s.friendList}>
            {props.friends.map(f=>{
                return(
                    <li key={f.id} className={s.friendItem}>
                        <img className={s.img} src={f.photo} alt="photo"/>
                        <span className={s.name}>{f.name}</span>
                    </li>
                )
            })}
        </ul>

    )
}