import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const   TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [ ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
          // return updateObjectInArray(state,true)
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id',{followed:true})
            //     users: state.users.map( u =>  {
            //         if (u.id === action.userId) {
            //             return {...u, followed: true}
            //         }
            //         return u;
            //     })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id',{followed:true})

                // users: state.users.map( u =>  {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
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
                    : state.followingInProgress.filter(id => id != action.userId)

            }
        }
        default:
            return state;
    }
};




export const followSuccess = (userId) => ({type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching,userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching,userId })

export const getUsers = (services, page, pageSize) => async (dispatch) =>{
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page))
    let response = await services.getUsers(page,pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
};

const followUnfollowFlow = async (dispatch,userId,apiMethod,actionCreator) =>{
    dispatch(toggleFollowingProgress(true,userId));

    let response = await apiMethod(userId);
    if (response.data.resultCode === 0 ){
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false,userId));
}

export const follow = (services,userId) => async (dispatch) =>{
    let apiMethod = services.followUser.bind(services)
   await followUnfollowFlow(dispatch,userId,apiMethod,followSuccess)

};
export const unfollow = (services,userId) => async (dispatch) =>{
    let apiMethod = services.unfollowUser.bind(services);
    await followUnfollowFlow(dispatch,userId,apiMethod,unfollowSuccess)
};



export default usersReducer;