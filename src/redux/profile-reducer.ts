import { stopSubmit } from "redux-form";
import { StatePostsType, StatePhotosType, StateProfileType } from "../types/redux-types";


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS_PROFILE = 'profile/SET_STATUS_PROFILE';
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
// const LOAD_INITIAL_VALUE = 'profile/LOAD_INITIAL_VALUE'




let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<StatePostsType> ,
    newPostText: 'it-kamasutra.com' as string,
    profile: null as  StateProfileType | null,
    status: '' as string,

};
 export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any):InitialStateType => {

    switch(action.type) {
        case ADD_POST: {
            let newPost: StatePostsType = {
                id: state.posts.length + 1,
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
            return {...state, profile: {...state.profile, photos: action.photos} as StateProfileType}
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
type AddPostActionCreatorType = {
    type : typeof ADD_POST,
    post:string
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: any
}
type SetStatusProfileType = {
    type : typeof SET_STATUS_PROFILE,
    status: string
}
type DeletePostType = {
    type: typeof  DELETE_POST,
    idPost: number
}
type SavePhotoSuccessType = {
    type: typeof  SAVE_PHOTO_SUCCESS,
    photos: StatePhotosType
}
export const addPostActionCreator = (post:string): AddPostActionCreatorType => ({type: ADD_POST,post})
export const setUserProfile = (profile: StateProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setStatusProfile = (status:string): SetStatusProfileType => ({type: SET_STATUS_PROFILE, status})
export const deletePost = (idPost: number): DeletePostType =>({type: DELETE_POST,idPost})
export const savePhotoSuccess = (photos: StatePhotosType):SavePhotoSuccessType =>({type:SAVE_PHOTO_SUCCESS,photos})

export const getProfileThunk = (services: any,userId: number) => async (dispatch: any) =>{
     let response = await  services.getProfile(userId)
            dispatch(setUserProfile(response.data))
};

export const getStatusThunk = (services: any,userId: number) => async (dispatch: any) =>{
   let response =  await services.getStatus(userId)
            dispatch(setStatusProfile(response.data))
};

export const updateStatusThunk = (services: any,status: string,userId: number) => async (dispatch:any) =>{
    let response = await  services.updateStatus(status)
            if(response.data.resultCode === 0){
                dispatch(getStatusThunk(services,userId))
            }
};
export const savePhoto = (services: any,file: any) => async (dispatch:any) =>{
    let response = await  services.changePhoto(file)
    if(response.data.resultCode ===0){
        console.log('success')
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};



export const saveProfile =  (services:any,profileData:any,profile:any) => async (dispatch:any,getState: Function) =>{
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