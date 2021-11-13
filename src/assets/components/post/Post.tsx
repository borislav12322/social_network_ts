import React from "react";
import s from './Post.module.scss';

type PropsType = {
    avatar: string
    message: string
    likesCount: number
    id: number

}

export const Post = ({avatar,message ,likesCount,...props}: PropsType) => {
    return (
        <div className={s.post}>
            <div className={s.contentBox}>
                <img className={s.avatar} src={avatar} alt="avatar"/>
                <span className={s.message}>
                    {message}
                </span>
            </div>
            <span className={s.likes}>{likesCount}</span>

        </div>
    )
}