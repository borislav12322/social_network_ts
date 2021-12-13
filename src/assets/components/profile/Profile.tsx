import React from "react";
import s from './Profile.module.scss';
import Background from '../../images/monterey_bg.jpeg';
import {ProfileInfo} from "../profileInfo/ProfileInfo";
import {PostsContainer} from "./PostsContainer";
import {Preloader} from "../preloader/Preloader";


type PropsType = {
    photoLarge: string | null
    goBack: () => void
};

export const Profile = (props: PropsType) => {

    // if(!props.photoLarge || null){
    //     return <Preloader/>
    // }

    return (
        <div className={s.contentBox}>
            <button onClick={props.goBack}>Go back</button>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <img className={s.img} src={Background} alt=""/>

                    <ProfileInfo
                        photo={props.photoLarge}
                        name={'Lorem Ipsum'}
                        birthday={'11.12.1998'}
                        city={'Moscow'}
                        education={'MIREA'}
                        website={'https://www.borislav-web.ru/'}
                    />

                    {/*<Posts/>*/}


                    <PostsContainer/>
                </div>
            </div>
        </div>
    )
}