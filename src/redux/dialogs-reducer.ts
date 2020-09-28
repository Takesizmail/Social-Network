const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogsObjectTypes = {
    id: number,
    name : string
}
type MessagesObjectTypes = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogsObjectTypes>,
    messages: [
        {id: 1, message: 'Hi dsfasdf'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessagesObjectTypes> ,
    newMessageBody: "" as string
};

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any) : InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
            const lastId = state.messages[state.messages.length-1].id;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: lastId +1, message: action.body}]
            };
        default:
            return state;
    }
}
type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
type UpdateNewMessageBodyCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY,
    body: string
}

export const sendMessageCreator = (newMessageBody : any): SendMessageCreatorType => ({type: SEND_MESSAGE,newMessageBody})
export const updateNewMessageBodyCreator = (body:string): UpdateNewMessageBodyCreatorType => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})

export default dialogsReducer;