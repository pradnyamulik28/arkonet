import React, { useState } from 'react';
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
import Protected from '../../Protected';

const Adminhome = () => {


  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LogedIn'));
  //  console.log('admin', loggedIn);


  return (
    <div>
      {/* <Switch> */}

      <div className="container-fluid">
        <div className="row">
          <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
            <LeftSide loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </div>

          <div className={`col-sm-9 col-md-9 col-lg-9 col-xl-9`}>

            <nav className={styles.navclass}>
              <img src={taxko} alt="" />
              <span className={styles.taxko_text}>TAXKO</span>
            </nav>

            <Routes>
              <Route exact path='' element={<Login setLoggedIn={setLoggedIn} />} />
              <Route path="User_registration" element={<Registration />} />
              <Route path="forgetpass" element={<ResetPass />} />
              <Route path="help" element={<Help />} />

              <Route path="dashboard" element={<Protected Cmp={Dashboard} />} />
              <Route path="dashboard/clientreg" element={<Protected Cmp={URegistration} />} />

              <Route path="dashboard/tc" element={<Protected Cmp={TotalClient} />} />
              <Route path="dashboard/tc/clientreg" element={<Protected Cmp={URegistration} />} />
              <Route path="dashboard/tc/Cupdate/:id" element={<Protected Cmp={Uupdate} />} />
              <Route path="dashboard/tc/file/:id" element={<Protected Cmp={DocFolder} />} />
              <Route path="dashboard/tc/file/:id/fileupload/:id/:year" element={<Protected Cmp={FileUpload} />} />

              <Route path="dashboard/tic" element={<IncomeClient />} />
              <Route path="dashboard/tic/clientreg" element={<Protected Cmp={URegistration} />} />
              <Route path="dashboard/tic/Cupdate/:id" element={<Protected Cmp={Uupdate} />} />
              <Route path="dashboard/tic/file/:id" element={<Protected Cmp={DocFolder} />} />
              <Route path="dashboard/tic/file/:id/fileupload/:id/:year" element={<Protected Cmp={FileUpload} />} />

              <Route exact path="changepass" element={<Protected Cmp={ChangePass} />} />
            </Routes>



          </div>
        </div>
      </div>


      {/* </Switch> */}




    </div>
  );
}

export default Adminhome;
