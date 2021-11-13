import React from "react";
import s from './Messages.module.scss';
import {DialogItem} from "../dialogItem/DialogItem";
import {Message} from "../message/Message";
import {MessagesPageType} from "../../../redux/state";
import {Button} from "@mui/material";


type PropsType = {
    messages: MessagesPageType
}

export const Messages = (props: PropsType) => {

    const onClickHandler = () => {

    }

    return (
        <div className={s.messages}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={s.contentBox}>
                        <ul className={s.messageNamesList}>

                            {props.messages.messagesData.map(item => {
                                return (
                                    <DialogItem key={item.id} id={item.id} name={item.name}/>
                                )
                            })}

                        </ul>
                        <div className={s.messagesContent}>
                            {props.messages.messageContentData.map(item => {
                                return (
                                    <Message id={item.id} message={item.name}/>
                                )
                            })}

                        </div>
                    </div>
                    <div className={s.textAreaMessageBox}>
                        <textarea className={s.textAreaMessage}></textarea>
                        <Button onClick={onClickHandler} variant="contained">
                            Add Post
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
};