import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {getProfileData} from "../../../redux/profile-reducer";
import {Profile} from "./Profile";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../redux/store";
import {AuthRedirect} from "../../../HOC/AuthRedirect";
import {compose} from "redux";

type PropsType = {}


export const ProfileContainer = AuthRedirect((props: PropsType) => {
    const dispatch = useDispatch();

    const myId = useSelector<AppRootStateType, number | null>(state => state.authReducer.id);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth);

    let {id} = useParams();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    useEffect(() => {
        if (id) {
            dispatch(getProfileData(id))
        } else {
            if (myId) {
                dispatch(getProfileData(myId.toString()))
            }
            dispatch(getProfileData('2'))
        }

    }, [id, myId]);

    const photoLarge = useSelector<AppRootStateType, string | null>(
        state => state.profileReducer.profileData.photos.large);

    const fullName = useSelector<AppRootStateType, string>(
        state => state.profileReducer.profileData.fullName);


    return (
        <div>
            <Profile
                goBack={goBack}
                photoLarge={photoLarge}
                fullName={fullName}
            />
        </div>
    )


});