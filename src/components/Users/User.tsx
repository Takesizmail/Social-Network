import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {withKamasutraApi} from '../hoc'
import {UserType} from "../../types/redux-types";

type PropsType = {
    user: UserType,
    followingInProgress:Array<UserType>,
    follow:(services:()=> any,userId: number)=>void ,
    unfollow:(services:()=> any, userId: number)=>void,
    services:()=>any,
}


const User:React.FC<PropsType> = ({user,followingInProgress,follow,unfollow,services}) => {
    console.log(followingInProgress, user)
    const disabled = (followingInProgress:Array<any>,idx:number) =>{
        return followingInProgress.some((id: number) => id===idx)
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