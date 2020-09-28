import React from 'react';
import ProfileDataForm from "./ProfileDataForm";
import {StateProfileType} from "../../../types/redux-types";

type Props  = {
    isOwner:boolean
    editDeactivate:(bool:boolean)=>void
    saveProfile:(services: () => any, profileData: any, profile: StateProfileType)=>any
    initialValues:any
    onSubmit: ()=>any
}
const ProfileDataFormWrapper :React.FC<Props> =(props) => {
    return(
        < ProfileDataForm  {...props}/>
    )
};

export default ProfileDataFormWrapper;