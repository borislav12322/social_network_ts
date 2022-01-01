import React, {ComponentType} from "react";
import {connect, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {Navigate} from "react-router-dom";

export function AuthRedirect<T>(Component: ComponentType<T>) {

    function RedirectComponent (props: T)  {

        const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth);
        if (!isAuth) {
            return <Navigate to='/login'/>
        }

        return <Component {...props as T} />
    }

    return RedirectComponent
}