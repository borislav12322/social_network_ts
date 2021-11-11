import React from "react";
import s from './Profile.module.scss';
import Background from '../../images/monterey_bg.jpeg';
import {ProfileInfo} from "../profileInfo/ProfileInfo";
import Photo from '../../images/profile_photo.png'
import {Posts} from "../posts/Posts";

export const Profile = () => {
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

                    <Posts/>
                </div>
            </div>
        </div>
    )
}