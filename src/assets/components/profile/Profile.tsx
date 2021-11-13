import React from "react";
import s from './Profile.module.scss';
import Background from '../../images/monterey_bg.jpeg';
import {ProfileInfo} from "../profileInfo/ProfileInfo";
import Photo from '../../images/profile_photo.png'
import {Posts} from "../posts/Posts";
import {PostsType, ProfilesPageType} from "../../../redux/state";

type PropsType = {
    profile: ProfilesPageType
    addPost: (postMessage: string) => void
    changeTextAreaHandler: (newText: string) => void
}

export const Profile = (props:PropsType) => {
    return (
        <div className={s.contentBox}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <img className={s.img} src={Background} alt=""/>
                    <ProfileInfo photo={Photo}
                                 name={'Son Chaeyoung'}
                                 birthday={'11.12.1998'}
                                 city={'Moscow'}
                                 education={'MIREA'}
                                 website={'https://www.borislav-web.ru/'}
                    />

                    <Posts posts={props.profile.posts} message={props.profile.messageForNewPost} addPost={props.addPost} changeTextAreaHandler={props.changeTextAreaHandler}/>
                </div>
            </div>
        </div>
    )
}