import s from "../messages/Messages.module.scss";
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    id: number
    name: string
}


export const DialogItem = (props: PropsType) => {

    return (
        <li className={s.messageNamesItem}>
            <NavLink to={`/messages/${props.id}`} className={s.name}>
                {props.name}
            </NavLink>
        </li>
    )
};