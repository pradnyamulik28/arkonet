import React, { useEffect, useState } from "react";
import style from "./ClientDashboard.module.css";
import taxcoimg from "../../../Images/taxko_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";
function ClientDashboard() {
  const { toggleSidebar } = useSidebar();

  const storedToken = window.localStorage.getItem("jwtToken");

  const [lastFewYearsArray, setLastFewYearsArray] = useState([]);

  async function getLastFewYears() {
    await getFilestatus();
  }

  async function getFilestatus() {
    const currentYear = new Date().getFullYear();

    const lastFewYears = [];
    for (let i = 0; i < 3; i++) {
      // Change no. accordingly to get the last five years
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        clientid: localStorage.getItem("client_id"),
        accountyear: `${currentYear - i - 1}-${(currentYear - i)
          .toString()
          .slice(-2)}`,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        await fetch(`${url_}/client/files`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const isfiled = data.length > 0 ? true : false;
            lastFewYears.push({ year: currentYear - i, isfiled: isfiled });
            console.log("len", isfiled);
            return isfiled;
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
    setLastFewYearsArray(lastFewYears);
  }

  useEffect(() => {
    getLastFewYears();
  }, []);

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
                
                &lt; &nbsp;&nbsp;Dashboard
              </Link>
            </div>
            <h3>TAXCO</h3>
            <div className={`${style.rightear}`}>
              <h4 onClick={toggleSidebar}>
                <i className="fa-solid fa-ellipsis"></i>
              </h4>
            </div>
          </div>
          {/* Headbar Ends ....................................................................................................... */}

          {/* TAXCO iCON Starts*/}
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.profileport}`}
          >
            <div className={`${style.card}`}>
              <img className={style.img} src={taxcoimg} alt="profile_picture" />            
            </div>
          </div>
          {/*TAXCO iCON END......................................................................................................... */}
          <div className={`${style.incomtaxtitle}`}>
            <h4>&bull; Income Tax</h4>
          </div>
          {lastFewYearsArray.map((item, index) => (
            <div className="row" key={index}>
              <div key={index} className="col">
                <h5>
                  AY {item.year - 1}-{item.year.toString().slice(-2)}{" "}
                </h5>
              </div>
              <div key={index} className="col">
                <h5
                  className={
                    item.isfiled ? `${style.filed}` : `${style.notfiled}`
                  }
                >
                  {item.isfiled ? "Filed" : "Not Filed"}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
