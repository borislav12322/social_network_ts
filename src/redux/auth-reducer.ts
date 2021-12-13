import {Dispatch} from "redux";
import {usersAPI} from "../API/API";

type InitialStateType = {
    id: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    img: null | string,
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    img: null,
    // isFetching: false
}

type ActionType = SetUserDataType;

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true,
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

export const authMeThunkCreator = () => {
  return(dispatch: Dispatch<ActionType>) =>{
      usersAPI.authMe().then(response => {
          if (response.data.resultCode === 0) {
              dispatch(setUserDataTypeAC(response.data.data))
          }
      });
  }
}

