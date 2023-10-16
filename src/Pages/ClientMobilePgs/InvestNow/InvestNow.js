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
import { useState,useEffect } from "react";
import AdDisplay from "../../../components/AdDisplay/AdDisplay"
import { useSidebar } from "../ClientSideBar/SidebarContext";
import DisplayModal from "../../../components/DisplayModal/DisplayModal";
import swal from "sweetalert2";
import { url_ } from "../../../Config";


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

  const user_id_it=localStorage.getItem("user_id_it");//Client ID For IT 

  const [investmentMail,setInvestmentMail]=useState({
    subject:"",
    msg:"",
    userid:localStorage.getItem("user_id_it"),
    username:""});
  const storedToken = window.localStorage.getItem("jwtToken");
  
  
 

  async function getITCAInfo(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //===========Retrive IT User Data==============

    try{
      const IT_res=await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/Income_Tax`, requestOptions);
     const IT_User = await IT_res.json(); 
     if (IT_res.status === 200) {
      
     setInvestmentMail({...investmentMail,username:IT_User.userinfo.name})
    } else if(IT_res.status === 404){
      console.log("Not registered under IT");    
       
      //swal.fire("Failed!", `${IT_User}`, "error");
    }
    }catch (error) {
      swal.fire("Failed!", `${error}`, "error");
    }
  }

  useEffect(() => {
    getITCAInfo();
  }, []);

  function handleCardClick(e)
  {
    if(!user_id_it){
      swal.fire("Sorry!", `You are not registereg under Income Tax`, "error");
    }
    else{

    
    //console.log(e.currentTarget.id)
    const subject=`Client Interest in ${e.currentTarget.id}`;


    const message=`Dear ${investmentMail.username},
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  Our client ${localStorage.getItem("name")}, is eager to explore ${e.currentTarget.id} investment. 
  We trust your expertise and kindly request your assistance in guiding them through this process.
                    
  Best regards,

  ${localStorage.getItem("name")},
  Contact no : ${localStorage.getItem("mobile")}`;

  setInvestmentMail({...investmentMail,subject:subject,msg:message});
    //console.log(subject);
    //console.log(message,investmentMail.userid);
    sendEmail("1",investmentMail.userid,subject,message);
    }
  }

  async function sendEmail(clientid,userid,subject,body)
  {
    //console.log(`${url_}/sendemailclient?clientid=${clientid}&userid=${userid}&subject=${subject}&body=${body}`)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Authorization", `Bearer ${storedToken}`);

// var raw = body;

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: body,
  redirect: 'follow'
};

try{const response=await fetch(`${url_}/sendemailclient?clientid=${clientid}&userid=${userid}&subject=${subject}`, requestOptions)
const result = await response.text(); 
if (response.status === 200) {
  
  swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Email sent.!',
    text:"Your Financial Advisor will contact you soon",
    showConfirmButton: false,
    timer: 5000
  })
} else {  
  swal.fire("Failed!", `${result}`, "error");
}}catch(error){
  swal.fire("Failed!", `${error}`, "error");
}

  }
  
  return (
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
