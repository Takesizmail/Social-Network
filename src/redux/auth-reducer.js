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
let initialState = {
    userId:  null,
    email:  null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
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


export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, payload: {userId, email, login}  })
export const setAuthOff = () => ({type: SET_AUTH_OFF})
export const setMe = () =>({type: SET_ME})

export const getAboutMe = (services,history) => async (dispatch) =>{
    let response = await services.getMe()
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                // setSession(response.data.data)
                dispatch(setAuthUserData(id, email, login));
                history.push("/profile");
            }
};
export const login =  (services, history, email, password, rememberMe) => async (dispatch) =>{
    let response = await services.login(email,password,rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAboutMe(services,history));
    }
};

export const logout = (services) => async (dispatch) =>{
    let response = await services.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthOff());
            }
};


export default authReducer;