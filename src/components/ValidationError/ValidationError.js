import React from 'react';
import style from './ValidationError.module.css'

const ValidationError = (props) =>{

    return(
        <div className={`${style.errormsg}`}>
        <p >{props.validationmsg}</p>
        </div>
    )
}

export default ValidationError