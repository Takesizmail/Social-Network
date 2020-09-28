import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {withAuthRedirect} from '../hoc'
import {reduxForm,Field} from "redux-form";
import {Textarea} from "../common/formControls/formControls";
import {maxLengthCreator, required} from "../../utils/validators";

export type DialogsType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
}

type PropsType = {
    sendMessage:(messageSend: string) =>any,
    resetMessageForm:(nameForm:any) => any,
    dialogsPage: DialogsPageType
}

const Dialogs = (props: PropsType) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( (d) => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( (m) => <Message message={m.message} key={m.id} /> );

    const submitForm = (e:any) =>{
        props.sendMessage(e.message)
        props.resetMessageForm('dialog')
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                {messagesElements}
                <ReduxDialogForm onSubmit={submitForm}/>
            </div>
        </div>
    )
};
 const maxLengthCreator50 = maxLengthCreator(50);


const DialogForm = (props:any) =>{
    return(
        <form onSubmit={props.submitForm}>
            <div>
                <Field  name='message'
                        component={Textarea}
                        validate={[required, maxLengthCreator50]}
                        placeholder='Enter your message'></Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

const ReduxDialogForm = reduxForm({
    form : 'dialog'
})(DialogForm);

export default withAuthRedirect(Dialogs);