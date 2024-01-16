import React, { useEffect, useState } from 'react';

import styles from './MasterSideBar.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';

const MasterSideBar = ({ loggedIn, setLoggedIn }) => {
    const Navigate = useNavigate();

    useEffect(() => {        
        if (localStorage.length > 0) {
          setLoggedIn(JSON.parse(localStorage.getItem("LogedIn")));            
        }        
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        Navigate("/masteradmin")
    };


    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (pglink) => {
        setActiveLink(pglink);
      switch (pglink) {
        case "dashboard":
        //   
          Navigate("admindashboard");
          
          break;
        case "searchadmin":
          Navigate("searchadmin", {
            state: {
              userProfession: "All",
            },
          });          
          
          break;

        case "clientview":
          Navigate(pglink, {
            state: {
              ClientCategory: "All",
            },
          });
          
          

          break;
        case "subPackDetails":
          Navigate(pglink);

          
          

          break;
        case "distributor":
          Navigate("distributor", {
            state: {
              userProfession: "Distributor List",
            },
          });
          
          break;

        case "distriPayments":
          Navigate("distriPayments", {
            state: {
              userProfession: "Distributor List",
            },
          });
          
          break;

        case "addsalesManager":
          Navigate("addsalesManager");
          
          break;

        case "setmanagertarget":
          Navigate("salemgmlist", {
            state: {
              userProfession: "Sale Manager Target",
            },
          });
          
          break;

        case "salePayments":
          Navigate("salePayments", {
            state: {
              userProfession: "Sale Manager's Payment",
            },
          });
          
          break;
          case "changepass":
            Navigate("changepass");
          

            break;
        default:
          
      }
    };

    return (
        <>
        <div className={`${styles.sidebar}`}>
            <div className={`d-flex flex-column justify-content-evenly ${styles.navbar}  `}>
                <Link to={"dashboard"}>
                    <img className={styles.taxo_logo} src={Applogo} alt="" />
                </Link>
                {loggedIn ? (
                    <div >

                        <Link to="/masteradmin/admindashboard/" onClick={() => handleLinkClick('dashboard')}>
                            <h6 className={activeLink === 'dashboard' ? 'font-weight-bold mt-4' : 'mt-4'}>Dashboard</h6>
                        </Link>

                        <div onClick={() => handleLinkClick('searchadmin')}>
                            <h6 className={activeLink === 'searchadmin' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>CA</h6>
                        </div>

                        <div onClick={() => handleLinkClick('clientview')}>
                            <h6 className={activeLink === 'clientview' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Clients</h6>
                        </div>

                        <div onClick={() => handleLinkClick('addsalesManager')}>
                            <h6 className={activeLink === 'addsalesManager' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Add Sales Manager</h6>
                        </div>

                        <div onClick={() => handleLinkClick('subPackDetails')}>
                            <h6 className={activeLink === 'subPackDetails' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Subsriptions</h6>
                        </div>

                        <div onClick={() => handleLinkClick('distributor')}>
                            <h6 className={activeLink === 'distributor' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Distributors</h6>
                        </div>

                        <div onClick={() => handleLinkClick('setmanagertarget')}>
                            <h6 className={activeLink === 'setmanagertarget' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Sale Manager</h6>
                        </div>

                        <div onClick={() => handleLinkClick('distriPayments')}>
                            <h6 className={activeLink === 'distriPayments' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Distributors Payment</h6>
                        </div>

                        <div onClick={() => handleLinkClick('salePayments')}>
                            <h6 className={activeLink === 'salePayments' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Sale Manager Payment</h6>
                        </div>

                        <Link to="changepass" onClick={() => handleLinkClick('changepass')}>
                        <h6 className={activeLink === 'changepass' ? 'font-weight-bold mt-4' : 'mt-4'}>Change Password</h6>
                        </Link>
                        <div className='mt-4'>

                            <Link to="" className={`${styles.logout_text} mt-4`} onClick={handleLogout}><h6>Logout</h6></Link>
                        </div>

                    </div>
                ) : (
                    <>


                    </>
                )}
            </div>

            <div className={styles.help}>
                <h6 className={styles.poweredby}>Developed and Manage By</h6>
                <img className={` ${styles.arko_logo}`} alt='logo' src={Cmpylogo} />
                <h6 className={styles.version}>version 1.0</h6>
            </div>            
        </div>
        {loggedIn&&<div class={`${styles.navbarH}`}>
                    <div class={`${styles.containerH} ${styles.navcontainer}`}>
                        <input class={`${styles.checkbox}`} type="checkbox" name="" id="" />
                        <div class={`${styles.hamburgerlines}`}>
                            <small class={`${styles.line} ${styles.line1}`}></small>
                            <small class={`${styles.line} ${styles.line2}`}></small>
                            <small class={`${styles.line} ${styles.line3}`}></small>
                        </div>

                        <div class={`${styles.menuitems}`}>
                            <li onClick={() => handleLinkClick('dashboard')}><span className={activeLink === 'dashboard' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Dashboard</span></li>
                            <li onClick={() => handleLinkClick('searchadmin')}><span className={activeLink === 'searchadmin' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>CA</span></li>
                            <li onClick={() => handleLinkClick('clientview')}><span className={activeLink === 'clientview' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Clients</span></li>
                            <li onClick={() => handleLinkClick('addsalesManager')}><span className={activeLink === 'addsalesManager' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Add Sales Manager</span></li>
                            <li onClick={() => handleLinkClick('subPackDetails')}><span className={activeLink === 'subPackDetails' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Subsriptions</span></li>
                            <li onClick={() => handleLinkClick('distributor')}><span className={activeLink === 'distributor' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Distributors</span></li>
                            <li onClick={() => handleLinkClick('setmanagertarget')}><span className={activeLink === 'setmanagertarget' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Sale Manager</span></li>
                            <li onClick={() => handleLinkClick('distriPayments')}><span className={activeLink === 'distriPayments' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Distributors Payment</span></li>
                            <li onClick={() => handleLinkClick('salePayments')}><span className={activeLink === 'salePayments' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Sale Manager Payment</span></li>
                            <li onClick={() => handleLinkClick('changepass')}><span className={activeLink === 'changepass' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Change Password</span></li>
                            <li className={`${styles.logout_text}`} onClick={handleLogout}><span >Logout</span></li>
                        </div>
                    </div>
                    
                </div >}
        </>
    );
}

export default MasterSideBar;
