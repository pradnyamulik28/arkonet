import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LeftSide from '../AdminPgs/SideBar/LeftSide';
import Registration from '../AdminPgs/Registration/Registration';
import styles from '../AdminPgs/Adminhome.module.css';
import taxko from '../../Images/taxko_logo.png'
import URegistration from '../ClientPgs/URegistration/URegistration';
import Login from './Login/loginpage'
import Dashboard from "../AdminPgs/DashBoard/DashBoard";
import Uupdate from '../ClientPgs/UUpdate/Uupdate';
import TotalClient from './TotalClients/TotalClient';
import IncomeClient from './IncomeClient/IncomeClient';
import DocFolder from './DocFolder/DocFolder';
import FileUpload from './FileUpload/FileUpload'
import ResetPass from './ResetPass/ResetPass';
import ChangePass from './ChangePass/ChangePass';

const Adminhome = () => {
  return (
    <div>
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
                <Route path="admin/" element={<Login />} />
                <Route path="admin/reg" element={<Registration />} />
                <Route exact path="admin/dashboard" element={<Dashboard />} />
                <Route exact path="admin/clientreg" element={<URegistration />} />
                <Route exact path="admin/Cupdate/:id" element={<Uupdate />} />
                <Route exact path="admin/tc" element={<TotalClient />} />
                <Route exact path="admin/tic" element={<IncomeClient />} />
                <Route exact path="admin/file/:id" element={<DocFolder />} />
                <Route exact path="admin/fileupload/:id/:year" element={<FileUpload />} />

                <Route exact path="admin/forgetpass" element={<ResetPass />} />
                <Route exact path="admin/changepass" element={<ChangePass />} />
              </Routes>



            </div>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default Adminhome;
