import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAboutMe, setAuthUserData} from "../../redux/auth-reducer";
import {withKamasutraApi} from "../hoc";
import {compose} from "redux";
import {getIsAuth, getIsLogin} from "../../redux/users-selectors";

class HeaderContainer extends React.Component {
    componentDidMount() {
   // this.props.getAboutMe(this.props.services)
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    login: getIsLogin(state),
});

const mapDispatchToProps = {
    setAuthUserData, getAboutMe
};


 export default  compose(
    withKamasutraApi(),
    connect(mapStateToProps, mapDispatchToProps),
    )(HeaderContainer);
// export default connect(mapStateToProps, mapDispatchToProps)(withKamasutraApi()(HeaderContainer));