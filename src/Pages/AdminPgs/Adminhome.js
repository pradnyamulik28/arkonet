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
// import Cards from "../../components/Cards/Cards";
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
                <Route path="/" element={<Login />} />
                <Route path="/reg" element={<Registration />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/clientreg" element={<URegistration />} />
                <Route exact path="/Cupdate/:id" element={<Uupdate />} />
                <Route exact path="/tc" element={<TotalClient />} />
                <Route exact path="/tic" element={<IncomeClient />} />
                <Route exact path="/file/:id" element={<DocFolder />} />
                <Route exact path="/fileupload/:id/:year" element={<FileUpload />} />
                <Route exact path="/forgetpass" element={<ResetPass />} />
                <Route exact path="/changepass" element={<ChangePass />} />
              </Routes>



            </div>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default Adminhome;
