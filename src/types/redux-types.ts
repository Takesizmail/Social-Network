 export type StatePostsType = {
    id : number,
    message: string,
    likesCount: number
}

export type StateProfileContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    website: string,
    twitter: string,
    youtube: string,
    mainLink: string,
}
export type StatePhotosType = {
    small: string | null,
    large: string | null
}
export type StateProfileType = {
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: StateProfileContactsType,
    photos?: StatePhotosType
}
 export type UserType = {
     id: number,
     name: string,
     status: string,
     photos: StatePhotosType
     followed: boolean
 }