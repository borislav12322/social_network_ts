import React from "react";
import s from './Profile.module.scss';
import Background from '../../images/monterey_bg.jpeg';
import {ProfileInfo} from "../profileInfo/ProfileInfo";
import {PostsContainer} from "./PostsContainer";
import {PhotosType, ProfileDataType, ProfilesPageType} from "../../../redux/profile-reducer";
import {Preloader} from "../preloader/Preloader";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";

type PropsType = {
    profileData: ProfileDataType
};

export const Profile = (props: PropsType) => {



    const photos = useSelector<AppRootStateType, string>
    (state => state.profileReducer.profileData.photos.large)

    if(!photos){
        return <Preloader/>
    }


    return (
        <div className={s.contentBox}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <img className={s.img} src={Background} alt=""/>

                    <ProfileInfo
                        photo={photos}
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