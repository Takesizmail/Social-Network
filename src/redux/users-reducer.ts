import {updateObjectInArray} from "../utils/object-helpers";
import {StatePhotosType, UserType} from "../types/redux-types";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const   TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType> ,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: []  as Array<number> // array of users ids
};

export type InitialStateType  = typeof initialState

const usersReducer = (state = initialState, action: any):InitialStateType => {
    switch(action.type) {
        case FOLLOW:
            // return updateObjectInArray(state,true)
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id',{followed:true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id',{followed:true})
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress,action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
};

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
type UnfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
type SetUsersType = {
    users: any,
    type : typeof SET_USERS
}
type SetCurrentPageType = {
    type : typeof SET_CURRENT_PAGE,
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean

}
type ToggleFollowingProgress = {
    type : typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId })
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId })
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching: boolean,userId: number): ToggleFollowingProgress => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching,userId })

export const getUsers = (services: any, currentPage: number, pageSize: number) => async (dispatch: any) =>{
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage))
    let response = await services.getUsers(currentPage,pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
};

const followUnfollowFlow = async (dispatch: any,userId: number,apiMethod: any,actionCreator:Function) =>{
    dispatch(toggleFollowingProgress(true,userId));

    let response = await apiMethod(userId);
    if (response.data.resultCode === 0 ){
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false,userId));
}

export const follow = (services: any,userId: number) => async (dispatch: any) =>{
    let apiMethod = services.followUser.bind(services)
    await followUnfollowFlow(dispatch,userId,apiMethod,followSuccess)

};
export const unfollow = (services: any,userId: number) => async (dispatch:any) =>{
    let apiMethod = services.unfollowUser.bind(services);
    await followUnfollowFlow(dispatch,userId,apiMethod,unfollowSuccess)
};



export default usersReducer;