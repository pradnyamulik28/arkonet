import React from 'react';
import {
  // BrowserRouter as Switch,
  Routes,
  Route
} from "react-router-dom";
import LeftSide from './SideBarold/LeftSide';
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
import Help from './Help/Help';

const Adminhome = () => {
  return (
    <div>
      {/* <Switch> */}

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
              <Route exact path='' element={<Login />} />
              <Route path="User_registration" element={<Registration />} />
              <Route path="forgetpass" element={<ResetPass />} />
              <Route path="help" element={<Help />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/clientreg" element={<URegistration />} />

              <Route path="dashboard/tc" element={<TotalClient />} />
              <Route path="dashboard/tc/clientreg" element={<URegistration />} />
              <Route path="dashboard/tc/Cupdate/:id" element={<Uupdate />} />
              <Route path="dashboard/tc/file/:id" element={<DocFolder />} />
              <Route path="dashboard/tc/file/:id/fileupload/:id/:year" element={<FileUpload />} />

              <Route path="dashboard/tic" element={<IncomeClient />} />
              <Route path="dashboard/tic/clientreg" element={<URegistration />} />
              <Route path="dashboard/tic/Cupdate/:id" element={<Uupdate />} />
              <Route path="dashboard/tic/file/:id" element={<DocFolder />} />
              <Route path="dashboard/tic/file/:id/fileupload/:id/:year" element={<FileUpload />} />

              <Route exact path="changepass" element={<ChangePass />} />
            </Routes>



          </div>
        </div>
      </div>


      {/* </Switch> */}




    </div>
  );
}

export default Adminhome;
