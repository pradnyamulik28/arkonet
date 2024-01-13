import React, { useEffect, useState } from 'react';

import styles from './SaleSideBar.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SaleSideBar = ({ loggedIn, setLoggedIn }) => {
    const Navigate = useNavigate();
  const sales_pan=localStorage.getItem("pan");    
  const salesmanager_id = localStorage.getItem("salesmanager_id");



    useEffect(() => {
      
        if (localStorage.length > 0) {
            
        }
        
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        Navigate("/sales")
    };


    const [activeLink, setActiveLink] = useState(null);
useEffect(()=>{

},[activeLink])
    const handleLinkClick = (pglink) => {


        switch (pglink) {
          case "dashboard":
            console.log(pglink)
            Navigate("salesmgm_dash");
            setActiveLink("dashboard");
            break;

          case "profile":
            Navigate("update/sale_reg");
            setActiveLink("profile");
            break;

          case "help":
            setActiveLink("help");
            Navigate("/sales/help");
            break;

          case "salesmgm_dash/viewca":
            Navigate("salesmgm_dash/viewca", {
              state: {
                userProfession: "All C.A",
              },
            });
            
            setActiveLink(pglink);
            break;

          case "clientview":
            Navigate(pglink, {
              state: {
                ClientCategory: "All",
              },
            });
            setActiveLink(pglink);
            break;

          case "subPackDetails":
            Navigate(pglink);
            setActiveLink(pglink);
            break;

          case "distributor":
            Navigate("distributor", {
              state: {
                userProfession: "Distributor List",
              },
            });
            setActiveLink(pglink);
            break;

          case "distriPayments":
            Navigate("distriPayments", {
              state: {
                userProfession: "Distributor List",
              },
            });
            setActiveLink(pglink);
            break;


            case "changepass":
            Navigate("changepass");
            setActiveLink(pglink);
            break;


            case "distributorrefferallink":
                setActiveLink("distributorrefferallink");

                // const refferalLink=`http://localhost:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
                const refferalLink = `http://taxko.in/distributor/refferal/reg/${parseInt(new Date().getTime() / 1000)}_${sales_pan}_${salesmanager_id}`;
                const copy = require('clipboard-copy')
                copy(refferalLink);

                Swal.fire('Registration link has been copied to clipboard');

                break;
                case "refferallink":
                  setActiveLink("refferallink");
  
                  // const refferalLink=`http://localhost:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
                  const CArefferalLink = `http://taxko.in/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${sales_pan}`;
                  const CAcopy = require('clipboard-copy')
                  CAcopy(CArefferalLink);
  
                  Swal.fire('Refferal link has been copied to clipboard');
  
                  break;
          default:
            break;
        }
        
    };

    return (

      <>
        <div className={`${styles.sidebar}`}>
            <div className={`d-flex flex-column justify-content-evenly ${styles.navbar}  `}>
                <Link to={"/"}>
                    <img className={styles.taxo_logo} src={Applogo} alt="" />
                </Link>
                {loggedIn ? (
                    <div >

                        <Link  to="salesmgm_dash" onClick={() => handleLinkClick('dashboard')}>
                            <h6 className={activeLink === 'dashboard' ? 'font-weight-bold mt-4' : 'mt-4'}>Dashboard</h6>
                        </Link>

                        <div onClick={() => handleLinkClick('profile')}>
                            <h6 className={activeLink === 'profile' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Profile</h6>
                        </div>

                        

                        <div onClick={() => handleLinkClick('distributor')}>
                            <h6 className={activeLink === 'distributor' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Distributors</h6>
                        </div>

                       
                        <div onClick={() => handleLinkClick('distributorrefferallink')}>
                                <h6 className={activeLink === 'distributorrefferallink' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Distributor Registration Link</h6>
                            </div>

                            <div onClick={() => handleLinkClick('refferallink')}>
                                <h6 className={activeLink === 'refferallink' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>CA Registration Link</h6>
                            </div>

                            <div onClick={() => handleLinkClick('changepass')}>
                                <h6 className={activeLink === 'changepass' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Change Password</h6>
                            </div>

                            

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
                            <li onClick={() => handleLinkClick('profile')}><span className={activeLink === 'profile' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Profile</span></li>
                            <li onClick={() => handleLinkClick('distributor')}><span className={activeLink === 'distributor' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Manage Distributors</span></li>
                            <li onClick={() => handleLinkClick('distributorrefferallink')}><span className={activeLink === 'distributorrefferallink' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Distributor Registration Link</span></li>
                            <li onClick={() => handleLinkClick('refferallink')}><span className={activeLink === 'refferallink' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >CA Registration Link</span></li>
                            <li onClick={() => handleLinkClick('changepass')}><span className={activeLink === 'investnow' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Change Password</span></li>
                            <li className={`${styles.logout_text}`} onClick={handleLogout}><span >Logout</span></li>


                        </div>
                    </div>
                    
                </div >}
</>



        
    );
}

export default SaleSideBar;
