import React, { useState, useEffect } from "react";
import style from "./CAProfile.module.css";
import profile from "../../../Images/profile.png";
import { Link } from "react-router-dom";
import { useSidebar } from "../ClientSideBar/SidebarContext";
function CAProfile() {
  useEffect(() => {
    console.log("calling..");
    getCaInfo();
  }, []);

  const { toggleSidebar } = useSidebar();

  const [userData, setUserData] = useState(null);

  async function getCaInfo() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: "PAVAN1999J",
      password: "p12345",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://43.204.29.108:8085/authenticate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("user data", result);
        setUserData(result);
      })
      .catch((error) => console.log("error", error));
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
                to="/client/clientpasscheck/clientdocfolder"
                state={{ clientid: localStorage.getItem("clientId") }}
                style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
              >
                &lt; &nbsp;&nbsp;My CA
              </Link>
              <i
                className={`fa-regular fa-bell fa-bell-large`}
                style={{ fontSize: "1.5rem" }}
              ></i>
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
                <h5 class="card-title">{userData.user.name}</h5>
                <p class="card-text">{userData.user.profession}</p>
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
                {userData.user.office_Address}
              </p>
            </div>
            {/* Adress Ends......................................................................................................... */}

            {/* Telephone Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Telephoneport}`}
            >
              <h5>Telephone</h5>
              <p> {userData.user.telephone}</p>
            </div>
            {/* Telephone Ends......................................................................................................... */}

            {/* Mobile Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Mobileport}`}
            >
              <h5>Mobile</h5>
              <p> {userData.user.mobile}</p>
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
                {userData.user.email}
              </a>
            </div>
            {/* Email Ends......................................................................................................... */}

            {/* WhatsApp Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.WhatsAppport}`}
            >
              <h5>WhatsApp Link</h5>
              <a href="##"> {userData.user.whatsApp_Link}</a>
            </div>
            {/* WhatsApp Ends......................................................................................................... */}

            {/* Button Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Buttonport}`}
            >
              <button type="button">PAY NOW</button>
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
