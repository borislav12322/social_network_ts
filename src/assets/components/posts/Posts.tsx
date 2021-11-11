import React from "react";
import s from './Posts.module.scss';
import {Button} from "@mui/material";
import {Post} from "../post/Post";
import DahyunImg from '../../images/dahyun.jpeg';

export const Posts = () => {
    return (
        <div className={s.posts}>

            <h2 className={s.title}>My posts</h2>
            <div className={s.inputBox}>
                <textarea className={s.textarea} name="" id=""></textarea>
                <Button variant="contained">
                    Add Post
                </Button>
            </div>
            <Post
                message={'Hello!'}
                avatar={DahyunImg}
            />
        </div>
    )
}