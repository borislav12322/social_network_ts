export type PostsType = {
    id: number
    message: string
    likesCount: number
};

export type ProfilesPageType = {
    messageForNewPost: string
    posts: Array<PostsType>
};


export type ActionProfileType = UpdatePostACType | AddPostACType

export const profileReducer = (state: ProfilesPageType, action: ActionProfileType): ProfilesPageType => {
    switch (action.type) {
        case 'UPDATE-POST':
            return {...state, messageForNewPost: action.newMessageText};

        case 'ADD-POST':
            return {...state, posts: [{id: 1, message: state.messageForNewPost, likesCount: 0}, ...state.posts]};

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