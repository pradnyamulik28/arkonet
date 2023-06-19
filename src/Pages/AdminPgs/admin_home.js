import React, { useState } from 'react';
import LeftSide from '../AdminPgs/SideBar/LeftSide';
// import Registration from '../../AdminPgs/Registration/Registration';
import styles from './admin_home.module.css';
import taxko from '../../Images/taxko_logo.png'
import URegistration from '../UserPgs/URegistration/URegistration';
const Admin_home_page = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
                        <LeftSide />
                    </div>
                    <div className={`col-sm-9 col-md-9 col-lg-9 col-xl-9`}>
                        <>
                            <nav className={styles.navclass}>
                                <img src={taxko} alt="" />
                                <span className={styles.taxko_text}>TAXKO</span>
                            </nav>
                            {/* <Registration /> */}
                            <URegistration />
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_home_page