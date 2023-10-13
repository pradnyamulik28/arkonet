import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import style from "./GstDashboard.module.css";
import NotificationBell from "../../../components/NotificationBell/NotificationBell";
import { useSidebar } from "../ClientSideBar/SidebarContext";

function GstDashboard() {
  
  const {no_of_notifications,handleNotification } = useSidebar();
  const Navigate=useNavigate();
  function getLast5Months() {
    const today = new Date();
    const months = [];
  
    for (let i = 0; i < 5; i++) {
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
  
    return months;
  }

  // useEffect(()=>{
    
  // },[])
  
  const last5Months = getLast5Months();
  
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
          {last5Months.map((item,index) => 
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

          <p className={`${style.lupdate}`}>Last Updated on 10 May 2023</p>
        </div>
        {/* GST port  Ends......................................................................................................... */}
      </div>
    </div>
  );
}

export default GstDashboard;
