import React from 'react';
import styles from './InputFields.module.css'

const InputField = (props) => {

  return (
    <div className={styles.inputfield} >
      <label htmlFor={props.id}>{props.lblname}</label>
      <input
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        id={props.id}
        className={props.className}
        value={props.value}
        onChange={props.onChange} />
    </div >
  );
}

export default InputField;
