import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unfollow, toggleFollowingProgress, getUsers
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
} from "../../redux/users-selectors";



class UsersContainer extends React.Component {
    componentDidMount() {
        const {getUsers,currentPage,pageSize,services} = this.props;
        getUsers(services,currentPage,pageSize)
    }

    onPageChanged = (pageNumber) => {
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

let mapStateToProps = (state) => {
    return {
        users: getUsersSelectors(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};
const mapDispatchToProps = {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching,
    toggleFollowingProgress,
    getUsers
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withKamasutraApi(),
    withAuthRedirect

)(UsersContainer)
