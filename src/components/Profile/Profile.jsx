import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({profile,isOwner,status, updateStatusThunk,savePhoto,saveProfile}) => {
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