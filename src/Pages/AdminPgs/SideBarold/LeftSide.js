// import React from 'react';
// import styles from './leftside.module.css';
// import Applogo from '../../../Images/taxko_logo.jpeg'
// import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
// import { Link } from 'react-router-dom';



// const LeftSide = () => {





//   const handleLogout = () => {
//     localStorage.clear();
//   };

//   return (
//     <div className="container" >
//       <div className={`${styles.sidebar}`}>
//         <div className={styles.help}>
//           <Link to='dashboard'>
//             <img className={styles.taxo_logo} src={Applogo} alt="" />
//           </Link>
//           <Link to="help" className={styles.help_text}><h6>Help</h6></Link>
//           <Link to="" className={styles.dash_text}><h6>Dashboard</h6></Link>
//           <Link to="" className={styles.logout_text} onClick={handleLogout}><h6>Logout</h6></Link>
//           <Link to="changepass" className={` ${styles.reset_text}`} ><h6>Change Password</h6></Link>
//         </div>

//         <div className={styles.help}>
//           <h6 className={styles.poweredby}>Developed and Manage By</h6>
//           <img className={` ${styles.arko_logo}`} alt='logo' src={Cmpylogo} />
//           <h6 className={styles.version}>version 1.0</h6>
//         </div>



//       </div>
//     </div>
//   );
// }

// export default LeftSide;





import React, { useEffect, useState } from 'react';
import styles from './leftside.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, Navigate } from 'react-router-dom';

const LeftSide = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    function isLocalStorageNotEmpty() {
      return localStorage.length > 0;
    }

    if (isLocalStorageNotEmpty()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });


  const handleLogout = () => {
    localStorage.clear();

  };



  return (
    <div className="container">
      <div className={`${styles.sidebar}`}>
        <div className={styles.help}>
          <Link to={""}>
            <img className={styles.taxo_logo} src={Applogo} alt="" />
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="" className={styles.logout_text} onClick={handleLogout}><h6>Logout</h6></Link>
              <Link to="dashboard" className={styles.dash_text}><h6>Dashboard</h6></Link>
              <Link to="changepass" className={` ${styles.reset_text}`} ><h6>Change Password</h6></Link>
            </>
          ) : (
            <Link to="help" className={styles.help_text}><h6>Help</h6></Link>
          )}
        </div>

        <div className={styles.help}>
          <h6 className={styles.poweredby}>Developed and Manage By</h6>
          <img className={` ${styles.arko_logo}`} alt='logo' src={Cmpylogo} />
          <h6 className={styles.version}>version 1.0</h6>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
