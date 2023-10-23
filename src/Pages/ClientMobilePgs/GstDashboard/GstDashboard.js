import { useEffect, useState } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import style from "./GstDashboard.module.css";
import NotificationBell from "../../../components/NotificationBell/NotificationBell";
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";

function GstDashboard() {
  
  const {no_of_notifications,handleNotification } = useSidebar();
  const Navigate=useNavigate();
  const storedToken = window.localStorage.getItem("jwtToken");

  const client_id_gst=localStorage.getItem("client_id_gst");////Client ID For GST
  const user_id_gst=localStorage.getItem("user_id_gst");

  const [gstMonthsArray, setGstMonthsArray] = useState([]);
  const [lastUpdateDate,setLastUpdateDate]=useState();
  
  async function getGstFilestatus() {

    const year=new Date().getFullYear();
    const month=new Date().getMonth();
    console.log(month)
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
}
)
.catch(error => console.log('error', error));


if(month<5){await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year-1}/GSTR-1`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR1_months = [...GSTR1_months,...JSON.parse(result)];  
  console.log(GSTR1_months)
}
)
.catch(error => console.log('error', error));}

let GSTR3B_months=[];
await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year}/GSTR-3B`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR3B_months = JSON.parse(result);  
}
)
.catch(error => console.log('error', error));
  

if(month<5){await fetch(`${url_}/GST_Statusfilednotfiled/${user_id_gst}/${client_id_gst}/${year-1}/GSTR-3B`, requestOptions)
.then(response => response.text())
.then(result => {//console.log(result)
  GSTR3B_months = [...GSTR3B_months,...JSON.parse(result)];  
}
)
.catch(error => console.log('error', error));}
  



///////////   Last  5  Months   /////////////////////


    const today = new Date();
  const MonthStatus=[];
    for (let i = 0; i < 6; i++) { //====Last 3 months
      let month = today.getMonth() - i;
      let year = today.getFullYear();
  
      if (month < 0) {
        month += 12;
        year -= 1;
      }      
      const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
      //console.log(monthName);
      const fullMonthName = `${monthName} ${year}`;

      
    const index = GSTR1_months.findIndex((item) => item.month.includes(monthName)&&item.month.includes(year));
    
    if (index !== -1) {
      const isGstr1=GSTR1_months[index].filednotfiled==="yes"?true:false;//=====update after API implementation
      const isGstr3B=GSTR3B_months[index].filednotfiled==="yes"?true:false;//=====update after API implementation
      MonthStatus.push({month:fullMonthName,isGstr1:isGstr1,isGstr3B:isGstr3B});
    }}

    setGstMonthsArray(MonthStatus)
    fetchLastUpdateGST();
    return MonthStatus;
  }



  async function fetchLastUpdateGST(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    await fetch(`${url_}/maxLastUpdateDateGSTfilednotfiled/${client_id_gst}`, requestOptions)
      .then(response => response.json())
      .then(result => {       
        const retrivedDate=result.lastUpdateDate.split("-");
        setLastUpdateDate(`${retrivedDate[2]} ${numberToMonth(retrivedDate[1])} ${retrivedDate[0]}`)
      })
      .catch(error => console.log('error', error));
  }



function numberToMonth(number) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (number >= 1 && number <= 12) {
    return months[number - 1];
  } else {
    return "Invalid month number";
  }
}

  useEffect(()=>{
     getGstFilestatus();
  },[])
  
  // const last5Months = getLast5Months();
  
  return (
    <div className={`row ${style.row1}`}>
      {/* Background */}

      {/* Mobile Viewport */}
      <div className={`${style.mobileport}`}>
        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          {/* leftear Starts*/}
          <div className={`${style.leftear}`}>
            <Link
              to="/client/clientpasscheck/clienthome"
              style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
            >
             <i className="fa-solid fa-angle-left"></i> 
            </Link>

            <NotificationBell
              onClick={handleNotification}
              no_of_notifications={no_of_notifications}
            />
          </div>
          {/* leftear Ends*/}
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* GST port Starts */}
        <div className={`${style.gstport}`}>
          {/* Headmarg Starts */}
          <div className={`${style.headmarg}`}>
            <h3 className={`${style.headmarg}`}>GST</h3>
            <h3 className={`${style.headmarg}`}>
              <i className="fa-solid fa-ellipsis-vertical" 
                 ></i>
            </h3>
          </div>
          {/* Headmarg Ends */}

          {/* Title Starts */}
          <div className={`${style.tiltecontainer}`}>          
            <h3 className={`col-4 ${style.titles} ${style.monthtitle}`}>Month</h3>        
         
            <h3 className={`col-4 ${style.titles}`}>GSTR-1</h3>         
         
            <h3 className={`col-4 ${style.titles}`}>GSTR-3B</h3>
          
          </div>
          {/* Title Ends */}
          {gstMonthsArray.map((item,index) => 
          <div className={` ${style.row2}`} key={index}>
            {/* <div  className={`col-4 ${style.monthn}`} >               */}
                <p className={`col-4 ${style.monthname}`} key={index}>{item.month}</p>              
            {/* </div> */}
            {/* <div  className={`col-4 ${style.GSTR1}`}> */}
              <p className={item.isGstr1?`col-4 ${style.status} ${style.filed}`:`col-4 ${style.status} ${style.notfiled}`}>{item.isGstr1?"Filed":"Not Filed"}</p>
            {/* </div> */}
              {/* <div  className={`col-4 ${style.GSTR3B}`}> */}
              <p className={item.isGstr3B?`col-4 ${style.status} ${style.filed}`:`col-4 ${style.status} ${style.notfiled}`}>{item.isGstr3B?"Filed":"Not Filed"}</p>
            {/* </div> */}
          </div>
          )}

          <p className={`${style.lupdate}`}>Last Updated on {lastUpdateDate}</p>
        </div>
        {/* GST port  Ends......................................................................................................... */}
      </div>
    </div>
  );
}

export default GstDashboard;
