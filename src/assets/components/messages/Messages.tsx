import React from "react";
import s from './Messages.module.scss';
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: number
}

type MessageType = {
    id: number
    message: string
}

const DialogItem = (props: DialogItemType) => {

    return (
        <li className={s.messageNamesItem} key={props.id}>
            <NavLink to={`/messages/${props.id}`} className={s.name}>
                {props.name}
            </NavLink>
        </li>
    )
};

const Message = (props: MessageType) => {
    return (
        <span className={s.message} key={props.id}>
            {props.message}
        </span>
    )
}

export const Messages = () => {

    const messagesData: Array<DialogItemType> = [

        {id: 1 ,name: "Somi"},
        {id: 2 ,name: "Nayeon"},
        {id: 3 ,name: "Jeongyeon"},
        {id: 4 ,name: "Momo"},
        {id: 5 ,name: "Sana"},
        {id: 6 ,name: "Jihyo"},
        {id: 7 ,name: "Tzuyu"},
        {id: 8 ,name: "Mina"},
        {id: 9 ,name: "Dahyun"},
        {id: 10 ,name: "Chaeyoung"},

    ];

    const messageContentData = [
        {id: 1 ,name: "Hi!"},
        {id: 2 ,name: "Twice!"},
        {id: 3 ,name: "Cool!"},
        {id: 4 ,name: "Somi!!!!!"},
    ]

    return (
        <div className={s.messages}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <ul className={s.messageNamesList}>

                        {messagesData.map(item =>{
                            return(
                                <DialogItem id={item.id} name={item.name}/>
                            )
                        })}

                    </ul>
                    <div className={s.messagesContent}>
                        {messageContentData.map(item =>{
                            return(
                                <Message id={item.id} message={item.name}/>
                            )
                        })}

                    </div>
                </div>
            </div>

        </div>
    )
};