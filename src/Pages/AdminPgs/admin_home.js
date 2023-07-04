import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import LeftSide from '../AdminPgs/SideBar/LeftSide';
import Registration from '../AdminPgs/Registration/Registration';
import styles from '../AdminPgs/admin_home.module.css';
import taxko from '../../Images/taxko_logo.png'
import URegistration from '../UserPgs/URegistration/URegistration';
import Login from '../AdminPgs/Login/loginpage'
// import UDashboard from '../UserPgs/UDashboard/UDashboard';
import Cards from "../../components/Cards/Cards";
const Admin_home_page = () => {
    return (

        <Router>

            <div className="container-fluid">
                <div className="row">
                    <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
                        <LeftSide />
                    </div>
                    <div className={`col-sm-9 col-md-9 col-lg-9 col-xl-9`}>

                        <nav className={styles.navclass}>
                            <img src={taxko} alt="" />
                            <span className={styles.taxko_text}>TAXKO</span>
                        </nav>

                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Registration />} />
                            <Route exact path="/dashboard" element={<Cards />} />
                            <Route exact path="/creatclient" element={<URegistration />} />

                            {/* Route path="/" element={<Layout />}> */}
                        </Routes>


                    </div>
                </div>
            </div>

        </Router>

    );
}

export default Admin_home_page


