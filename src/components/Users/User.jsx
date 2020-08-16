import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {withKamasutraApi} from '../hoc'

const User = ({user,followingInProgress,follow,unfollow,services}) => {
    const disabled = (followingInProgress,idx) =>{
        return followingInProgress.some(id => id===idx)
    }

    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={disabled(followingInProgress,user.id)}
                                      onClick={() =>unfollow(services,user.id)}
                            >Unfollow</button>

                            : <button
                                disabled={disabled(followingInProgress,user.id)}
                                onClick={() =>follow(services,user.id) }
                            >Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
        </div>
    )
}

export default withKamasutraApi()(User);