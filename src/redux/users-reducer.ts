import {usersAPI} from "../API/API";
import {Dispatch} from "redux";

type LocationType = {
    country: string,
    city: string
}

export type UsersType = {
    id: number,
    name: string,
    followed: boolean,
    status: string,
    location: LocationType
    photos: { small: string, large: string }
}

export type followingInProgressType = {
    id: number
}

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    pagesCount: number
}

let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    pagesCount: 0,
}

export type ActionUsersType =
    FollowACType |
    UnFollowACType |
    SetUsersACType |
    ChangePageNumberACType |
    SetTotalUsersCountACType |
    ToggleIsFetchingACType |
    IsFollowingLoadingACType |
    GetPagesCountACType |
    ChangePageSizeACType;

export const usersReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: [...state.users.map(t => t.id === action.userID ? {...t, followed: action.followed} : t)]
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: [...state.users.map(t => t.id === action.userID ? {...t, followed: action.followed} : t)]
            };
        case 'SET-USERS':
            return {...state, users: [...action.users]}
        case 'CHANGE-PAGE':
            return {...state, currentPage: action.pageNumber}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.value}
        case 'IS-FOLLOWING':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        case 'GET-PAGES-COUNT':
            return {
                ...state, pagesCount: action.pagesCount
            }
        case 'CHANGE-PAGE-SIZE':
            return {...state, pageSize: action.pageSize}

        default:
            return state
    }
}

type FollowACType = ReturnType<typeof followAC>

export const followAC = (followed: boolean, userID: number) => {
    return {
        type: 'FOLLOW',
        followed,
        userID,
    } as const
}

type UnFollowACType = ReturnType<typeof unFollowAC>

export const unFollowAC = (followed: boolean, userID: number) => {
    return {
        type: 'UNFOLLOW',
        followed,
        userID,
    } as const
}

export type SetUsersACType = ReturnType<typeof setUsersAC>

export const setUsersAC = (users: Array<UsersType>) => {
    return {
        type: 'SET-USERS',
        users,
    } as const
}

type ChangePageNumberACType = ReturnType<typeof changePageNumberAC>

export const changePageNumberAC = (pageNumber: number) => {
    return {
        type: 'CHANGE-PAGE',
        pageNumber,
    } as const
}

export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>

export const setTotalUsersCountAC = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount,
    } as const
}

type ToggleIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>

export const toggleIsFetchingAC = (value: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        value,
    } as const
}

type IsFollowingLoadingACType = ReturnType<typeof isFollowingLoadingAC>

export const isFollowingLoadingAC = (isFetching: boolean, userID: number) => {
    return {
        type: 'IS-FOLLOWING',
        isFetching,
        userID,
    } as const
}

type ChangePageSizeACType = ReturnType<typeof changePageSizeAC>

export const changePageSizeAC = (pageSize: number) => {
    return {
        type: 'CHANGE-PAGE-SIZE',
        pageSize,
    } as const
}

export type GetPagesCountACType = ReturnType<typeof getPagesCountAC>;

export const getPagesCountAC = (pagesCount: number) => {
    return {
        type: 'GET-PAGES-COUNT',
        pagesCount,
    } as const
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): any => {
    return (dispatch: Dispatch<ActionUsersType>) => {
        dispatch(toggleIsFetchingAC(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        });
    }
};

export const changePageThunkCreator = (pageNumber: number, pageSize: number): any => {
    return (dispatch: Dispatch<ActionUsersType>) => {
        dispatch(changePageNumberAC(pageNumber))
        dispatch(toggleIsFetchingAC(true))
        usersAPI.getUsers(pageNumber, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items));
        });
    }
}

export const followThunkCreator = (followed: boolean, userID: number): any => {
    return (dispatch: Dispatch<ActionUsersType>) => {
        dispatch(isFollowingLoadingAC(true, userID))
        usersAPI.follow(userID).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followAC(followed, userID));
            }
            dispatch(isFollowingLoadingAC(false, userID))
            console.log(response.data);
        });
    }
}

export const unfollowThunkCreator = (followed: boolean, userID: number): any => {
    return (dispatch: Dispatch<ActionUsersType>) => {
        dispatch(isFollowingLoadingAC(true, userID))
        usersAPI.unfollow(userID).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unFollowAC(followed, userID))
            }
            dispatch(isFollowingLoadingAC(false, userID));
            console.log(response.data);
        });
    }
}