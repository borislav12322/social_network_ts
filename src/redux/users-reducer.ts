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

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export type ActionUsersType =
    FollowACType |
    UnFollowACType |
    SetUsersACType |
    ChangePageNumberACType |
    SetTotalUsersCountACType |
    ToggleIsFetchingACType;

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

type SetUsersACType = ReturnType<typeof setUsersAC>

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

type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>

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
