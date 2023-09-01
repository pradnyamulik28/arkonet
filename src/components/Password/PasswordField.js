import React from 'react';
import styles from './PasswordField.module.css'
import ValidationError from '../ValidationError/ValidationError'

const PasswordField = (props) => {
 
  return (
    <div>
      <div className={styles.dpass}>
        <label htmlFor={props.id}>{props.lblname}<span className={styles.pmanadatory}>{props.manadatory}</span></label>
        <input
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          id={props.id}
          className={props.className}
          value={props.value}
          onChange={props.onChange}
          autoComplete='off' />
        {props.name==="confirmpassword" && (
        !props.isPasswordMatch && <ValidationError validationmsg={props.validationmsg} />
      )}
      </div>
      {props.name==="password" && <div className={styles.passindicator}>
        <span className={styles.weak} strenghtScore={props.strenghtScore}></span>
        <span className={styles.medium1} strenghtScore={props.strenghtScore}></span>
        <span className={styles.medium2} strenghtScore={props.strenghtScore}></span>
        <span className={styles.strong} strenghtScore={props.strenghtScore}></span>
      </div>}    
      
    </div>

  );
}

export default PasswordField;
