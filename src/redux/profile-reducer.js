import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS_PROFILE = 'profile/SET_STATUS_PROFILE';
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const LOAD_INITIAL_VALUE = 'profile/LOAD_INITIAL_VALUE'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.posts[state.posts.length + 1 ],
                message: action.post,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS_PROFILE: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: { ...state.profile, photos: action.photos}}
        }
        case DELETE_POST: {
            let idx = state.posts.findIndex((e)=> e.id === action.idPost)
            return {
                ...state,
                posts: [...state.posts.slice(0,idx),...state.posts.slice(idx)]
            }
        }
        default:
            return state;
    }
}


export const addPostActionCreator = (post) => ({type: ADD_POST,post})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatusProfile = (status) => ({type: SET_STATUS_PROFILE, status})
export const deletePost = (idPost) =>({type: DELETE_POST,idPost})
export const savePhotoSuccess = (photos)=>({type:SAVE_PHOTO_SUCCESS,photos})

export const getProfileThunk = (services,userId) => async (dispatch) =>{
     let response = await  services.getProfile(userId)
            dispatch(setUserProfile(response.data))
};

export const getStatusThunk = (services,userId) => async (dispatch) =>{
   let response =  await services.getStatus(userId)
            dispatch(setStatusProfile(response.data))
};

export const updateStatusThunk = (services,status,userId) => async (dispatch) =>{
    let response = await  services.updateStatus(status)
            if(response.data.resultCode === 0){
                dispatch(getStatusThunk(services,userId))
            }
};
export const savePhoto = (services,file) => async (dispatch) =>{
    let response = await  services.changePhoto(file)
    if(response.data.resultCode ===0){
        console.log('success')
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};

export const saveProfile =  (services,profileData,profile) => async (dispatch,getState) =>{
    const userId = getState().auth.userId
    const newProfile = {...profile,...profileData,lookingForAJobDescription:'i am a great coder'};
    delete newProfile.photos
    let response = await services.saveProfile(newProfile)
    console.log(response)
    if(response.data.resultCode ===0){
        console.log(response)
        dispatch(getProfileThunk(services,userId))
    } else {
        console.log(2)
        dispatch(stopSubmit("profileForm",{_error: response.data.message[0]}))
        return Promise.reject()
    }
};
export default profileReducer;