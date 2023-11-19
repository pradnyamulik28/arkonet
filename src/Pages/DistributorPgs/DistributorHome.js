import DistributorRegistration from "./DistributorRegistration/DistributorRegistration";
import { Routes, Route } from "react-router-dom";
import DistributorSideBar from "./DistributorSideBar/DistributorSideBar";
import { useState } from "react";
import DistributorDash from "./DistributorDash/DistributorDash";
import DistributorLogIn from "./DistributorLogIn/DistributorLogIn";
import InvestNowView from './InvestNowView/InvestNowView';
import InvestNowPage from "./InvestNowPage/InvestNowPage";
import DistributorHelp from "./DistributorHelp/DistributorHelp";

function DistributorHome() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("LogedIn"));

  return (
    <div>
      <div className="container-fluid">
       
        <div className="row">
          <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
            <DistributorSideBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </div>

          <div className={`w-75`}>
            <Routes>
              <Route path="" element={<DistributorLogIn setLoggedIn={setLoggedIn}/>} />
              <Route path="distributor_reg" element={<DistributorRegistration />}/>
              <Route path="update/distributor_reg" element={<DistributorRegistration />}/>
              <Route path="/distributor_dash" element={<DistributorDash />} />
              <Route path="/investNow" element={<InvestNowPage />} />
              <Route path="/investNow/investNowview/:category/:title" element={<InvestNowView />} />
              <Route path="/help" element={<DistributorHelp />} />


              {/* <Route path="forgetpass" element={<ResetPass />} /> */}
              {/* <Route path="help/createnewticket" element={<CreateNewTicket />} /> */}
              {/* <Route path="investNow" element={<Protected Cmp={InvestNowPage} />} /> */}
              {/* <Route path="investNow/investNowview/:category/:title" element={<Protected Cmp={InvestNowView} />} /> */}

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DistributorHome;
