import React, {ChangeEvent} from "react";
import s from './Messages.module.scss';
import {DialogItem} from "../dialogItem/DialogItem";
import {Message} from "../message/Message";
import {MessagesPageType, stateType} from "../../../redux/state";
import {Button} from "@mui/material";
import {sendNewMessageAC, updateNewMessageAC} from "../../../redux/messages-reducer";

type PropsType = {
    messages: MessagesPageType
    dispatch: (action: any) => void
    state: stateType
}

export const Messages = (props: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageAC(e.currentTarget.value));
    }

    const onClickHandler = () => {
        props.dispatch(sendNewMessageAC());
        props.dispatch(updateNewMessageAC(''));
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
                                    <Message id={item.id} message={item.text}/>
                                )
                            })}

                        </div>
                    </div>
                    <div className={s.textAreaMessageBox}>
                        <textarea
                            className={s.textAreaMessage}
                            value={props.state.messages.newMessageText}
                            onChange={onChangeHandler}
                        />
                        <Button onClick={onClickHandler} variant="contained">
                            Add Message
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
};