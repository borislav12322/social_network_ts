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
    photos: {small: any, large: any}
}

export type InitialStateType = {
    users: Array<UsersType>
}

let initialState = {
    users: [
        // {
        //     id: 1,
        //     FirstName: 'Rose',
        //     isFollowed: true,
        //     status: "BP!",
        //     location: {country: 'Republic Korea', city: 'Seoul'}
        // },
        // {
        //     id: 2,
        //     FirstName: 'Jennie',
        //     isFollowed: false,
        //     status: "BP!",
        //     location: {country: 'Republic Korea', city: 'Pusan'}
        // },
        // {
        //     id: 3,
        //     FirstName: 'Jisoo',
        //     isFollowed: true,
        //     status: "BP!",
        //     location: {country: 'Republic Korea', city: 'Seoul'}
        // },
    ]
}

export type ActionUsersType = FollowACType | UnFollowACType | SetUsersACType;

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
            return {...state, users: [...action.users, ...state.users]}

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