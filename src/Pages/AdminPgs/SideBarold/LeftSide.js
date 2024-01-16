import React, { useState, useEffect } from 'react';

import styles from './leftside.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link } from 'react-router-dom';

const LeftSide = ({ loggedIn, setLoggedIn }) => {
  const subscription_status = localStorage.getItem(`subscription_status`)
  const Category = localStorage.getItem(`Category`)

  useEffect(() => {
    // setIsLoggedIn(loggedIn);
    if (localStorage.length > 0) {
      // setIsLoggedIn(localStorage.getItem('LogedIn'));
      // setIsLoggedIn(true);
    }
    // console.log('is logged in',isLoggedIn);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="container">
      <div className={`${styles.sidebar}`}>
        <div className={`d-flex flex-column justify-content-around ${styles.navbar}  `}>
          <Link>
            <img className={styles.taxo_logo} src={Applogo} alt="" />
          </Link>
          {loggedIn ? (
            <>
              {subscription_status === "off" || subscription_status === "not_subscribed" ? '' :
                <>
                  <Link to="dashboard" onClick={() => handleLinkClick('dashboard')}>
                    <h6 className={activeLink === 'dashboard' ? 'font-weight-bold' : ''}>Dashboard</h6>
                  </Link>

                  <Link to="dashboard/tc" onClick={() => handleLinkClick('myclients')}>
                    <h6 className={activeLink === 'myclients' ? 'font-weight-bold' : ''}>My Clients</h6>
                  </Link>




                  {Category !== "Sub User" &&
                    <>

                      <Link to="tallybackup" onClick={() => handleLinkClick('tallybackup')}>
                        <h6 className={activeLink === 'tallybackup' ? 'font-weight-bold' : ''}>Tally Backup</h6>
                      </Link>

                      <Link to="changepass" onClick={() => handleLinkClick('changepass')}>
                        <h6 className={activeLink === 'changepass' ? 'font-weight-bold' : ''}>Change Password</h6>
                      </Link>

                      <Link to="investNow" onClick={() => handleLinkClick('investNow')}>
                        <h6 className={activeLink === 'investNow' ? 'font-weight-bold' : ''}>Invest Now</h6>
                      </Link>

                      <Link to="dashboard/sublogin" onClick={() => handleLinkClick('sublogin')}>
                        <h6 className={activeLink === 'sublogin' ? 'font-weight-bold' : ''}>Sub Login</h6>
                      </Link>

                      <Link to="dashboard/leads" onClick={() => handleLinkClick('leads')}>
                        <h6 className={activeLink === 'leads' ? 'font-weight-bold' : ''}>Leads</h6>
                      </Link>

                      <Link to="dashboard/familygroup" onClick={() => handleLinkClick('familygroup')}>
                        <h6 className={activeLink === 'familygroup' ? 'font-weight-bold' : ''}>Family Group</h6>
                      </Link>

                      <div style={{ marginTop: "1rem" }} className={styles.myprofilelink}>
                        <input id="check01" type="checkbox" name="menu" />
                        <label for="check01" onClick={() => handleLinkClick('My Profile')}><h6 className={activeLink === 'My Profile' ? 'font-weight-bold' : ''}>My Profile</h6></label>
                        <ul class={styles.submenu}>
                          <Link to="userUpdate" onClick={() => handleLinkClick('userUpdate')}>
                            <h6 className={activeLink === 'userUpdate' ? 'font-weight-bold' : ''}>Update Profile</h6>
                          </Link>
                          <Link to="UserSubscriptionPage" onClick={() => handleLinkClick('UserSubscriptionPage')}>
                            <h6 className={activeLink === 'UserSubscriptionPage' ? 'font-weight-bold' : ''}>Subcription</h6>
                          </Link>
                        </ul>
                      </div>

                      <Link to="help" onClick={() => handleLinkClick('help')}>
                        <h6 className={activeLink === 'help' ? 'font-weight-bold' : ''}>Help</h6>
                      </Link>
                    </>
                  }

                </>
              }
              <Link to="" className={styles.logout_text} onClick={handleLogout}><h6>Logout</h6></Link>

            </>
          ) : (
            <>

              <Link to="help" onClick={() => handleLinkClick('help')}>
                <h6 className={activeLink === 'help' ? 'font-weight-bold' : ''}>Help</h6>
              </Link>
            </>
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
