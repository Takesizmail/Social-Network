import React from 'react';
import {withKamasutraApi} from '../hoc'
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import s from './users.module.css'
const Users = (props) => {
    const {followingInProgress,follow,unfollow,services} = props;
    return <div>
            <div className={s.userContainer}>
        {
            props.users.map(user =>
                <User user={user}
                      followingInProgress={followingInProgress}
                      follow={follow}
                      unfollow={unfollow}
                      services={services}
                      key={user.id}
                />)
        }
            </div>
        <Paginator
            onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            portionsSize= {10}
        />
    </div>
}

export default withKamasutraApi()(Users);