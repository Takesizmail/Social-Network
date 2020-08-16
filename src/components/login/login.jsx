import React from 'react';
import {reduxForm,Field} from 'redux-form';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {login} from "../../redux/auth-reducer";
import { withKamasutraApi} from '../hoc';

const Login = ({login,services,history}) => {


    const onSubmit = (formDate) =>{
        try{
            login(services,history,formDate.login, formDate.password,formDate.rememberMe);

        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div>
            <h1> Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    );
};
const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field type="email" placeholder='Login' name={'login'} component={'input'}/>
            </div>
            <div>
                <Field type="password" placeholder='Password' name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={'input'}/> remember me
            </div>
            <div>
                <button>Login</button>

            </div>
        </form>
    );
};
const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm);

const mapDispatchToProps = {
    login
}

export default compose(
    withKamasutraApi(),
    connect(null,mapDispatchToProps),
    withRouter
)(Login)