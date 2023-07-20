import React from 'react';
import styles from './PasswordField.module.css'

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
          onChange={props.onChange} />
      </div>
      <div className={styles.passindicator}>
        <span className={styles.weak}></span>
        <span className={styles.medium1}></span>
        <span className={styles.medium2}></span>
        <span className={styles.strong}></span>
      </div>
    </div>

  );
}

export default PasswordField;
