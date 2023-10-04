import style from "./InvestNow.module.css";
import profile from "../../../Images/profile.png";
import HI from "../../../Images/cards.png";
import LI from "../../../Images/coininhand.png";
import handrupee from "../../../Images/handrupeecircle.png";
import MF from "../../../Images/percentageraise.png";
import NPS from "../../../Images/sackinhand.png";
import FD from "../../../Images/ticksack.png";
import { Link, useNavigate } from "react-router-dom";
import NotificationBell from "../../../components/NotificationBell/NotificationBell";
import { useState } from "react";
import AdDisplay from "../../../components/AdDisplay/AdDisplay"
import { useSidebar } from "../ClientSideBar/SidebarContext";
import DisplayModal from "../../../components/DisplayModal/DisplayModal";

function InvestNow() {
  const Invest_Now=[{
    img_src:FD,
    img_alt:"fixed_deposit_img",
    text:"Fixed Deposit",
    classname:style.fd
  },
  {
    img_src:NPS,
    img_alt:"national_pension_scheme",
    text:"National Pension Scheme",
    classname:style.nps
  },
  {
    img_src:MF,
    img_alt:"mutual_fund",
    text:"Mutual Fund",
    classname:style.mf
  },
  {
    img_src:LI,
    img_alt:"life_insurance",
    text:"Life Insurance",
    classname:style.li
  },
  {
    img_src:HI,
    img_alt:"health_insurance",
    text:"Health Insurance",
    classname:style.hi
  }
]
  const navigate = useNavigate();
  const {no_of_notifications,handleNotification}= useSidebar();
  const [displayModal,setDisplayModal]=useState({isVisible:false,msg:""})
  function handleCardClick(e)
  {
    console.log(e.currentTarget.id)
    const message=`Thank you for showing interest.
                    Your interest in a ${e.currentTarget.id} has been duly noted by our administration team 
                    and would like to assure you that your inquiry has been logged into our system. `
    setDisplayModal({...displayModal,isVisible:!displayModal.isVisible,msg:message})
    
  }
  
  return (
    <div className={`${style.row}`}>
      {/* Background */}
      <DisplayModal property={displayModal} onClick={handleCardClick}/>
   
      {/* Mobile Viewport */}
      <div
        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.mobileport}`}
      >
        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          <div className={`${style.leftear}`}>
            <Link
              to="/client/clientpasscheck/clienthome"
              //state={{ clientid: localStorage.getItem("clientId") }}
              style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
            >
              
              <i className="fa-solid fa-angle-left"></i> &nbsp;&nbsp;InvestNow
            </Link>
            <NotificationBell onClick={handleNotification} no_of_notifications={no_of_notifications}/>
          </div>
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* Ad Starts */}
        {/* <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Adport}`}
        >
          <img className={`${style.img}`} src={profile} alt="changeimage" />
          <div className={`${style.details}`}>
            <h5>SAVE TAX</h5>
            <h6>Ask HOW?</h6>
            <h6>Call On 9090990909</h6>
          </div>
        </div> */}
        <AdDisplay />
        {/* Ad Ends......................................................................................................... */}

        <div className={`row ${style.components}`}>
          {Invest_Now.map((item)=>{
            return(
              <div
            className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
            onClick={handleCardClick} id={item.text}
          >
            <a href="##" className={item.classname}>
              <img src={item.img_src} alt={item.img_alt} />
              <p>{item.text}</p>
            </a>
          </div>
            )
          })}
        
        </div>
      </div>
    </div>
  );
}

export default InvestNow;
