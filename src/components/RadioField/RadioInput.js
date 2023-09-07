import React from 'react';
import styles from './RadioInput.module.css';

const RadioInput = (props) => {
  return (
    <div>
      <input type="radio" name={props.name} id={props.label} value={props.value} checked={props.checked} onChange={props.onChange} className={styles.input} />
      <label htmlFor={props.label}><b>{props.label}</b><span className={styles.manadatory}>{props.manadatory}</span></label>
    </div>
  );
}

export default RadioInput;
