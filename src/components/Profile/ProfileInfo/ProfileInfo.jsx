import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import photo from '../../../assets/images/user.png'
import withKamasutraApi from "../../hoc/with-kamasutra-api";
import ProfileDataForm from "./ProfileDataForm";
import Contacts from "./ContactsCreator";
import {compose} from "redux";

const ProfileInfo = ({services,profile,status,updateStatusThunk,isOwner,savePhoto,saveProfile}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelector = (e)=>{
        if(e.target.files.length){
            console.log(e.target.files[0])
            savePhoto(services,e.target.files[0])
        }

    }
    const changeEdit = (mode) =>{
        setEditMode(mode)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || photo} className={s.avatar} alt='avatar'/>
                {isOwner && <div><input type="file" onChange={onMainPhotoSelector}/>  choose image for change the avatar</div>  }

                <ProfileStatusWithHooks status={status}
                                        updateStatusThunk={updateStatusThunk}
                />
                { isOwner && editMode ? <ProfileDataForm
                                                         isOwner={isOwner}
                                                         editDeactivate={changeEdit}
                                                         saveProfile={saveProfile}
                                                         initialValues={profile}
                    /> :
                    <ProfileData profile={profile}
                                 isOwner={isOwner}
                                 editActivate={changeEdit} /> }
            </div>
        </div>
    )
}

const ProfileData = ({profile,isOwner,editActivate})=>{
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
            <b> Contacts : </b> {Object.keys(profile.contacts).map(key=>{
            return <Contacts key={key} contactTitle={key}  contactValue={profile.contacts[key]}/>
        })}
        </div>
        <div> {isOwner &&<button onClick={()=>editActivate(true)}>open edit mode</button>}</div>
    </div>
}
export default compose(
    withKamasutraApi()
)(ProfileInfo);