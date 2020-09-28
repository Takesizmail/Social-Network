import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    unfollow, getUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {withKamasutraApi,withAuthRedirect} from "../hoc";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelectors
} from "../../redux/users-selectorst";
import {UserType} from "../../types/redux-types";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    users:Array<UserType>,
    followingInProgress:Array<number>,
}
type MapDispatchPropsType = {
    follow:(services: any,userId: number)=>any ,
    unfollow:(services: any,userId: number)=>any,
    getUsers: (services:()=>any, currentPage:number, pageSize:number)=> void

}
type OwnPropsType = {
    pageTitle: string,
    services:()=>any,
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {getUsers,currentPage,pageSize,services} = this.props;
        getUsers(services,currentPage,pageSize)
    }

    onPageChanged = ( pageNumber:number ) => {
        const {getUsers,pageSize,services} = this.props;
        getUsers(services,pageNumber,pageSize)

    };

    render() {
        const {isFetching,totalUsersCount,pageSize,currentPage,users,follow,unfollow,followingInProgress} = this.props;
        return <>
            { isFetching ? <Preloader /> : null }
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={this.onPageChanged}
                   users={users}
                   follow={follow}
                   unfollow={unfollow}
                   followingInProgress={followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state:AppStateType) => {
    return {
        users:  getUsersSelectors(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};
const mapDispatchToProps = {
    follow, unfollow, getUsers
};


export default compose(
    connect<MapStatePropsType,MapDispatchPropsType, OwnPropsType,AppStateType>(mapStateToProps, mapDispatchToProps),
    withKamasutraApi(),
    withAuthRedirect

)(UsersContainer)
