type LocationType = {
    country: string,
    city: string
}

export type UsersType = {
    id: number,
    FirstName: string,
    isFollowed: boolean,
    status: string,
    location: LocationType
}

type InitialStateType = {
    users: Array<UsersType>
}

let initialState = {
    users: [
        {
            id: 1,
            FirstName: 'Rose',
            isFollowed: true,
            status: "BP!",
            location: {country: 'Republic Korea', city: 'Seoul'}
        },
        {
            id: 2,
            FirstName: 'Jennie',
            isFollowed: false,
            status: "BP!",
            location: {country: 'Republic Korea', city: 'Pusan'}
        },
        {
            id: 3,
            FirstName: 'Jisoo',
            isFollowed: true,
            status: "BP!",
            location: {country: 'Republic Korea', city: 'Seoul'}
        },
    ]

}

type ActionType = FollowACType | UnFollowACType | SetUsersACType;

export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: [...state.users.map(t => t.id === action.userID ? {...t, isFollowed: action.isFollowed} : t)]
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: [...state.users.map(t => t.id === action.userID ? {...t, isFollowed: action.isFollowed} : t)]
            };
        case 'SET-USERS':
            return {...state, users: [...action.users, ...state.users]}

        default:
            return state
    }
}

type FollowACType = ReturnType<typeof followAC>

export const followAC = (isFollowed: boolean, userID: number) => {
    return {
        type: 'FOLLOW',
        isFollowed,
        userID,
    } as const
}

type UnFollowACType = ReturnType<typeof unFollowAC>

export const unFollowAC = (isFollowed: boolean, userID: number) => {
    return {
        type: 'UNFOLLOW',
        isFollowed,
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