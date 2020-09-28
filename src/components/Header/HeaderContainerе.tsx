import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {compose} from "redux";
import {getIsAuth, getIsLogin} from "../../redux/users-selectorst";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type PropsType = MapStateToPropsType;


class HeaderContainer extends React.Component<PropsType> {

    render() {
        const { isAuth, login} = this.props;
        return <Header isAuth={isAuth} login={login}/>
    }
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
        return {
    isAuth: getIsAuth(state),
    login: getIsLogin(state),
}};



 export default  compose(
    connect<MapStateToPropsType,null,null,AppStateType>(mapStateToProps),
    )(HeaderContainer);
// export default connect(mapStateToProps, mapDispatchToProps)(withKamasutraApi()(HeaderContainer));