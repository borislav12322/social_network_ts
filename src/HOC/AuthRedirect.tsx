import React, {ComponentType, useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {Navigate, useParams} from "react-router-dom";
import {authMeThunkCreator} from "../redux/auth-reducer";
import {CircularProgress} from "@mui/material";

export function AuthRedirect<T>(Component: ComponentType<T>) {
    console.log('AuthRedirect')
    function RedirectComponent(props: T) {

        const isLogged = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn);

        if (!isLogged) {
            return <Navigate to='/login'/>
        }




        return <Component {...props as T} />
    }

    return RedirectComponent
}