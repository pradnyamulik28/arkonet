import React from 'react';
import styles from './leftside.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'



const LeftSide = () => {

  return (
    <div className="container" >
      <div className={`${styles.sidebar}`}>
        <div className={styles.help}>
          <img className={styles.taxo_logo} src={Applogo} alt="" />
          <a href="/" className={styles.help_text}><h6>Help</h6></a>
        </div>

        <div className={styles.help}>
          <h6 className={styles.poweredby}>DEVELOPED AND MANAGED BY</h6>
          <img className={` ${styles.arko_logo}`} alt='logo' src={Cmpylogo} />
          <h6 className={styles.version}>version 1.0</h6>
        </div>



      </div>
    </div>
  );
}

export default LeftSide;
