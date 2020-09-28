import React from 'react';
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs, {DialogsPageType} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc";
import {compose, Dispatch} from "redux";
import {reset} from "redux-form";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchToPropsType = {
    sendMessage:(messageSend: string) =>any,
    resetMessageForm:(nameForm:any) => any

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;


const DialogsContainer: React.FC<PropsType> = (props) =>{
    return (
        <Dialogs {...props}/>
    )
}

const mapStateToProps = (state:AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (messageSend: string) => {
            dispatch(sendMessageCreator(messageSend));
        },
        resetMessageForm: (nameForm:any) => {
            dispatch(reset(nameForm))
        }
    }
};

// export default DialogsContainer

 export default compose(
    connect<MapStateToPropsType,MapDispatchToPropsType,null,AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
        // @ts-ignore
 )(DialogsContainer);