import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {getProfileData, getProfileStatusTC} from "../../../redux/profile-reducer";
import {Profile} from "./Profile";
import {useNavigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../redux/store";
import {AuthRedirect} from "../../../HOC/AuthRedirect";
import {CircularProgress} from "@mui/material";

type PropsType = {}

export const ProfileContainer = AuthRedirect((props: PropsType) => {
    console.log('Profilecontainer')
    const dispatch = useDispatch();

    const myId = useSelector<AppRootStateType, number | null>(state => state.authReducer.id);
    let requestStatus = useSelector<AppRootStateType, boolean>(state => state.profileReducer.requestStatus);

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

        dispatch(getProfileStatusTC(id));

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
                requestStatus={requestStatus}

            />
        </div>
    )
});