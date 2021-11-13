import {RenderTree} from "../render";

export type PostsType = {
    id: number
    message: string
    likesCount: number
};

export type DialogItemType = {
    name: string
    id: number
}

export type messageContentDataType = {
    id: number
    name: string
}

export type FriendsSectionType = {
    id: number
    name: string
    photo: string
}

export type ProfilesPageType = {
    messageForNewPost: string
    posts: Array<PostsType>
}

export type MessagesPageType = {
    messagesData: Array<DialogItemType>
    messageContentData: Array<messageContentDataType>

}

export type SidebarSectionType = {
    friends: Array<FriendsSectionType>
}

export type stateType = {
    profile: ProfilesPageType
    messages: MessagesPageType
    sidebar: SidebarSectionType
}

export const state: stateType = {

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
            {id: 1, name: "Hi!"},
            {id: 2, name: "Twice!"},
            {id: 3, name: "Cool!"},
            {id: 4, name: "Somi!!!!!"},
        ],
    },

    sidebar: {
        friends: [
            {id: 1, name: "Rima", photo: ''},
            {id: 2, name: "Maya", photo: ''},
            {id: 3, name: "Nina", photo: ''},
        ]
    }
};

export const addPost = (postMessage: string) => {
    const newPost: PostsType = {
        id: 5,
        message: postMessage.trim(),
        likesCount: 0,
    };

    if (postMessage !== '') {
        state.profile.posts.push(newPost);
        RenderTree(state);
    }
    console.log(state.profile.posts);
    console.log(state.profile.messageForNewPost)

};

export const onChangeHandler = (newText: string) => {
    state.profile.messageForNewPost = newText;
    RenderTree(state);
}
