import {Cookies} from "react-cookie";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_AUTH_OFF = 'auth/SET_AUTH_OFF';
const SET_ME = 'auth/SET_ME';

// const setSession = user => {
//     const cookies = new Cookies();
//     if (user) cookies.set("user", JSON.stringify(user), { path: "/" });
//     else cookies.remove("user")
// };
// const getLoggedInUser = () => {
//     const cookies = new Cookies();
//     const user = cookies.get("user");
//
//     return user ? (typeof (user) === "object" ? user : JSON.parse(user)) : null;
// };


// let initialState = {
//     userId: getLoggedInUser().id ? getLoggedInUser().id : null,
//     email: getLoggedInUser().email ? getLoggedInUser().email : null,
//     login: getLoggedInUser().login ? getLoggedInUser().login : null,
//     isAuth: false
// };

type InitialStateType2 = {
    userId:  number | null,
    email:  string | null,
    login: string | null,
    isAuth: boolean
};

let initialState  = {
    userId:  null as null | number,
    email:  null as null | string,
    login: null as null | string,
    isAuth: false as boolean
};
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action:any):InitialStateType2 => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case SET_AUTH_OFF:
            return {
                userId: null,
                email: null,
                login: null,
                isAuth: false
            }
        case  SET_ME:
            return{
                ...state,
                isAuth: true
            }
        default:
            return state;
    }
}

type SetAuthUserDataPayloadType={
    userId: number,
    email: string,
    login: string
}

type SetAuthUserDataType = {
    type : typeof SET_USER_DATA,
    payload : SetAuthUserDataPayloadType
}

type setAuthOffActionType = {
    type : typeof SET_AUTH_OFF
}

type setMeActionType = {
    type: typeof SET_ME
}
export const setAuthUserData = (userId: number, email: string, login: string): SetAuthUserDataType => ({type: SET_USER_DATA, payload: {userId, email, login}  })

export const setAuthOff = (): setAuthOffActionType => ({type: SET_AUTH_OFF})
export const setMe = (): setMeActionType =>({type: SET_ME})

export const getAboutMe = (services: any, history: any) => async (dispatch: any) =>{
    let response = await services.getMe()
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                // setSession(response.data.data)
                dispatch(setAuthUserData(id, email, login));
                history.push("/profile");
            }
};
export const login =  (services: any, history: any , email: string, password: string, rememberMe: boolean) => async (dispatch: any) =>{
    let response = await services.login(email,password,rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAboutMe(services,history));
    }
};

export const logout = (services:any) => async (dispatch : any) =>{
    let response = await services.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthOff());
            }
};


export default authReducer;