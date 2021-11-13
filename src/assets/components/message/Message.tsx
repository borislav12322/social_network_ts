import s from "../messages/Messages.module.scss";
import React from "react";

type MessageType = {
    id: number
    message: string
}
export const Message = (props: MessageType) => {
    return (
        <span className={s.message} key={props.id}>
            {props.message}
        </span>
    )
}