import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import photo from '../../../assets/images/user.png'
import withKamasutraApi from "../../hoc/with-kamasutra-api";
import ProfileDataForm from "./ProfileDataForm";
import Contacts from "./ContactsCreator";
import {compose} from "redux";
import {PropsProfileType} from "../Profile";
import {StateProfileType} from "../../../types/redux-types";
import ProfileDataFormWrapper from "./profileDataFormWrapper";



type PropsType = OwnPropsType & PropsProfileType

type OwnPropsType = {
    services: ()=>any,
}

const ProfileInfo: React.FC<PropsType> = ({services,profile,status,updateStatusThunk,isOwner,savePhoto,saveProfile}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    console.log(isOwner)
    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelector = (e:React.ChangeEvent<HTMLInputElement>)=>{
        // @ts-ignore
        if(e.target.files.length){
            // @ts-ignore
            console.log(e.target.files[0])
            // @ts-ignore
            savePhoto(services, e.target.files[0]);

        }

    }
    const changeEdit = (mode:boolean) =>{
        setEditMode(mode)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos?.large || photo} className={s.avatar} alt='avatar'/>
                {isOwner && <div><input type="file" onChange={onMainPhotoSelector}/>  choose image for change the avatar</div>  }

                <ProfileStatusWithHooks status={status}
                                        updateStatusThunk={updateStatusThunk}
                />
                { isOwner && editMode ? <ProfileDataFormWrapper
                                                         isOwner={isOwner}
                                                         editDeactivate={changeEdit}
                                                         saveProfile={saveProfile}
                                                         initialValues={profile}
                                                         onSubmit={()=>console.log("submit")}
                    /> :
                    <ProfileData profile={profile}
                                 isOwner={isOwner}
                                 editActivate={changeEdit} /> }
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: StateProfileType,
    isOwner: boolean,
    editActivate: (bool: boolean)=>void

}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile,isOwner,editActivate})=>{
    return <div>
        <div>
            <b> Looking for a job :</b>  {profile.lookingForAJob ? 'Yes' : 'no'}
        </div>

        <div>
            <b> Full name :</b> {profile.fullName}
        </div>
        <div>
            <b> About Me :</b> {profile.aboutMe}
        </div>

        {profile.lookingForAJob &&
        <div>
            <b> My professional skills</b> : {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b> Contacts : </b> {Object.keys(profile.contacts).map((key)=>{
            // @ts-ignore
            return <Contacts key={key} contactTitle={key}  contactValue={profile.contacts[key]}/>
        })}
        </div>
        <div> {isOwner &&<button onClick={()=>editActivate(true)}>open edit mode</button>}</div>
    </div>
}
export default compose(
    withKamasutraApi()
)(ProfileInfo);