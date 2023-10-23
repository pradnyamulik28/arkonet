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
  // const client_id=localStorage.getItem("clientId");

  const client_id_it=localStorage.getItem("client_id_it");//Client ID For IT 
  const client_id_gst=localStorage.getItem("client_id_gst");////Client ID For GST
  const user_id_gst=localStorage.getItem("user_id_gst");

  const [lastFewYearsArray, setLastFewYearsArray] = useState([]);
  const [gstMonthsArray, setGstMonthsArray] = useState([]);
 
  const Navigate=useNavigate();

  async function getITandGstData() {
    client_id_it &&   await getITFilestatus();   
   client_id_gst && await getGstFilestatus();  
    handleNotification();
  }



  async function getGstFilestatus() {

    const year=new Date().getFullYear();
    const month=new Date().getMonth();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let GSTR1_months = [];

await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year}/GSTR-1`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR1_months = JSON.parse(result);
  console.log(GSTR1_months)  
}
).catch(error => console.log('error', error));


if(month<3){await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year-1}/GSTR-1`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR1_months = [...GSTR1_months,...JSON.parse(result)];  
  console.log(GSTR1_months)
}
)
.catch(error => console.log('error', error));}




let GSTR3B_months=[];
await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year}/GSTR3B`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR3B_months = JSON.parse(result);  
  console.log(GSTR1_months)
}
).catch(error => console.log('error', error));



if(month<3){await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year-1}/GSTR3B`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR3B_months = [...GSTR3B_months,...JSON.parse(result)];  
}
)
.catch(error => console.log('error', error));}

  



///////////   Last  3  Months   /////////////////////


    const today = new Date();
  const MonthStatus=[];
    for (let i = 0; i < 3; i++) { //====Last 3 months
      let month = today.getMonth() - i;
      let year = today.getFullYear();
  
      if (month < 0) {
        month += 12;
        year -= 1;
      }      
      const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
      // console.log(monthName);
      const fullMonthName = `${monthName} ${year}`;

      
    const index = GSTR1_months.findIndex((item) => item.month.includes(monthName)&&item.month.includes(year));
    
    if (index !== -1) {
      const isGstr1=GSTR1_months[index].filednotfiled==="yes" && GSTR3B_months[index].filednotfiled==="yes"
      ?true:false;//=====update after API implementation
      const isGstr3B=GSTR3B_months[index].filednotfiled==="no"?true:false;//=====update after API implementation
      MonthStatus.push({month:fullMonthName,isGstr1:isGstr1,isGstr3B:isGstr3B});
    }}
    setGstMonthsArray(MonthStatus)
    return MonthStatus;
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
        
        await fetch(`${url_}/getclientfilednotfiled/${client_id_it}/${currentYear - i}-${(currentYear - i+1).toString().slice(-2)}`, requestOptions)
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


  // console.log(gstMonthsArray)

  const navigate =useNavigate();
  function handelLogout(e) {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    //toggleSidebar();
    navigate("/client/", { replace: true });
  }

  
function deletFilePop(){// Get the current date
  const currentDate = new Date();
  
  // Set the target date to March 16th
  const targetDate = new Date(currentDate.getFullYear(), 2, 16);
  
  // Calculate the time difference in milliseconds
  const timeDifference = targetDate - currentDate;
  
  // Check if it's 15 days or more before March 31st
  if (timeDifference >= 0) {
      console.log("It is 15 days or more before March 31st.");
  } else {
      console.log("It is less than 15 days before March 31st.");
  }
  }
  useEffect(() => {
    getITandGstData();
  }, [toggleSidebar]);

  useEffect(()=>{
    // deletFilePop();
  },[])

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
           
              
              &nbsp;&nbsp;<b>Home    </b>        
              &nbsp;&nbsp;
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
          {client_id_it &&<div className={`${style.taxdata}`}>
            <div className={`${style.taxhead}`}>
              <p>&bull;</p>
              <h5 className={`${style.h51}`}> Income Tax</h5>
            </div>
            {lastFewYearsArray.map((item, index) => (
              <div className={`${style.taxlist}`} key={index}>                
                <p className={`col-7 ${style.title}`}>
                  
                  AY {item.year}-{(item.year+1).toString().slice(-2)}{" "}
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
          </div>}
          {/* Income tax ends */}




          {/* GST starts */}
          {client_id_gst &&<div className={`${style.gstdata}`}>
            <div className={`${style.gsthead}`}>
              <p>&bull;</p>
              <h5 className={`${style.h51}`}  onClick={(e)=>{e.preventDefault();
                    Navigate("gstdashboard");
              }}> GST</h5>
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
          </div>}
          {/* GST ends */}
        </div>
        {/* Data Ends */}
      </div>
      <h3 className={`${style.vesrion}`}>Version 1.0</h3>
    </div>
  );
}

export default ClientHome;
