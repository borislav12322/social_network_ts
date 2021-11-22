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

export type ActionMessageType = UpdateNewMessageACType | SendNewMessageACType

export const messagesReducer = (state: MessagesPageType, action: ActionMessageType): MessagesPageType => {
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