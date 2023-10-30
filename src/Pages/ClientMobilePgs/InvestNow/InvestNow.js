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

  const repeatRequestDuration=15;

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

  const user_id_it=localStorage.getItem("user_id_it");//user ID For IT 
  const client_id_it=localStorage.getItem("client_id_it");

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


    let isBoth=false;
    try{
      const IT_res=await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/Both`, requestOptions);
     const IT_User = await IT_res.json(); 
     if (IT_res.status === 200) {
      isBoth=true;      
      setInvestmentMail({...investmentMail,username:IT_User.userinfo.name})
    } else if(IT_res.status === 404){
      console.log("Not registered under Both");    
       
      //swal.fire("Failed!", `${IT_User}`, "error");
    }
    }catch (error) {
      swal.fire("Failed!", `${error}`, "error");
    }

    //===========Retrive IT User Data==============

    if(!isBoth){
      try{
        const IT_res=await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/Income_Tax`, requestOptions);
       const IT_User = await IT_res.json(); 
       if (IT_res.status === 200) {
        console.log(IT_User.userinfo.name)
       setInvestmentMail({...investmentMail,username:IT_User.userinfo.name})
      } else if(IT_res.status === 404){
        console.log("Not registered under IT");    
         
        //swal.fire("Failed!", `${IT_User}`, "error");
      }
      }catch (error) {
        swal.fire("Failed!", `${error}`, "error");
      }
    }
    
  }

  useEffect(() => {
    getITCAInfo();
    getRecentMail();
  }, []);


const [recentMail,setRecentMail]=useState({
  canRequestFD:true,
  canRequestNPS:true,
  canRequestMF:true,
  canRequestLI:true,
  canRequestHI:true,
})


function getRecentMail(){
  const updateItems={...recentMail};
  const todayDate = new Date();
  const currentDate = new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()); 
  
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${storedToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  
  Invest_Now.map((item,index)=>{
    fetch(
      `${url_}/investnow/findDate?clientId=${client_id_it}&category=${item.text}`,
      requestOptions
    )
    .then((response) => {
      if (response.status === 200) return response.text();
      else if(response.status===404) return "Not Found";
    })
    .then((result) => {
      console.log(item.text,result)
      if(result==="Not Found"){

      }
      else{
        
      const targetDate = new Date(result.split("T")[0]); //Set Date to March 31
      const futureDate = new Date(targetDate);
      futureDate.setDate(targetDate.getDate() + repeatRequestDuration);
      console.log(targetDate,futureDate)
      const dayDifference =
      Math.floor(currentDate.getTime()-targetDate.getTime() ) / (1000 * 3600 * 24);
        
      if (dayDifference <= repeatRequestDuration && dayDifference >= 0) {
        
       switch(item.text)
       {
        case "Fixed Deposit":
          updateItems.canRequestFD=false;
          updateItems.futureDateFD=futureDate;
        break;
        case "National Pension Scheme":
          updateItems.canRequestNPS=false;
          updateItems.futureDateNPS=futureDate;
        break;
        case "Mutual Fund":
          updateItems.canRequestMF=false;
          updateItems.futureDateMF=futureDate;
        break;
        case "Life Insurance":
          updateItems.canRequestLI=false;
          updateItems.futureDateLI=futureDate;
        break;
        case "Health Insurance":
          updateItems.canRequestHI=false;
          updateItems.futureDateHI=futureDate;
        break;
        default:break;
       }        
      }}
    })
    .catch((error) => console.log("error", error));
  })


  console.log(updateItems);
  setRecentMail(updateItems);
  
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

  function handleCardClick(e)
  {
    console.log(recentMail.canRequestFD);
    const category = `${e.currentTarget.id}`;
    let canSendRequest=true;
    let futureDate="";
    if (!user_id_it) {
      swal.fire("Sorry!", `You are not registereg under Income Tax`, "error");
    } else {

      switch(category)
      {
       case "Fixed Deposit":
        if(!recentMail.canRequestFD) {
          futureDate=recentMail.futureDateFD;
          canSendRequest=false;}
       break;
       case "National Pension Scheme":
        if(!recentMail.canRequestNPS){
          futureDate=recentMail.futureDateNPS;
          canSendRequest=false;}
       break;
       case "Mutual Fund":
         if(!recentMail.canRequestMF){
          futureDate=recentMail.futureDateMF;
          canSendRequest=false;}
       break;
       case "Life Insurance":
         if(!recentMail.canRequestLI){
          futureDate=recentMail.futureDateLI;
          canSendRequest=false;}
       break;
       case "Health Insurance":
         if(!recentMail.canRequestHI){
          futureDate=recentMail.futureDateHI;
          canSendRequest=false;}
       break;
       default:break;
      }   


      if (canSendRequest) {
        
        //console.log(e.currentTarget.id)
        const subject = `Client Interest in ${e.currentTarget.id}`;

        const message = `Dear ${investmentMail.username},
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  Our client ${localStorage.getItem("name")}, is eager to explore ${
          e.currentTarget.id
        } investment. 
  We trust your expertise and kindly request your assistance in guiding them through this process.
                    
  Best regards,

  ${localStorage.getItem("name")},
  Contact no : ${localStorage.getItem("mobile")}`;

        //setInvestmentMail({...investmentMail,subject:subject,msg:message});
        //console.log(subject);
        //console.log(message,investmentMail.userid);
        sendEmail(client_id_it,user_id_it,subject,message,category);
      } else {
        swal.fire({
          icon: "info",
         
          text: `You have already registered a request under ${e.currentTarget.id} in last ${repeatRequestDuration} days.
                  Kindly wait till your Tax Consultant contacts you or try again after ${futureDate.getDate()} ${numberToMonth(futureDate.getMonth()+1)}`,
        });
        
      }
    }
  }

  async function sendEmail(clientid,userid,subject,body,category)
  {
   
    swal.fire({
      title: 'Sending Email',
      text: 'Please wait...',
      showConfirmButton: false,
      onBeforeOpen: () => {
        swal.showLoading();
      },
    });

var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: body,
  redirect: 'follow'
};

try{const response=await fetch(`${url_}/sendemailclient?clientid=${clientid}&userid=${userid}&subject=${subject}&category=${category}`, requestOptions)
const result = await response.text(); 
if (response.status === 200) {
  swal.close();
  swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Email sent.!',
    text:"Your Financial Advisor will contact you soon",
    showConfirmButton: false,
    timer: 5000
  }); 
  
} else {  
  swal.close();
  swal.fire("Failed!", `${result}`, "error");
}}catch(error){
  swal.close();
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
