import React from 'react';
import styles from './InputFields.module.css'
import ValidationError from '../ValidationError/ValidationError'

const InputField = (props) => {

  const properties = {
    placeholder: props.placeholder,
    type: props.type,
    name: props.name,
    id: props.id,
    className: 'form-control ',
    value: props.value,
    onChange: props.onChange,
    maxLength: props.maxLength,
    autoComplete: 'off',
    disabled: props.disabled
  }

  if (props.type === "date") {
    properties.max = new Date().toISOString().split('T')[0];
  }


  return (
    <div className={` ${styles.inputfield} mb-4`} >
      <label htmlFor={props.id}>{props.lblname}<span className={styles.manadatory}>{props.manadatory}</span></label>
      <input
        {...properties}
      />

      {props.name === "name" && (
        !props.isNameNull && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.name === "email" && (
        !props.isValidEmail && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.name === "mobile" && (
        !props.isValidMobile && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.name === "pan" && (
        !props.isValidPAN && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.manadatory  &&  (
          (props.name === "address" && !props.isAddressNull) && <ValidationError validationmsg={props.validationmsg} />
      )}
      
      {props.manadatory  &&  (
          (props.name === "pin_code" && !props.isValidPIN) && <ValidationError validationmsg={props.validationmsg} />
      )}

    </div >
  );
}

export default InputField;
