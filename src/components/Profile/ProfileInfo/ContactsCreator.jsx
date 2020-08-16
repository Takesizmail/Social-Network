import s from "./ProfileInfo.module.css";
import React from "react";

 const Contacts = ({contactTitle, contactValue}) =>{
     if(!contactValue) return '';
    return <div className={s.contact}><b>{contactTitle}: </b> <a href={contactValue}>{contactValue}</a></div>
}
export default Contacts