import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunk,
    getStatusThunk,
    savePhoto, saveProfile,
    setUserProfile,
    updateStatusThunk
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withKamasutraApi,withAuthRedirect} from "../hoc";
import {compose} from "redux";
import { getProfile, getStatus, getUserId} from "../../redux/users-selectors";


class ProfileContainer extends React.Component {

    refreshProfile (){
        const {userID, match, getProfileThunk,services,getStatusThunk} = this.props;
        let userId = match.params.userId ? match.params.userId : userID ;
        // if (!userId) {
        //     userId = 6379;
        // }
        console.log(userId)
        getProfileThunk(services,userId);
        getStatusThunk(services,userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props && prevProps.match.params.userId !== this.props.match.params.userId){
            this.refreshProfile();
        }
    }
    saveDataProfile = (profileData) =>{
        this.props.saveProfile(this.props.services,profileData,this.props.profile)
    }

    render() {
        return (
            <Profile
                isOwner = {!this.props.match.params.userId}
                     profile={this.props.profile}
                    status={this.props.status}
                     updateStatusThunk={this.props.updateStatusThunk}
                savePhoto={this.props.savePhoto}
                saveProfile={this.saveDataProfile}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    userID : getUserId(state)
});

export default compose(
    withRouter,
    withAuthRedirect,
    withKamasutraApi(),
    connect(mapStateToProps, {setUserProfile,getProfileThunk, getStatusThunk,updateStatusThunk,savePhoto,saveProfile}),
)(ProfileContainer);

// let WithUrlDataContainerComponent = withRouter(ProfileContainer);
//
// export default connect(mapStateToProps, {setUserProfile,getProfileThunk})
//                 (withKamasutraApi()(withAuthRedirect(WithUrlDataContainerComponent)));