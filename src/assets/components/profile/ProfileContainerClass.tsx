import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfileData} from "../../../redux/profile-reducer";
import {Profile} from "./Profile";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../redux/store";

type PropsType = {}


export const ProfileContainer = (props: PropsType) => {

    let {id} = useParams();
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    useEffect(() => {
        dispatch(getProfileData(id))
    }, [id]);

    const photoLarge = useSelector<AppRootStateType, string | null>
    (state => state.profileReducer.profileData.photos.large)

    if (!isAuth) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Profile
                goBack={goBack}
                photoLarge={photoLarge}
            />
        </div>
    )
}