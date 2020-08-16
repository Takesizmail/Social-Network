import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {withAuthRedirect} from '../hoc'
import {reduxForm,Field} from "redux-form";
import {Textarea} from "../common/formControls/formControls";
import {maxLengthCreator, required} from "../../utils/validators";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id} /> );

    const submitForm = (e) =>{
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
const DialogForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
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