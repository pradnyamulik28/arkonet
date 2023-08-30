import React from 'react';
import styles from './leftside.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link } from 'react-router-dom';



const LeftSide = () => {

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className={`row ${styles.container}`}>
      <div className={` ${styles.sidebar}`}>
        <div className={`col-12 ${styles.help}`}>
        <div className={`col-12 ${styles.clogo}`}>
          <Link to='dashboard'>
            <img className={styles.taxo_logo} src={Applogo} alt="" />
          </Link>
        </div>
        <div className={`col-12 ${styles.helpbar}`}>
          <Link to="#" className={styles.help_text}><h6>Help</h6></Link>
          <Link to="dashboard" className={styles.dash_text}><h6>Dashboard</h6></Link>
          <Link to="" className={styles.logout_text} onClick={handleLogout}><h6>Logout</h6></Link>
          <Link to="changepass" className={` ${styles.reset_text}`} ><h6>Change Password</h6></Link>
        </div>
        </div>

        <div className={styles.copyright}>
          <h5 className={styles.poweredby}>Developed and Manage By</h5>
          <img className={` ${styles.arko_logo}`} alt='logo' src={Cmpylogo} />
          <h5 className={styles.version}>version 1.0</h5>
        </div>



      </div>
    </div>
  );
}

export default LeftSide;
