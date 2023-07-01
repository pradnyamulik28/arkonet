import React from 'react';
import styles from './RadioInput.module.css';

const RadioInput = (props) => {
  return (
    <div>
      <input type="radio" name={props.name} id="radioname" value={props.value} checked={props.checked} onChange={props.onChange} className={styles.input} />
      <label htmlFor="radioname">{props.label}</label>
    </div>
  );
}

export default RadioInput;
