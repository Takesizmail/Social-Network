export const getUsersSelectors = (state) =>{
    return state.usersPage.users
}
export const getPageSize = (state) =>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) =>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) =>{
    return state.usersPage.currentPage
}
export const getIsFetching = (state) =>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress= (state) =>{
    return state.usersPage.followingInProgress
}

// profilePage

export const getProfile = (state) =>{
    return state.profilePage.profile
}
export const getStatus = (state) =>{
    return state.profilePage.status
}
export const getPosts = (state) =>{
    return state.profilePage.posts
}
export const getNewPostText = (state) =>{
    return state.profilePage.newPostText
}
// !!!profilePage
export const getIsAuth = (state) =>{
    return state.auth.isAuth
}
export const getIsLogin = (state) =>{
    return state.auth.login
}
export const getUserId = (state)=>{
    return state.auth.userId
}