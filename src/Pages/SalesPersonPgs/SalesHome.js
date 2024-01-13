import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";


import SalesRegistration from './SalesRegistration/SalesRegistration';
import SalesLogIn from './SalesLogIn/SalesLogIn';
import SaleSideBar from './SaleSideBar/SaleSideBar';
import SalesDash from './SalesDash/SalesDash';
import DistributorRegistration from "../DistributorPgs/DistributorRegistration/DistributorRegistration"
import SaleChangePass from './SaleChangePass/SaleChangePass';
import ManageDistributor from './ManageDistributor/ManageDistributor';
import ViewCA from './ViewCA/ViewCA';
import ViewDistributors from './ViewDistributors/ViewDistributors';

const SalesHome = () => {


  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LogedIn'));

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 1024;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
}, [isMobile]);

  return (
    <div>

      <div className="container-fluid">
        {/* {showIntoro && <IntroPage />}
        {showIntoro ? null : ( */}
        <div className="row">
          <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
            <SaleSideBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </div>

          <div className={isMobile ?`w-100`:`w-75 `}>
            <Routes>
              <Route exact path='' element={<SalesLogIn setLoggedIn={setLoggedIn} />} />

              {/* <Route path="sale_reg" element={<SalesRegistration setLoggedIn={setLoggedIn} />}/> */}
              <Route path="update/sale_reg" element={<SalesRegistration />}/>     

              <Route path="/salesmgm_dash/sale_reg" element={<DistributorRegistration />}/>

              <Route path="/distributor" element={<ManageDistributor />} />
              <Route path="/salesmgm_dash/viewca" element={<ViewCA />} />
              <Route path="/salesmgm_dash/Viewdistributor" element={<ViewDistributors />} />


              <Route path="/salesmgm_dash" element={<SalesDash />} />
              <Route exact path="changepass" element={<SaleChangePass />} />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesHome;
