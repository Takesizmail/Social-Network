import {AppStateType} from "./redux-store";

export const getUsersSelectors = (state:AppStateType) =>{
    return state.usersPage.users
}
export const getPageSize = (state:AppStateType) =>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state:AppStateType) =>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state:AppStateType) =>{
    return state.usersPage.currentPage
}
export const getIsFetching = (state:AppStateType) =>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress= (state:AppStateType) =>{
    return state.usersPage.followingInProgress
}

// profilePage

export const getProfile = (state:AppStateType) =>{
    return state.profilePage.profile
}
export const getStatus = (state:AppStateType) =>{
    return state.profilePage.status
}
export const getPosts = (state:AppStateType) =>{
    return state.profilePage.posts
}
export const getNewPostText = (state:AppStateType) =>{
    return state.profilePage.newPostText
}
// !!!profilePage
export const getIsAuth = (state:AppStateType) =>{
    return state.auth.isAuth
}
export const getIsLogin = (state:AppStateType) =>{
    return state.auth.login
}
export const getUserId = (state:AppStateType)=>{
    return state.auth.userId
}