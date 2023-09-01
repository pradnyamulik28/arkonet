import React from 'react';
import styles from './DropDown.module.css'
import ValidationError from '../ValidationError/ValidationError';


const DropDown = (props) => {



  return (


    <div className={` form-group ${styles.selecttag}`}>
      <label htmlFor={props.id}>{props.lblname}<span className={styles.manadatory}>{props.manadatory}</span></label>
      <select id={props.id} value={props.value} onChange={props.onChange} name={props.name}>
        <option value="">-- Select --</option>
        {
          props.value_array.map((data) => {
            return (
              <option value={data.val}>{data.option_name}</option>
            )
          })
        }

      </select>
      {props.name==="profession" && (
        !props.isProfessionNull && <ValidationError validationmsg={props.validationmsg} />
      )}

    </div>



  );
}

export default DropDown;

