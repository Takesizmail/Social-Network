import React from "react";
import s from './formControls.module.css'

const FormControl = ({input, meta,...props}) =>{
    const showError = meta.touched && meta.error ;
    return( <React.Fragment>
            <div className={`${s.form_control} ${showError ? s.error_textarea : '' }`}>
                {props.children}
            </div>
            {showError && <span>{meta.error}</span>}
        </React.Fragment>
    )
}

export const Textarea = (props) =>{
    const {input, meta,...restProps} = props;
    return(
        <FormControl {...props}>
            <textarea {...input} {...restProps}  />
        </FormControl>

        // <div>
        //     <div>
        //     <textarea  className={`${s.form_control} ${showError ? s.error_textarea : '' }`}  {...input} {...props} />
        //     </div>
        //     {showError && <span>{meta.error}</span>}
        // </div>
    )
}

// export const Input = ({input, meta, ...props}){
//     return <FormControl> <input  ></FormControl>
//
// }