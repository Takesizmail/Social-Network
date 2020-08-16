import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {compose} from "redux";
import {withKamasutraApi} from "../hoc";

const Navbar = ({logout,services}) => {

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>

            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
            <div className={s.item}>
                <a onClick={()=>logout(services)}> Log out</a>
            </div>
        </nav>
    )
}

const mapDispatchToProps = {
    logout
}

export default compose(
    connect(null,mapDispatchToProps,null,{pure: false}),
    withKamasutraApi()
)(Navbar)

