import React from 'react';
import styles from './InputFields.module.css'

const InputField = (props) => {

  return (
    <div className={`form-group ${styles.inputfield}`} >
      <label htmlFor={props.id}>{props.lblname}<span className={styles.manadatory}>{props.manadatory}</span></label>
      <input
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        id={props.id}
        className='form-control '
        value={props.value}
        onChange={props.onChange}
      />
    </div >
  );
}

export default InputField;
