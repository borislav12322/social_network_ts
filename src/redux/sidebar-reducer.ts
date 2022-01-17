import {Dispatch} from "redux";
import {SetTotalUsersCountACType, SetUsersACType, UsersType} from "./users-reducer";
import {usersAPI} from "../API/API";

export type FriendsSectionType = {
    id: number
    name: string
    photo: string
};
export type SidebarSectionType = {
    friends: Array<UsersType>
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isLoading: boolean
};

let initialState: SidebarSectionType = {
    friends: [],
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 20,
    isLoading: false
};

export type SidebarActionTypes =
    SetUsersACType
    | SetTotalUsersCountACType
    | SetFriendsBarACType
    | SetTotalFriendsCountACType
    | ChangeIsLoadingACType

export const sidebarReducer = (state: SidebarSectionType = initialState, action: SidebarActionTypes): SidebarSectionType => {
    switch (action.type) {
        case 'SET-FRIENDS-BAR':
            return {...state, friends: action.friends}
        case "SET-TOTAL-FRIENDS-BAR-COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case 'CHANGE-IS-LOADING-FRIENDS':
            return {...state, isLoading: action.isLoading}

        default:
            return state
    }
}

export type SetFriendsBarACType = ReturnType<typeof setFriendsBarAC>

export const setFriendsBarAC = (friends: Array<UsersType>) => {
    return {
        type: 'SET-FRIENDS-BAR',
        friends,
    } as const
}

export type SetTotalFriendsCountACType = ReturnType<typeof setTotalFriendsCountAC>

export const setTotalFriendsCountAC = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-FRIENDS-BAR-COUNT',
        totalCount,
    } as const
}

export type ChangeIsLoadingACType = ReturnType<typeof changeIsLoadingAC>

export const changeIsLoadingAC = (isLoading: boolean) => {
    return {
        type: 'CHANGE-IS-LOADING-FRIENDS',
        isLoading,
    } as const
}

export const friendsSidebarTC = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(changeIsLoadingAC(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(res => {
            dispatch(setFriendsBarAC(res.items))
            dispatch(setTotalFriendsCountAC(res.totalCount))
            dispatch(changeIsLoadingAC(false))
        })
}

