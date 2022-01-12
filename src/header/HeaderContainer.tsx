import React, {useEffect} from "react";
import {Header} from "./Header";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {authMeThunkCreator, logoutTC, setUserDataTypeAC} from "../redux/auth-reducer";
import {AppRootStateType} from "../redux/store";
import {usersAPI} from "../API/API";

export const HeaderContainer = () => {

    const dispatch = useDispatch();


    const login = useSelector<AppRootStateType, string | null>(state => state.authReducer.login);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth);
    const id = useSelector<AppRootStateType, number|null>(state => state.authReducer.id);

    // useEffect(() => {
    //     dispatch(authMeThunkCreator(true));
    // }, [dispatch])

    return (
        <Header
            login={login}
            isAuth={isAuth}
            id={id}
        />
    )
}