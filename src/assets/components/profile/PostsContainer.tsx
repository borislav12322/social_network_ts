import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Posts} from "../posts/Posts";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {addPostAC, PostsType, updatePostAC} from "../../../redux/profile-reducer";

export const PostsContainer = () => {

    const posts = useSelector<AppRootStateType, Array<PostsType>>(state => state.profileReducer.posts);

    const dispatch = useDispatch();

    const [newMessage, setNewMessage] = useState('');

    const addNewPost = () => {
        if (newMessage !== '') {
            dispatch(updatePostAC(newMessage));
            dispatch(addPostAC());
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
        <Posts
            posts={posts}
            onClickHandler={onClickHandler}
            onKeyPressHandler={onKeyPressHandler}
            onChangeHandler={onChangeHandler}
            newMessage={newMessage}
        />
    )
}

const mapStateToProps = (posts: Array<PostsType>) => {
    return {
        posts,
    }
}
const mapDispatchToProps = (dispatch: any) => {

    // return {
    //     addNewPost: ()=>{
    //
    //         if (newMessage !== '') {
    //             dispatch(updatePostAC(newMessage));
    //             dispatch(addPostAC());
    //             setNewMessage('');
    //         }
    //     },
    //
    // }
}

export const Connector = connect(mapStateToProps, mapDispatchToProps)(Posts);