import {Dispatch} from "redux";
import {authAPI, LoginDataType, usersAPI} from "../API/API";
import {changeRequestStatusAC, ChangeRequestStatusACType} from "./profile-reducer";

type InitialStateType = {
    id: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    img: null | string,
    isLoggedIn: boolean
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    img: null,
    isLoggedIn: false
}

type ActionType = SetUserDataType
    | ChangeRequestStatusACType
    | ChangeIsLoggedInType
    | IsAuthChangeType;

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data,

            }
        case 'CHANGE-IS-LOGGED':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        case 'CHANGE-IS-AUTH':
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}

export type SetUserDataType = ReturnType<typeof setUserDataTypeAC>

export const setUserDataTypeAC = (data: InitialStateType) => {
    return {
        type: 'SET-USER-DATA',
        data,
    } as const
}

export type IsAuthChangeType = ReturnType<typeof isAuthChangeAC>

export const isAuthChangeAC = (isAuth: boolean) => {
    return {
        type: 'CHANGE-IS-AUTH',
        isAuth,

    } as const
}

export type ChangeIsLoggedInType = ReturnType<typeof changeIsLoggedInAC>

export const changeIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'CHANGE-IS-LOGGED',
        isLoggedIn,
    } as const
}

export const authMeThunkCreator = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(changeRequestStatusAC(true));
        authAPI.authMe().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeIsLoggedInAC(true));
                dispatch(setUserDataTypeAC(response.data.data));
                dispatch(changeRequestStatusAC(false));
            } else {

            }
        })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(isAuthChangeAC(true));
            })
    }
}

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    // debugger
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                console.log('Success');
                console.log(res);
                dispatch(changeIsLoggedInAC(true));
                dispatch(setUserDataTypeAC(res.data.data));
                //@ts-ignore
                dispatch(authMeThunkCreator());
            } else {
                console.log('Error')
                console.log(res)
            }
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeIsLoggedInAC(false));
            }
        })
}