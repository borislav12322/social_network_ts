export type DialogItemType = {
    name: string
    id: number
};

export type MessageContentDataType = {
    id: number
    text: string
};

export type MessagesPageType = {
    messagesData: Array<DialogItemType>
    messageContentData: Array<MessageContentDataType>
    newMessageText: string
};

export type ActionMessageType = UpdateNewMessageACType | SendNewMessageACType;

let initialState: MessagesPageType  = {

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
}

export const messagesReducer = (state: MessagesPageType = initialState, action: ActionMessageType): MessagesPageType => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE':
            return {...state, newMessageText: action.newMessageText}

        case 'SEND-NEW-MESSAGE':
            return {...state, messageContentData: [{id: 4, text: state.newMessageText}, ...state.messageContentData]}

        default:
            return state
    }
}

type UpdateNewMessageACType = ReturnType<typeof updateNewMessageAC>;

export const updateNewMessageAC = (newMessageText: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE',
        newMessageText
    } as const
};

type SendNewMessageACType = ReturnType<typeof sendNewMessageAC>;

export const sendNewMessageAC = () => {
    return {
        type: 'SEND-NEW-MESSAGE',
    } as const
};