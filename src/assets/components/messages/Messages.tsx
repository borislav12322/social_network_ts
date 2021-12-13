import React, {ChangeEvent} from "react";
import s from './Messages.module.scss';
import {DialogItem} from "../dialogItem/DialogItem";
import {Message} from "../message/Message";
import {Button} from "@mui/material";
import {
    DialogItemType,
    MessageContentDataType,
    sendNewMessageAC,
    updateNewMessageAC
} from "../../../redux/messages-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {Navigate} from "react-router-dom";

type PropsType = {}

export const Messages = (props: PropsType) => {

    const newText = useSelector<AppRootStateType, string>(state => state.messagesReducer.newMessageText);
    const messagesContentData = useSelector<AppRootStateType, Array<MessageContentDataType>>(state => state.messagesReducer.messageContentData)
    const messagesData = useSelector<AppRootStateType, Array<DialogItemType>>(state => state.messagesReducer.messagesData)
    const dispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType,boolean>(state => state.authReducer.isAuth);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewMessageAC(e.currentTarget.value));
    }

    const onClickHandler = () => {
        dispatch(sendNewMessageAC());
        dispatch(updateNewMessageAC(''));
    }

    if(!isAuth){
        return <Navigate to='/login'/>
    }

    return (
        <div className={s.messages}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={s.contentBox}>
                        <ul className={s.messageNamesList}>

                            {messagesData.map(item => {
                                return (
                                    <DialogItem key={item.id} id={item.id} name={item.name}/>
                                )
                            })}

                        </ul>
                        <div className={s.messagesContent}>
                            {messagesContentData.map(item => {
                                return (
                                    <Message key={item.id} id={item.id} message={item.text}/>
                                )
                            })}

                        </div>
                    </div>
                    <div className={s.textAreaMessageBox}>
                        <textarea
                            className={s.textAreaMessage}
                            value={newText}
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