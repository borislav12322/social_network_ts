import React from "react";
import s from './Profile.module.scss';
import Background from '../../images/monterey_bg.jpeg';
import {ProfileInfo} from "../profileInfo/ProfileInfo";
import {PostsContainer} from "./PostsContainer";
import {Preloader} from "../preloader/Preloader";
import {CircularProgress, LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";


type PropsType = {
    photoLarge: string | null
    goBack: () => void
    fullName: string
    requestStatus: boolean
};

export const Profile = (props: PropsType) => {


    return (
        <div className={s.contentBox}>
            {props.requestStatus && <LinearProgress/>}
            <button onClick={props.goBack}>Go back</button>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <img className={s.img} src={Background} alt=""/>

                    <ProfileInfo
                        photo={props.photoLarge}
                        name={props.fullName}
                        birthday={'11.12.1900'}
                        city={'Lorem'}
                        education={'Lorem'}
                        website={'Lorem'}
                    />

                    {/*<Posts/>*/}


                    <PostsContainer/>
                </div>
            </div>
        </div>
    )
}