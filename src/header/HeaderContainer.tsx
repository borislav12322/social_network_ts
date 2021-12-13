import React, {useEffect} from "react";
import {Header} from "./Header";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {authMeThunkCreator, setUserDataTypeAC} from "../redux/auth-reducer";
import {AppRootStateType} from "../redux/store";
import {usersAPI} from "../API/API";

export const HeaderContainer = () => {

    const dispatch = useDispatch();

    const login = useSelector<AppRootStateType, string | null>(state => state.authReducer.login);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth);


    useEffect(() => {
        dispatch(authMeThunkCreator())
    }, [dispatch])
    return (
        <Header
            login={login}
            isAuth={isAuth}
        />
    )
}