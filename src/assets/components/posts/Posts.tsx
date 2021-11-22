import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Posts.module.scss';
import {Button} from "@mui/material";
import {Post} from "../post/Post";
import DahyunImg from '../../images/dahyun.jpeg';
import {PostsType} from "../../../redux/state";
import {addPostAC} from "../../../redux/profile-reducer";

type PropsType = {
    posts: Array<PostsType>;
    message: string
    dispatch: (action: any) => void
}

export const Posts = (props: PropsType) => {


    const updatePostTextAC = (newMessageText: string) => {
        return {
            type: 'UPDATE-POST',
            newMessageText,
        } as const
    }

    const [newMessage, setNewMessage] = useState('');

    const addNewPost = () => {
        if (newMessage !== '') {

            props.dispatch(updatePostTextAC(newMessage));
            props.dispatch(addPostAC());


            setNewMessage('');
        }
    }

    const onClickHandler = () => {
        addNewPost();
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            addNewPost();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.currentTarget.value);
    }

    return (
        <div className={s.posts}>

            <h2 className={s.title}>My posts</h2>
            <div className={s.inputBox}>

                <textarea
                    onKeyPress={onKeyPressHandler}
                    className={s.textarea}
                    value={newMessage}
                    onChange={onChangeHandler}
                />

                <Button
                    onClick={onClickHandler}
                    variant="contained"
                >
                    Add Post
                </Button>
            </div>

            {props.posts.map((post, i) => {
                return (
                    <Post
                        key={i}
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