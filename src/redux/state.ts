import {ActionProfileType, profileReducer} from "./profile-reducer";
import {ActionMessageType, messagesReducer} from "./messages-reducer";

type ActionType = ActionProfileType | ActionMessageType

export type PostsType = {
    id: number
    message: string
    likesCount: number
};

export type DialogItemType = {
    name: string
    id: number
};

export type messageContentDataType = {
    id: number
    text: string
};

export type FriendsSectionType = {
    id: number
    name: string
    photo: string
};

export type ProfilesPageType = {
    messageForNewPost: string
    posts: Array<PostsType>
};

export type MessagesPageType = {
    messagesData: Array<DialogItemType>
    messageContentData: Array<messageContentDataType>
    newMessageText: string
};

export type SidebarSectionType = {
    friends: Array<FriendsSectionType>
};

export type stateType = {
    profile: ProfilesPageType
    messages: MessagesPageType
    sidebar: SidebarSectionType
};

type StoreType = {
    _state: stateType
    getState: () => stateType
    _RenderTree: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: any) => void
}

export const store: StoreType = {

    _state: {

        profile: {
            messageForNewPost: '',
            posts: [
                {id: 1, message: 'Hey!', likesCount: 2},
                {id: 2, message: 'Twice is cool!', likesCount: 2},
                {id: 3, message: 'Welcome here!', likesCount: 1},
                {id: 4, message: 'Heyooo!', likesCount: 5},
            ],
        },

        messages: {
            messagesData: [
                {id: 1, name: "Somi"},
                {id: 2, name: "Nayeon"},
                {id: 3, name: "Jeongyeon"},
                {id: 4, name: "Momo"},
                {id: 5, name: "Sana"},
                {id: 6, name: "Jihyo"},
                {id: 7, name: "Tzuyu"},
                {id: 8, name: "Mina"},
                {id: 9, name: "Dahyun"},
                {id: 10, name: "Chaeyoung"},
            ],
            messageContentData: [
                {id: 1, text: "Hi!"},
                {id: 2, text: "Twice!"},
                {id: 3, text: "Cool!"},
                {id: 4, text: "Somi!!!!!"},
            ],
            newMessageText: '',
        },

        sidebar: {
            friends: [
                {id: 1, name: "Rima", photo: ''},
                {id: 2, name: "Maya", photo: ''},
                {id: 3, name: "Nina", photo: ''},
            ]
        },
    },

    getState() {
        return this._state;
    },

    _RenderTree() {
    },



    subscribe(observer: () => void) {
        this._RenderTree = observer
    },

    dispatch(action: any) {

        this._state.profile = profileReducer(this._state.profile, action);
        this._state.messages = messagesReducer(this._state.messages, action)
        this._RenderTree();

    },
};

//@ts-ignore
window.store = store