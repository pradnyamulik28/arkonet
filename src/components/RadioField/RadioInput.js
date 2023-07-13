import React from 'react';
import styles from './RadioInput.module.css';

const RadioInput = (props) => {
  return (
    <div>
      <input type="radio" name={props.name} id="radioname" value={props.value} checked={props.checked} onChange={props.onChange} className={styles.input} required />
      <label htmlFor="radioname">{props.label}<span className={styles.manadatory}>{props.manadatory}</span></label>
    </div>
  );
}

export default RadioInput;
