import React from 'react';
import styles from './leftside.module.css';
import Applogo from '../../Images/taxko_logo.jpeg';
import Cmpylogo from '../../Images/Arkonet - Logo_page-0001.jpg'



const LeftSide = () => {
  return (
    <div>
      <div className={styles.left}>
        <div className={styles.left_side}>
          <div className={styles.left_top}>

          </div>
          <div className={styles.left_bottom}>
            <div className={styles.help}>
              <img src={Applogo} alt="" />
              <a href="/">Help</a>
            </div>
            <img className={styles.arko_logo} alt='logo' src={Cmpylogo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
