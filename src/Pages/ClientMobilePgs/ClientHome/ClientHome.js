import style from "./ClientHome.module.css";
import profile from "../../../Images/profile.png";
import taxco from "../../../Images/Taxko.jpg";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";
import NotificationBell from "../../../components/NotificationBell/NotificationBell";
import AdDisplay from "../../../components/AdDisplay/AdDisplay";
import {AdDetails} from "../../../ObjData/AdDetails";

function ClientHome() {
  const { toggleSidebar,no_of_notifications,handleNotification } = useSidebar();
  
  const storedToken = window.localStorage.getItem("jwtToken");
  const client_id=localStorage.getItem("clientId");

  const [lastFewYearsArray, setLastFewYearsArray] = useState([]);
  const [gstMonthsArray, setGstMonthsArray] = useState([]);
 

  async function getITandGstData() {
    await getITFilestatus();  
    await getGstFilestatus();  
    handleNotification()
  }



  async function getGstFilestatus() {
    const today = new Date();
    const months = [];
  
    for (let i = 0; i < 3; i++) { //====Last 3 months
      let month = today.getMonth() - i;
      let year = today.getFullYear();
  
      if (month < 0) {
        month += 12;
        year -= 1;
      }
  
      const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
      const fullMonthName = `${monthName} ${year}`;
      const isGstr1=i>2?true:false;//=====update after API implementation
      const isGstr3B=i>3?true:false;//=====update after API implementation
      months.push({month:fullMonthName,isGstr1:isGstr1,isGstr3B:isGstr3B});
    }
    setGstMonthsArray(months)
    //return months;
  }

  async function getITFilestatus() {
    const currentYear = new Date().getFullYear();

    const lastFewYears = [];
    for (let i = 0; i < 3; i++) { 
      // Change no. accordingly to get the last five years
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
      
      try {
        
        await fetch(`${url_}/getclientfilednotfiled/${client_id}/${currentYear - i-1}-${(currentYear - i).toString().slice(-2)}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const isfiled=data.filednotfiled==="yes"?true:false;            
            lastFewYears.push({ year: currentYear - i, isfiled: isfiled });
            return isfiled;
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
    setLastFewYearsArray(lastFewYears);
  }

  const navigate =useNavigate();
  function handelLogout(e) {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    //toggleSidebar();
    navigate("/client/", { replace: true });
  }


  useEffect(() => {
    getITandGstData();
  }, []);

  return (
    <div className={`${style.row}`}>
      {/* Background */}

      {/* Mobile Viewport */}
      <div
        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.mobileport}`}
      >
        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          {/* leftear Starts*/}
          <div className={`${style.leftear}`}>
            <Link
              onClick={handelLogout}
              
              style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
            >
              <i className="fa-solid fa-angle-left"></i>
              &nbsp;&nbsp;Home
            </Link>
            
            <NotificationBell onClick={handleNotification} no_of_notifications={no_of_notifications}/>
          </div>
          {/* leftear Ends*/}
          {/* Forehead Starts*/}
          <div className={`${style.forehead}`}>
            <img src={taxco} alt="logo" />
          </div>
          {/* Forehead Ends*/}
          {/* Rightear Starts*/}
          <div className={`${style.rightear}`}>
            <h4><i className="fa-solid fa-ellipsis" onClick={toggleSidebar}></i></h4>
          </div>
          {/* Rightear Ends*/}
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* Ad Starts */}       
        
        <AdDisplay />
        {/* Ad Ends......................................................................................................... */}

        {/* Data Starts */}
        <div className={`${style.data}`}>
          {/* Income tax starts */}
          <div className={`${style.taxdata}`}>
            <div className={`${style.taxhead}`}>
              <p>&bull;</p>
              <h5> Income Tax</h5>
            </div>
            {lastFewYearsArray.map((item, index) => (
              <div className={`${style.taxlist}`} key={index}>                
                <p className={`col-7 ${style.title}`}>
                  AY {item.year - 1}-{item.year.toString().slice(-2)}{" "}
                </p>              
                <p
                  className={
                    item.isfiled
                      ? `col ${style.filed}`
                      : `col ${style.notfiled}`
                  }
                >
                  {item.isfiled ? "Filed" : "Not Filed"}
                </p>              
              </div>
            ))}
          </div>
          {/* Income tax ends */}
          {/* GST starts */}
          <div className={`${style.gstdata}`}>
            <div className={`${style.gsthead}`}>
              <p>&bull;</p>
              <h5> GST</h5>
            </div>
            {/* <div className={`${style.gstist}`}> */}
            {gstMonthsArray.map((item, index) => (
              <div className={`${style.gstist}`} key={index}>
                <p className={`col-7 ${style.title}`}>
                  {item.month}
                </p>

                <p
                  className={
                    item.isGstr1
                      ? `col ${style.filed}`
                      : `col ${style.notfiled}`
                  }
                >
                  {item.isGstr1 ? "Filed" : "Not Filed"}
                </p>
              </div>
            ))}

          </div>
          {/* GST ends */}
        </div>
        {/* Data Ends */}
      </div>
      <h3 className={`${style.vesrion}`}>Version 1.0</h3>
    </div>
  );
}

export default ClientHome;
