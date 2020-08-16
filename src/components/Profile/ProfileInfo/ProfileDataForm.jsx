import React, {useEffect} from "react";
import Contacts from "./ContactsCreator";
import {Field, reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css";
import {connect} from "react-redux";

const ProfileDataForm = ({isOwner,editDeactivate,dataForms,saveProfile,initialValues,error})=>{
    const handleSubmit = async  (e)=>{
        e.preventDefault()
         saveProfile(dataForms)
        editDeactivate(false)

    }
    return <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
            <label> <b> Full name :</b></label> <Field name='fullName' placeholder="enter your FullName" type="text" component="input" />
        </div>
        <div>
            <label>  <b> About Me :</b> </label> <Field name='aboutMe' placeholder="enter something about yourself" type="text" component="input" />
        </div>

        <div>
            <label> <b>Looking for a job :</b></label>
            <div>
                <label>
                    <Field name="lookingForAJob" component="input" type="radio" value="true" />
                    yes
                </label>
                <label>
                    <Field name="lookingForAJob" component="input" type="radio" value="false" />
                    no
                </label>
            </div>
        </div>

        <div>
            <b> My professional skills : </b> <Field name='lookingForAJobDescription' placeholder="enter about your skills" type="text" component="input" />
        </div>

        <div>
            <label><b> Contacts : </b> </label> {Object.keys(initialValues.contacts).map(key=>{
            return <ContactFormCreator contactTitle={key} />
        })}
        </div>
        <div> {isOwner &&<button type="submit" >close edit mode</button>}</div>
    </form>
}
const ContactFormCreator = ({contactTitle})=>{
    return <div key={contactTitle} className={s.contact}>
        <label><b>{contactTitle}: </b> </label>
        <Field name={`contacts.${contactTitle}`} placeholder={contactTitle} type="text" component="input" />
    </div>
}



let ProfileForm =  reduxForm({
    form: 'profileForm',

})(ProfileDataForm)


export default connect(state=>({dataForms : state.form.profileForm}))(ProfileForm)