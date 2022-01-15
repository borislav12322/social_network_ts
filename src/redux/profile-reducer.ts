import {Dispatch} from "redux";
import {usersAPI} from "../API/API";

export type PostsType = {
    id: number
    message: string
    likesCount: number
};

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileDataType = {
    photos: PhotosType
    fullName: string

}

export type ProfilesPageType = {
    messageForNewPost: string
    posts: Array<PostsType>
    profileData: ProfileDataType
    status: string | null
    requestStatus: boolean,
    editModeStatus: boolean,
};

export type ActionProfileType =
    UpdatePostACType
    | AddPostACType
    | SetUserProfileAC
    | GetProfileStatusACType
    | ChangeRequestStatusACType
    | ChangeEditModeStatusACType

const initialState: ProfilesPageType = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: 'Lorem!', likesCount: 2},
        {id: 2, message: 'Lorem!', likesCount: 2},
        {id: 3, message: 'Welcome here!', likesCount: 1},
        {id: 4, message: 'Lorem!', likesCount: 5},
    ],
    profileData: {
        photos: {small: '', large: ''},
        fullName: '',
    },
    status: '',
    requestStatus: false,
    editModeStatus: false
}

export const profileReducer = (state: ProfilesPageType = initialState, action: ActionProfileType): ProfilesPageType => {
    switch (action.type) {
        case 'UPDATE-POST':
            return {...state, messageForNewPost: action.newMessageText};
        case 'ADD-POST':
            return {...state, posts: [{id: 1, message: state.messageForNewPost, likesCount: 0}, ...state.posts]};
        case "SET-USER-PROFILE":
            return {...state, profileData: action.profileData}
        case 'GET-PROFILE-STATUS':
            return {...state, status: action.statusText}
        case 'CHANGE-REQUEST-STATUS':
            return {...state, requestStatus: action.status}
        case 'CHANGE-EDIT-MODE':
            return {...state, editModeStatus: action.editModeStatus}

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

type GetProfileStatusACType = ReturnType<typeof getProfileStatusAC>;

export const getProfileStatusAC = (statusText: string | null) => {
    return {
        type: 'GET-PROFILE-STATUS',
        statusText,
    } as const
};


export type ChangeRequestStatusACType = ReturnType<typeof changeRequestStatusAC>;

export const changeRequestStatusAC = (status: boolean) => {
    return {
        type: 'CHANGE-REQUEST-STATUS',
        status
    } as const
}

export type ChangeEditModeStatusACType = ReturnType<typeof changeEditModeStatusAC>;

export const changeEditModeStatusAC = (editModeStatus: boolean) => {
    return {
        type: 'CHANGE-EDIT-MODE',
        editModeStatus,
    } as const
}

// type GetCurrentIDACType = ReturnType<typeof getCurrentIDAC>;
//
// export const getCurrentIDAC = (id: string) => {
//     return {
//         type: 'GET-CURRENT-ID',
//         id,
//     } as const
// }

export const getProfileData = (id: string) => {
    return (dispatch: Dispatch<ActionProfileType>) => {
        usersAPI.getProfileData(id).then(response => {
            dispatch(setUserProfileAC(response.data))
        });
    }
}

export const getProfileStatusTC = (id: string | undefined) => (dispatch: Dispatch) => {
    usersAPI.getStatus(id)
        .then(res => {
            dispatch(getProfileStatusAC(res.data))
        });
}

export const updateProfileStatusTC = (status: string | null) => (dispatch: Dispatch) => {
    dispatch(changeRequestStatusAC(true));
    usersAPI.updateStatus(status).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(getProfileStatusAC(status));
            dispatch(changeEditModeStatusAC(false))
            console.log('Status changed');
        } else {
            console.log('Wrong!!!');
        }
    }).finally(() => {
        dispatch(changeRequestStatusAC(false))
    })
}

