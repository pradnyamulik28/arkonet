import React, { useState, useEffect } from 'react';
import {
  // BrowserRouter as Switch,
  Routes,
  Route
} from "react-router-dom";
import IntroPage from './IntroPage/IntroPage';
import MasterLogIn from './MasterLogIn/MasterLogIn';
import AdminDetails from './AdminDetails/AdminDetails';
import SearchAdmin from './SearchAdmin/SearchAdmin';
// import SideBar from './MasterSideBar/MasterSideBar';
import MasterSideBar from './MasterSideBar/MasterSideBar';
import MasterClientView from './MasterClientView/MasterClientView';
import RefUserview from './RefUserview/RefUserview';
import UserSubscriptionPlan from './UserSubscriptionPlan/UserSubscriptionPlan'
import UserData from './UserData/UserData';
import UserList from './UsersList/UserList';

const MasterAdmin = () => {
  // const [showIntoro, setShowIntoro] = useState(true);
  // // const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowIntoro(false);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LogedIn'));


  return (
    <div>

      <div className="container-fluid">
        {/* {showIntoro && <IntroPage />}
        {showIntoro ? null : ( */}
        <div className="row">
          <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
            <MasterSideBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </div>

          <div className={`w-75`}>


            <Routes>

              <Route exact path='' element={<MasterLogIn />} />
              {/* <Route exact path='intropage' element={<IntroPage />} /> */}

              <Route exact path='admindashboard' element={<AdminDetails />} />
              <Route exact path='searchadmin' element={<SearchAdmin />} />
              <Route exact path='/searchadmin/refUser' element={<RefUserview />} />
              <Route exact path='clientview' element={<MasterClientView />} />

              <Route exact path='admindashboard/searchadmin' element={<SearchAdmin />} />
              <Route exact path='admindashboard/searchadmin/Userdata' element={<UserData />} />
              <Route exact path='admindashboard/searchadmin/Userdata/userSubPlan' element={<UserSubscriptionPlan />} />
              <Route exact path='admindashboard/searchadmin/refUser' element={<RefUserview />} />

              <Route exact path='admindashboard/userlist' element={<UserList />} />

              <Route exact path='admindashboard/clientview' element={<MasterClientView />} />
              {/* <Route exact path='sidebar' element={<SideBar />} /> */}


            </Routes>


          </div>
        </div>
        {/* )} */}
      </div>


      {/* </Switch> */}




    </div>
  );
}

export default MasterAdmin;
