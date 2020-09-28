import React, {ComponentType, FormEvent, useEffect} from "react";
import Contacts from "./ContactsCreator";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

interface Props extends InjectedFormProps{
    isOwner:boolean
    editDeactivate:(bool:boolean)=>void
    saveProfile:(dataForm:any)=>void
    initialValues:any
    dataForms:any,
    error: any,
    onSubmit: ()=>any
}


const ProfileDataForm: React.FC<Props> = ({onSubmit,isOwner,editDeactivate,dataForms,saveProfile,initialValues,error})=>{
    const handleSubmit = (event: FormEvent<HTMLFormElement>):void =>{
        event.preventDefault()
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

type PropsContactForm = {
    contactTitle: any
}

const ContactFormCreator: ComponentType<PropsContactForm> = ({contactTitle})=>{
    return <div key={contactTitle} className={s.contact}>
        <label><b>{contactTitle}: </b> </label>
        <Field name={`contacts.${contactTitle}`} placeholder={contactTitle} type="text" component="input" />
    </div>
}



let ProfileForm =  reduxForm({
    form: 'profileForm',
// @ts-ignore
})(ProfileDataForm)

const mapStateToProps = (state:AppStateType) =>({
    dataForms : state.form.profileForm
})




export default connect(mapStateToProps )(ProfileForm)