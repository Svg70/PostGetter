import React from 'react'
import styles from './formControlls.module.css'


const FormControl = ({input, meta, child, element, ...props}) =>{
    let someError = meta.touched && meta.error
    
    return(
        <div className={ styles.formcontrol + " " +(someError ? styles.error : "")}>
            {props.children}
            <div>
                {someError && <span>{meta.error}</span>}
                </div>
        </div>
        
    )
}
export const Textarea = (props) => {
    
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input className={styles.input} {...input} {...restProps} /></FormControl>
}
