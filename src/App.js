import React,{Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch,Redirect} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";


import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/login.jsx";

import ProfileContainer from "./components/Profile/ProfileContainer";
// import UsersContainer from "./components/Users/UsersContainer";

// const ProfileContainer = React.lazy(()=> import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(()=> import("./components/Users/UsersContainer"))
const DialogsContainer = React.lazy(()=> import("./components/Dialogs/DialogsContainer"))
const App = () => {

    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Router/>
            </div>
        </div>
    )
}
const Router = () =>{
    return(
        <React.Fragment>
            <Switch>
            <Route path='/dialogs'
                   render={ () =>{ return <Suspense fallback={<div>...Loading</div>}>
                       <DialogsContainer />
                   </Suspense>
                    }} exact/>

            <Route path='/profile/:userId?'
                   render={ () => <ProfileContainer />}

                   exact/>

            <Route path='/users'
                   render={ () =>{ return <Suspense fallback={<div>...Loading</div>}>
                       <UsersContainer />
                   </Suspense>
                   }} exact/>
                   
            <Route path='/login'
                   component={Login} exact/>
            <Redirect to='/login'/>
            </Switch>
        </React.Fragment>
    )
}

export default App