import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunk,
    getStatusThunk,
    savePhoto, saveProfile,
    updateStatusThunk
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withKamasutraApi,withAuthRedirect} from "../hoc";
import {compose} from "redux";
import { getProfile, getStatus, getUserId} from "../../redux/users-selectorst";
import {StateProfileType} from "../../types/redux-types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    userID:number,
    profile:StateProfileType,
    status: string
}

type MapDispatchToPropsType = {

    getProfileThunk:(services:()=>any, userId: number)=>void,
    getStatusThunk:(services:()=>any, userId: number)=>void
    updateStatusThunk:()=>any,
    savePhoto:()=>any,
    saveProfile:(services:()=>any,profileData: any, profile: StateProfileType)=>void,
}
type OwnProperty = {
    services: ()=>any,
    match: any,
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProperty ;

type StateType = {

}


class ProfileContainer extends React.Component<PropsType,StateType> {

    refreshProfile (){
        const {userID, match, getProfileThunk,services,getStatusThunk} = this.props;
        console.log(match, userID)
        let userId = match.params.userId ? match.params.userId : userID ;

        getProfileThunk(services,userId);
        getStatusThunk(services,userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType, prevState : StateType) {
        if(prevProps !== this.props && prevProps.match.params.userId !== this.props.match.params.userId){
            this.refreshProfile();
        }
    }
    saveDataProfile = (profileData: any) =>{
        this.props.saveProfile(this.props.services,profileData,this.props.profile)
    }

    render() {

        const {profile,match,status,updateStatusThunk,savePhoto,userID} = this.props
        let userId = match.params.userId ? match.params.userId : userID ;
        return (
            <Profile
                isOwner = {userID === userId }
                profile={profile}
                status={status}
                updateStatusThunk={updateStatusThunk}
                savePhoto={savePhoto}
                saveProfile={this.saveDataProfile}
            />
        )
    }
}

let mapStateToProps = (state:AppStateType) => ({
    profile: getProfile(state),
    status: getStatus(state),
    userID : getUserId(state)
});

export default compose(
    withRouter,
    withAuthRedirect,
    withKamasutraApi(),
    connect(mapStateToProps, {getProfileThunk, getStatusThunk,updateStatusThunk,savePhoto,saveProfile}),
)(ProfileContainer);
