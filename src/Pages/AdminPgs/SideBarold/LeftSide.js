import React, { useState, useEffect } from 'react';

import styles from './leftside.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';

const LeftSide = ({ loggedIn, setLoggedIn }) => {
  const subscription_status = localStorage.getItem(`subscription_status`)
  const Category = localStorage.getItem(`Category`)
  const Navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(JSON.parse(localStorage.getItem('LogedIn')));

    if (localStorage.length > 0) {
      // setIsLoggedIn(localStorage.getItem('LogedIn'));
      // setIsLoggedIn(true);
    }
    // console.log('is logged in',isLoggedIn);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    Navigate("/admin")
  };

  const [activeLink, setActiveLink] = useState("Dashboard");
  const [clickedActiveLink, setclickedActiveLink] = useState("Dashboard");


  const handleLinkClick = (pglink) => {

    switch (pglink) {
      case "dashboard":
        setclickedActiveLink("Dashboard")
        break;
      case "myclients":
        setclickedActiveLink("My CLients")
        break;
      case "tallybackup":
        setclickedActiveLink("Tally Backup")
        break;
      case "changepass":
        setclickedActiveLink("Change Pass")
        break;
      case "investNow":
        setclickedActiveLink("Invest Now")
        break;
      case "sublogin":
        setclickedActiveLink("Sub Login")
        break;
      case "leads":
        setclickedActiveLink("Leads")
        break;
      case "userUpdate":
        setclickedActiveLink("Update Profile")
        break;
      case "UserSubscriptionPage":
        setclickedActiveLink("Subcription")
        break;
      case "familygroup":
        setclickedActiveLink("Family Group")
        break;
      case "help":
        setclickedActiveLink("Help")
        break;
      default:

    }
    setActiveLink(pglink);
    switch (pglink) {
      case "dashboard":
        //   
        Navigate("dashboard");

        break;
      case "myclients":
        Navigate("dashboard/tc");

        break;

      case "tallybackup":
        Navigate("tallybackup");
        break;

      case "changepass":
        Navigate("changepass");
        break;

      case "investNow":
        Navigate("investNow");

        break;

      case "sublogin":
        Navigate("dashboard/sublogin");
        break;

      case "leads":
        Navigate("dashboard/leads");

        break;

      case "userUpdate":
        Navigate("userUpdate");

        break;
      case "UserSubscriptionPage":
        Navigate("UserSubscriptionPage");

        break;
      case "notification":
        Navigate("notification");

        break;
      case "help":
        Navigate("help");

        break;
      default:

    }
  };
  return (
    <>
      {/* <div className="container">
        <div className={`${styles.sidebar}`}>
          <div>HI</div>
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
                          <label for="check01" onClick={() => handleLinkClick('My Profile')}><h6 className={activeLink === 'My Profile' ? 'font-weight-bold' : ''}>My Profile</h6>
                          </label>
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
      </div> */}

      <div className={styles.SideBar_Total}>
        <div className={styles.SideBar_Main}>
          {loggedIn &&
            <div className={styles.SideBar_Notification}>
              {/* <span>&lt;</span> */}
              <span><i class="bi bi-arrow-right-short"></i></span>
              <span>{clickedActiveLink}</span>
              <span onClick={() => handleLinkClick('notification')} style={{ cursor: "pointer" }}><i class="bi bi-bell-fill"></i></span>
            </div>
          }
          <div className={styles.SideBar_Main_SideBar}>
            <div className={styles.SideBar_Img_container}>
              <img src={Applogo} alt="TAXKO" />
            </div>
            <div className={styles.SideBar_Menus}>
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
                            <label for="check01" onClick={() => handleLinkClick('My Profile')}><h6 className={activeLink === 'My Profile' ? 'font-weight-bold' : ''}>My Profile</h6>
                            </label>
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
            <div className={styles.SideBar_footer_container}>
              <h6 >Developed and Manage By</h6>
              <img alt='logo' src={Cmpylogo} />
              <h6 >version 1.0</h6>
            </div>
          </div>
        </div>
      </div>

      {loggedIn &&

        <>

          {true && <div class={`${styles.navbarH}`}>
            <div class={`${styles.containerH} ${styles.navcontainer}`}>
              <input class={`${styles.checkbox}`} type="checkbox" name="" id="" />
              <div class={`${styles.hamburgerlines}`}>
                <small class={`${styles.line} ${styles.line1}`}></small>
                <small class={`${styles.line} ${styles.line2}`}></small>
                <small class={`${styles.line} ${styles.line3}`}></small>
              </div>
              <div className={styles.MobileView_bell} onClick={() => handleLinkClick('notification')} style={{ cursor: "pointer" }}>
                <i class="bi bi-bell-fill"></i>
              </div>
              <div class={`${styles.menuitems}`}>

                <li onClick={() => handleLinkClick('dashboard')}><span className={activeLink === 'dashboard' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Dashboard</span></li>
                <li onClick={() => handleLinkClick('myclients')}><span className={activeLink === 'myclients' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>My Clients</span></li>
                <li onClick={() => handleLinkClick('tallybackup')}><span className={activeLink === 'tallybackup' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Tally Backup</span></li>
                <li onClick={() => handleLinkClick('changepass')}><span className={activeLink === 'changepass' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Change Password</span></li>
                <li onClick={() => handleLinkClick('investNow')}><span className={activeLink === 'investNow' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Invest Now</span></li>
                <li onClick={() => handleLinkClick('sublogin')}><span className={activeLink === 'sublogin' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Sub Login</span></li>
                <li onClick={() => handleLinkClick('leads')}><span className={activeLink === 'leads' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Leads</span></li>
                <li onClick={() => handleLinkClick('familygroup')}><span className={activeLink === 'familygroup' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Family Group</span></li>
                {/* <li onClick={() => handleLinkClick('My Profile')}><span className={activeLink === 'My Profile' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>My Profile</span></li> */}
                <li onClick={() => handleLinkClick('userUpdate')}><span className={activeLink === 'userUpdate' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Update Profile</span></li>
                <li onClick={() => handleLinkClick('UserSubscriptionPage')}><span className={activeLink === 'UserSubscriptionPage' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Subcription</span></li>
                <li onClick={() => handleLinkClick('help')}><span className={activeLink === 'help' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Help</span></li>
                <li className={`${styles.logout_text}`} onClick={handleLogout}><span >Logout</span></li>


              </div>
            </div>

          </div >}
        </>

      }
    </>
  );
}

export default LeftSide;
