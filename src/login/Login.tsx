import React, {useEffect, useState} from "react"
import s from './login.module.scss'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../redux/auth-reducer";
import {LoginDataType} from "../API/API";
import {AppRootStateType} from "../redux/store";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import ShowPasswordIcon from '../assets/images/visibility.png';
import {ProfileContainer} from "../assets/components/profile/ProfileContainerClass";
import {AuthRedirect} from "../HOC/AuthRedirect";
import {Outlet} from "@mui/icons-material";
import {CircularProgress} from "@mui/material";

type PropsType = {}

export const Login = (props: PropsType) => {
    const dispatch = useDispatch();
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn);

    const [passwordType, setPasswordType] = useState<boolean>(true);

    const passwordInputTypeChange = () => {
        setPasswordType(!passwordType);
    }


    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data: LoginDataType) => {
        // alert(JSON.stringify(data));
        console.log(data)
        dispatch(loginTC(data))
        reset();
    }

    const myId = useSelector<AppRootStateType, number | null>(state => state.authReducer.id);

    if (myId && isLogged) {
        return <Navigate to={`/profile/${myId}`}/>
    }


    return (
        <div className={s.formContainer}>
            <h2 className={s.formTitle}>Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>

                <label className={s.inputField}>
                    Email:
                    <input defaultValue={'borislavizmestiev@gmail.com'} type={'email'} {...register('email',
                        {
                            required: true,
                            minLength: {
                                value: 3,
                                message: 'Min length is 3'
                            },
                        })}/>
                </label>
                {errors?.email && <p>{errors?.email?.message || 'Email required'}</p>}

                <label className={`${s.inputField} ${s.passwordField}`}>
                    Password:
                    <input defaultValue={'xerox123'}
                           type={passwordType ? 'password' : "text"} {...register('password', {
                        required: true,
                        minLength: {
                            value: 5,
                            message: 'Min length is 5'
                        },
                    })}/>
                    <button type={'button'} className={s.changeTypeButton} onClick={(e) => passwordInputTypeChange()}/>
                </label>

                {errors?.password && <p> {errors?.password?.message || 'Password required'}</p>}
                <input disabled={!isValid} type={'submit'}/>
            </form>
        </div>
    )
}