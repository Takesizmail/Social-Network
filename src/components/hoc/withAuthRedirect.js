import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const withAuthRedirect = (Wrapper) => {
   let RedirectComponent = (props) =>{
      if(!props.isAuth) return <Redirect to='/login'/>

      return <Wrapper {...props}/>
    };
   RedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return RedirectComponent;
};

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})




export default withAuthRedirect;