import React, { useEffect, useState } from 'react';

import styles from './MasterSideBar.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';

const MasterSideBar = ({ loggedIn, setLoggedIn }) => {
    const Navigate = useNavigate();

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

    const handleLinkClick = (pglink) => {
        if (pglink === "searchadmin") {
            Navigate("searchadmin", {
                state: {
                    userProfession: "AllUser"
                },
            })
            console.log(pglink)
            setActiveLink(pglink);

        } else if (pglink === "clientview") {
            Navigate(pglink, {
                state: {
                    ClientCategory: "AllClients"
                },
            })
            setActiveLink(pglink);
            console.log(pglink,)

        } else {

            console.log(pglink,)
            setActiveLink(pglink);
        }
    };

    return (
        // <div className="container">
        <div className={`${styles.sidebar}`}>
            <div className={`d-flex flex-column justify-content-evenly ${styles.navbar}  `}>
                <Link to={"dashboard"}>
                    <img className={styles.taxo_logo} src={Applogo} alt="" />
                </Link>
                {loggedIn ? (
                    <>

                        <Link to="/masteradmin/admindashboard/" onClick={() => handleLinkClick('dashboard')}>
                            <h6 className={activeLink === 'dashboard' ? 'font-weight-bold' : ''}>Dashboard</h6>
                        </Link>

                        <div onClick={() => handleLinkClick('searchadmin')}>
                            <h6 className={activeLink === 'searchadmin' ? 'font-weight-bold' : ''}>Admins</h6>
                        </div>

                        <div onClick={() => handleLinkClick('clientview')}>
                            <h6 className={activeLink === 'clientview' ? 'font-weight-bold' : ''}>Clients</h6>
                        </div>

                        {/* <Link to="/masteradmin/admindashboard/" onClick={() => handleLinkClick('dashboard')}>
                            <h6 className={activeLink === 'dashboard' ? 'font-weight-bold' : ''}>Invest Now</h6>
                        </Link>

                        <Link to="/masteradmin/admindashboard/" onClick={() => handleLinkClick('dashboard')}>
                            <h6 className={activeLink === 'dashboard' ? 'font-weight-bold' : ''}>Service Requests</h6>
                        </Link> */}






                        <Link to="" className={styles.logout_text} onClick={handleLogout}><h6>Logout</h6></Link>

                    </>
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
        // </div>
    );
}

export default MasterSideBar;
