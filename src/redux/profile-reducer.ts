export type PostsType = {
    id: number
    message: string
    likesCount: number
};

export type PhotosType = {
    small: string
    large: string
}

export type ProfileDataType = {
    photos: PhotosType
}

export type ProfilesPageType = {
    messageForNewPost: string
    posts: Array<PostsType>
    profileData: ProfileDataType
};

export type ActionProfileType = UpdatePostACType | AddPostACType | SetUserProfileAC

const initialState: ProfilesPageType = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: 'Lorem!', likesCount: 2},
        {id: 2, message: 'Lorem!', likesCount: 2},
        {id: 3, message: 'Welcome here!', likesCount: 1},
        {id: 4, message: 'Lorem!', likesCount: 5},
    ],
    profileData: {photos: {small: '', large: ''}},
}

export const profileReducer = (state: ProfilesPageType = initialState, action: ActionProfileType): ProfilesPageType => {
    switch (action.type) {
        case 'UPDATE-POST':
            return {...state, messageForNewPost: action.newMessageText};

        case 'ADD-POST':
            return {...state, posts: [{id: 1, message: state.messageForNewPost, likesCount: 0}, ...state.posts]};
        case "SET-USER-PROFILE":
            return {...state, profileData: action.profileData}
        default:
            return state
    }
}

type UpdatePostACType = ReturnType<typeof updatePostAC>;

export const updatePostAC = (newMessageText: string) => {
    return {
        type: 'UPDATE-POST',
        newMessageText,
    } as const
};

type AddPostACType = ReturnType<typeof addPostAC>;

export const addPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
};

type SetUserProfileAC = ReturnType<typeof setUserProfileAC>;

export const setUserProfileAC = (profileData: ProfileDataType) => {
    return {
        type: 'SET-USER-PROFILE',
        profileData
    } as const
};