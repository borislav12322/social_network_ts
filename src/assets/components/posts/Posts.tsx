import React, {ChangeEvent, LegacyRef, useState} from "react";
import s from './Posts.module.scss';
import {Button} from "@mui/material";
import {Post} from "../post/Post";
import DahyunImg from '../../images/dahyun.jpeg';
import {PostsType} from "../../../redux/state";

type PropsType = {
    posts: Array<PostsType>;
    addPost: (postMessage: string) => void
    message: string
    changeTextAreaHandler: (newText: string) => void
}

export const Posts = (props: PropsType) => {

    const [newMessage, setNewMessage] = useState('');

    const onClickHandler = () => {
        if (newMessage !== '') {
            props.addPost(newMessage.trim());
            setNewMessage('');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.currentTarget.value);
    }

    return (
        <div className={s.posts}>

            <h2 className={s.title}>My posts</h2>
            <div className={s.inputBox}>
                <textarea className={s.textarea} value={newMessage} onChange={onChangeHandler}></textarea>
                <Button onClick={onClickHandler} variant="contained">
                    Add Post
                </Button>
            </div>

            {props.posts.map(post => {
                return (
                    <Post
                        message={post.message}
                        avatar={DahyunImg}
                        likesCount={post.likesCount}
                        id={post.id}
                    />
                )
            })}
        </div>
    )
};