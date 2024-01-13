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
import ManageSubscription from './ManageSubscriptionPack/ManageSubscriptionPack';
import ManageDistributor from './ManageDistributor/ManageDistributor';
import DistributorData from './DistributorData/DistributorData';
import DistributorsPayment from './DistributorsPayment/DistributorsPayment';
import MasterChangePass from "./MasterChangePass/MasterChangePass"
import SalesRegistration from '../SalesPersonPgs/SalesRegistration/SalesRegistration';
import DistibutorList from './DistibutorList/DistributorList';
import SalesManagersList from './SalesManagersList/SalesManagersList';
import SalesDash from '../SalesPersonPgs/SalesDash/SalesDash';
import DeactiveSaleMgmList from './DeactiveSaleMgmList/DeactiveSaleMgmList';
import SaleManagerPayment from './SaleManagerPayment/SaleManagerPayment';
// import ChatBot from '../../components/ChatBot/ChatBot';
// import WhatsappChat from '../../components/WhatsappChat';

const MasterAdmin = () => {


  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LogedIn'));
  //  console.log('admin', loggedIn);


  return (
    <div>

      <div className="container-fluid">
        {/* {showIntoro && <IntroPage />}
        {showIntoro ? null : ( */}
        <div className="row">
          <div className={`col-sm-3 col-md-3 col-lg-3 col-xl-3`}>
            <MasterSideBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}  />
          </div>

          <div className={`w-75`}>


            <Routes>

              <Route exact path='' element={<MasterLogIn setLoggedIn={setLoggedIn}  />} />
              {/* <Route exact path='intropage' element={<IntroPage />} /> */}

              <Route exact path='admindashboard' element={<AdminDetails />} />
              <Route exact path='searchadmin' element={<SearchAdmin />} />
              <Route exact path='searchadmin/Userdata' element={<UserData />} />
              <Route exact path='searchadmin/refUser' element={<RefUserview />} />
              <Route exact path='searchadmin/Userdata/userSubPlan' element={<UserSubscriptionPlan />} />
              <Route exact path='clientview' element={<MasterClientView />} />

              <Route exact path='admindashboard/searchadmin' element={<SearchAdmin />} />
              <Route exact path='admindashboard/searchadmin/Userdata' element={<UserData />} />
              <Route exact path='admindashboard/searchadmin/Userdata/userSubPlan' element={<UserSubscriptionPlan />} />
              <Route exact path='admindashboard/searchadmin/refUser' element={<RefUserview />} />

              <Route exact path='admindashboard/userlist' element={<UserList />} />
              <Route exact path='admindashboard/userlist/Userdata' element={<UserData />} />
              <Route exact path='admindashboard/userlist/Userdata/userSubPlan' element={<UserSubscriptionPlan />} />

              <Route exact path='admindashboard/clientview' element={<MasterClientView />} />

              <Route exact path='addsalesManager' element={<SalesRegistration />} />              
              <Route exact path='admindashboard/salemgmlist' element={<SalesManagersList />} />
              <Route exact path='salemgmlist' element={<SalesManagersList />} />

              <Route exact path='salemgmlist/saledash' element={<SalesDash />} />
              <Route exact path='admindashboard/salemgmlist/saledash' element={<SalesDash />} />
              <Route exact path='deactivesalemgm' element={<DeactiveSaleMgmList />} />
              <Route exact path='salePayments' element={<SaleManagerPayment />} />


              <Route exact path='admindashboard/distributorlist' element={<DistibutorList />} />
              <Route exact path='admindashboard/distributorlist/distributordata' element={<DistributorData />} />


              <Route exact path='subPackDetails' element={<ManageSubscription />} />
              <Route exact path='userlist' element={<UserList />} />
              <Route exact path='distributor' element={<ManageDistributor />} />
              <Route exact path='distriPayments' element={<DistributorsPayment />} />
              {/* <Route exact path='sidebar' element={<SideBar />} /> */}
              <Route exact path="changepass" element={<MasterChangePass />} />


            </Routes>
            {/* <WhatsappChat/> */}


          </div>
        </div>
        {/* )} */}
      </div>


      {/* </Switch> */}




    </div>
  );
}

export default MasterAdmin;
