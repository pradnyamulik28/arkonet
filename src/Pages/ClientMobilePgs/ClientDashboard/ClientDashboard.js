import React, { useEffect, useState } from "react";
import style from "./ClientDashboard.module.css";
import profile from "../../../Images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";
import NotificationBell from "../../../components/NotificationBell/NotificationBell"
function ClientDashboard() {
  const { toggleSidebar,no_of_notifications,handleNotification } = useSidebar();
  const [clientInfo,setClientInfo]=useState({});
  //const [no_of_notifications,setNo_of_notifications]=useState(0);
  useEffect(()=>{
    setClientInfo({
      name:localStorage.getItem("name"),
      PAN:localStorage.getItem("pan"),
      profession:localStorage.getItem("profession"),
    })
    
  },[]);




  return (
    <div className={`row ${style.row1}`}>
    <div className={`${style.allport}`}>
    
    {/* Headbar Starts*/}
    <div className={`${style.headerbar}`}>
    <div className={`${style.leftear}`}>
  
    <Link to="/client/clientpasscheck/clienthome" style={{ fontSize: "1rem" , margin: "0.5rem", color: "black"}}> 
    <i className="fa-solid fa-angle-left"></i>  &nbsp;&nbsp;Dashboard
    </Link>
    <NotificationBell onClick={handleNotification} no_of_notifications={no_of_notifications} />
    </div>
    <div className={`${style.rightear}`}>
    <h4>
    <i className="fa-solid fa-ellipsis" onClick={toggleSidebar}></i>
    </h4>
    </div>
    </div>
    {/* Headbar Ends ....................................................................................................... */}
    
    {/* Profile Starts*/}
    <div className={`${style.profileport}`}>
    <div className={`${style.card}`}>
    <img src={profile} alt="profile_picture" className={`${style.img1}`}/>
    <div className={`${style.cardbody}`}>   
    <h5 className={`${style.h51}`}>{clientInfo.name}</h5>
        <p className={`${style.p1}`}>{clientInfo.PAN}</p>
        <p className={`${style.p2}`}>{clientInfo.profession}</p>
    </div></div></div>
    {/* Profile Ends......................................................................................................... */}
    
    {/* ABD Starts*/}
    <div className={`${style.abd}`}>
    <div className={`${style.leftbear}`}>
    <p className={`${style.p3}`}>My Folders</p>
    </div>
    <div className={`${style.rightbear}`}>
    <div className={`${style.licon}`}>
    <h5><i className="fa-solid fa-plus"></i></h5>
    </div>
    <div className={`${style.micon}`}>
    <h5><i className="fa-solid fa-sliders"></i></h5>
    </div>
    <div className={`${style.ricon}`}>
    <h5><i className="fa-solid fa-angle-right"></i></h5>
    </div>
    </div>
    </div>
    {/* ABD Ends ....................................................................................................... */}
    
    
    {/* Cards Starts*/}
    <div className={`row ${style.row2}`}>
    
    <div className='col-6'>
    <Link to="clientincometax">
    <div className={`${style.uniclass} ${style.card1}`}>
    <div className={`${style.icons} `}>
    <div className={`${style.lefticons} `}>
      <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#22b0b2" }}></i></h1>
    </div>
    <div className={`${style.righticons} `}>
      <h4><i className="fa-solid fa-ellipsis-vertical"id="iconrigth" style={{ color: "#36dce2" }} ></i></h4>
    </div>
    </div>
    <div className={`${style.textual} `}>
    <div className={`${style.uptext} `}>
    <h5 style={{ color: "#54a280", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Income Tax</h5>
    </div>
    <div className={`${style.lowtext} `}>
      <p style={{ color: "#36dce2", fontSize: "0.9em" }}>November 10.2020</p>
    </div>
    </div>
    </div>
    </Link>
    </div>
    
    
    <div className='col-6'>
    <Link to="gstdashboard">
    <div className={`${style.uniclass} ${style.card2}`}>
    <div className={`${style.icons} `}>
    <div className={`${style.lefticons} `}>
      <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#567cf2" }}></i></h1>
    </div>
    <div className={`${style.righticons} `}>
      <h4><i className="fa-solid fa-ellipsis-vertical"id="iconrigth" style={{ color: "#567cf2" }} ></i></h4>
    </div>
    </div>
    <div className={`${style.textual} `}>
    <div className={`${style.uptext} `}>
    <h5 style={{ color: "#596fa4", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>GST</h5>
    </div>
    <div className={`${style.lowtext} `}>
      <p style={{ color: "#8c9ab4", fontSize: "0.9em" }}>December 20.2020</p>
    </div>
    </div>
    </div>
    </Link>
    </div>
    
    <div className='col-6'>
    <div className={`${style.uniclass} ${style.card3}`}>
    <div className={`${style.icons} `}>
    <div className={`${style.lefticons} `}>
      <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#f35554" }}></i></h1>
    </div>
    <div className={`${style.righticons} `}>
      <h4><i className="fa-solid fa-ellipsis-vertical"id="iconrigth" style={{ color: "#f35554" }} ></i></h4>
    </div>
    </div>
    <div className={`${style.textual} `}>
    <div className={`${style.uptext} `}>
    <h5 style={{ color: "#9e6273", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>KYC</h5>
    </div>
    <div className={`${style.lowtext} `}>
      <p style={{ color: "#f35554", fontSize: "0.9em" }}>November 22.2020</p>
    </div>
    </div>
    </div>
    </div>
    
    <div className='col-6'>
    <div className={`${style.uniclass} ${style.card4}`}>
    <div className={`${style.icons} `}>
    <div className={`${style.lefticons} `}>
      <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#f4b51c" }}></i></h1>
    </div>
    <div className={`${style.righticons} `}>
      <h4><i className="fa-solid fa-ellipsis-vertical"id="iconrigth" style={{ color: "#f4b51c" }} ></i></h4>
    </div>
    </div>
    <div className={`${style.textual} `}>
    <div className={`${style.uptext} `}>
    <h5 style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Docs</h5>
    </div>
    <div className={`${style.lowtext} `}>
      <p style={{ color: "#f4b51c", fontSize: "0.9em" }}>December 14.2020</p>
    </div>
    </div>
    </div>
    </div>
    
    </div>
    {/* Cards Ends ....................................................................................................... */}
    
    {/* Recent Bar Starts*/}
    <div className={`${style.rb}`}>
    <div className={`${style.leftcear}`}>
    <p className={`${style.p3}`}>Recent Uploads</p>
    </div>
    <div className={`${style.rightcear}`}>
    <div className={`${style.micon}`}>
    <h4><i className="fa-solid fa-upload"></i></h4>
    </div>
    </div>
    </div>
    {/* Recent Bar Ends ....................................................................................................... */}
    
    
    {/* Uploadation Starts*/}
    <div className={`${style.uploadation}`}>
    <div className={`${style.leftdear}`}>
    <div className={`${style.licon}`}>
    <h1><i className="fa-solid fa-file-pdf" style={{color: "#ff0000"}}></i></h1>
    </div>
    <div className={`${style.ricon}`}>
    <div className={`${style.uptext} `}>
    <p style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)", fontWeight: "bold", marginBottom: "0.4rem" }}>Intimation u/s 139(9)</p>
    </div>
    <div className={`${style.lowtext} `}>
      <p style={{ color: "grey", fontSize: "0.9em" }}>November 22.2020</p>
    </div>
    </div>
    </div>
    <div className={`${style.rightdear}`}>
    <p className={`${style.p4}`} style={{ color: "grey" }}>300Kb</p>
    </div>
    </div>
    {/* Uploadation Ends ....................................................................................................... */}
    
    </div>
    </div>
    
      );
}

export default ClientDashboard;
