import React, { useState, useEffect } from "react";
import style from "./CAProfile.module.css";
import profile from "../../../Images/profile.png";
import { Link } from "react-router-dom";
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";
import NotificationBell from "../../../components/NotificationBell/NotificationBell";
import QRCode from "qrcode.react";
function CAProfile() {
  useEffect(() => {
    getCaInfo();
  }, []);

  const { toggleSidebar,no_of_notifications,handleNotification } = useSidebar();
  const [userData, setUserData] = useState(null);
  const storedToken = window.localStorage.getItem("jwtToken");
  const user_id=localStorage.getItem("userid");
  const [qrCodeVisibility,setQrCodeVisibility]=useState(false)
  
  async function getCaInfo() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${url_}/getuserByid/${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setUserData(result);
      })
      .catch((error) => console.log("error", error));
  }

  async function handlePayment(){
    setQrCodeVisibility(true)
  }

 

  return (
    <>
      <div className={`${style.row}`}>
        {/* Background */}

        {/* Mobile Viewport */}
        <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.mobileport}`}
        >
          {/* Headbar Starts*/}
          <div className={`${style.headerbar}`}>
            <div className={`${style.leftear}`}>
              <Link
                to="/client/clientpasscheck/clienthome"
                
                style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
              >
               <i className="fa-solid fa-angle-left"></i> &nbsp;&nbsp;My CA
              </Link>
              <NotificationBell onClick={handleNotification} no_of_notifications={no_of_notifications}/>
            </div>
            <div className={`${style.rightear}`}>
              <h4 onClick={toggleSidebar}>
                <i className="fa-solid fa-ellipsis"></i>
              </h4>
            </div>
          </div>
          {/* Headbar Ends ....................................................................................................... */}


{userData &&
    <>    
          {/* Profile Starts*/}
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.profileport}`}
          >
            <div className={`${style.card}`}>
              <img src={profile} alt="profile_picture" />
              <div className={`${style.cardbody}`}>
                <h5 className="card-title">{userData.name}</h5>
                <p className="card-text">{userData.profession}</p>
              </div>
            </div>
          </div>
          {/* Profile Ends......................................................................................................... */}

          <div className={`${style.data}`}>
            {/* Adress Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Addressport}`}
            >
              <h5>Address</h5>
              <p>
                {userData.office_Address}
              </p>
            </div>
            {/* Adress Ends......................................................................................................... */}

            {/* Telephone Starts */}
            {userData.telephone && <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Telephoneport}`}
            >
              <h5>Telephone</h5>
              <p> {userData.telephone}</p>
            </div>}
            {/* Telephone Ends......................................................................................................... */}

            {/* Mobile Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Mobileport}`}
            >
              <h5>Mobile</h5>
              <p> {userData.mobile}</p>
            </div>
            {/* Mobile Ends......................................................................................................... */}

            {/* Email Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Emailport}`}
            >
              <h5>Email</h5>
              <a
                href="##"
                style={{
                  color: "black",
                  textDecoration: "Underline",
                  fontWeight: "500",
                }}
              >
                {userData.email}
              </a>
            </div>
            {/* Email Ends......................................................................................................... */}

            {/* WhatsApp Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.WhatsAppport}`}
            >
              <h5>WhatsApp Link</h5>
              <a href="##"> {userData.whatsApp_Link}</a>
            </div>
            {/* WhatsApp Ends......................................................................................................... */}

            {/* Button Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Buttonport}`}
            >{qrCodeVisibility&&<QRCode value={userData.whatsApp_Link}  />}</div>
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Buttonport}`}
            >
              
              
              <button type="button" onClick={handlePayment}>PAY NOW</button>
            </div>
            {/* Button Ends......................................................................................................... */}
          </div>
          </>
          }
        </div>
      </div>
    </>
  );
}

export default CAProfile;
