import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Posts.module.scss';
import {Button} from "@mui/material";
import {Post} from "../post/Post";
import DahyunImg from '../../images/dahyun.jpeg';
import {PostsType} from "../../../redux/profile-reducer";


type PropsType = {
    posts: Array<PostsType>
    onClickHandler: () => void
    onKeyPressHandler: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    onChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
    newMessage: string

}

export const Posts = ({posts, onKeyPressHandler, onClickHandler, onChangeHandler ,newMessage, ...props}: PropsType) => {

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

            {posts.map((post, i) => {
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