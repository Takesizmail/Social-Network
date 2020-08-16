
import s from './ProfileInfo.module.css'
import React, {useEffect, useState} from 'react';
import {compose} from 'redux'
import {getStatusThunk} from "../../../redux/profile-reducer";
import {withKamasutraApi} from "../../hoc";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const ProfileStatusWithHooks = ({userID,...props}) =>  {

    let [editMode, setEditMode] = useState(false)
    let [status,setStatus] = useState(props.status)
    let [userId, setUserId] = useState(props.match.params.userId || userID)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () =>{
        setEditMode(true)
    }

    const deActivateEditMode = () =>{

        setEditMode(false)
        console.log(userId,userID)
        props.updateStatusThunk(props.services,status,userId);

    }
    const onStatusChange = (e) =>{
        setStatus(e.currentTarget.value)
    }

    return (

        <div className={s.status}>
            { editMode &&
            <div>
                <input
                    onBlur={()=> deActivateEditMode()}
                    value={status}
                    onChange={(e)=> onStatusChange(e)}
                    autoFocus={true}
                />
            </div>
            }
            {  !editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={()=> activateEditMode()}>
                    {props.status}
                </span>
            </div>
            }
        </div>
    );

}
const mapStateToProps = ({auth}) =>({
    userID: auth.userId
}
)
export default compose(
    withRouter,
    withKamasutraApi(),
    connect(mapStateToProps,{getStatusThunk})
)(ProfileStatusWithHooks)
