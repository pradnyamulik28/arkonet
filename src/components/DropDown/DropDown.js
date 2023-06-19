import React, { useState } from 'react';
import styles from './DropDown.module.css'


const DropDown = (props) => {
  // const [selectedOption, setSelectedOption] = useState('');

  // const handleSelectChange = (event) => {
  //   event.preventDefault();
  //   setSelectedOption(event.target.value);
  // };


  return (
    <>
      <div className={` form-group ${styles.selecttag}`}>
        <label htmlFor={props.id}>{props.lblname}</label>
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

      </div>
      <div>

      </div>
    </>
  );
}

export default DropDown;

