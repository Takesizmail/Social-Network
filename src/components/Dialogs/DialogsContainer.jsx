import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc";
import {compose} from "redux";
import {reset} from "redux-form";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (messageSend) => {
            dispatch(sendMessageCreator(messageSend));
        },
        resetMessageForm: (nameForm) => {
            dispatch(reset(nameForm))
        }
    }
};
 export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,

)(Dialogs);
