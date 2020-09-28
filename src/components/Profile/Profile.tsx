import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {StateProfileType} from "../../types/redux-types";

export type PropsProfileType = {
    profile: StateProfileType,
    isOwner: boolean,
    status: string,
    updateStatusThunk:()=>any,
    savePhoto: (services:()=>any, file: any)=>any,
    saveProfile:(services:()=>any,profileData: any, profile: StateProfileType)=>void,
}

const Profile:React.FC<PropsProfileType> = ({profile,isOwner,status, updateStatusThunk,savePhoto,saveProfile}) => {
    console.log(isOwner)
    return (
        <div>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         updateStatusThunk={updateStatusThunk}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;