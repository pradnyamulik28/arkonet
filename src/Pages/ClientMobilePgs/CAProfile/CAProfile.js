import React, { useState, useEffect } from "react";
import style from "./CAProfile.module.css";
import profile from "../../../Images/profile.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";
import NotificationBell from "../../../components/NotificationBell/NotificationBell";
import QRCode from "qrcode.react";
import swal from "sweetalert2";


function CAProfile() {

  const { toggleSidebar,no_of_notifications,handleNotification } = useSidebar();
  const [userData, setUserData] = useState(null);
  const storedToken = window.localStorage.getItem("jwtToken");
  const client_pan=localStorage.getItem("pan");

 const client_id_it=localStorage.getItem("client_id_it");
 const client_id_gst=localStorage.getItem("client_id_gst");


  const [qrCodeVisibility,setQrCodeVisibility]=useState(false)
  const navigate=useNavigate();

   
  const [activeTab, setActiveTab] = useState(0);

  const [tabs,SetTabs] = useState([
    { title: 'Income Tax', content: {},profileimg:null,isExist:false },
    { title: 'GST', content: {},profileimg:null,isExist:false },
  ]);

  // console.log(tabs);
  


  async function getCaInfo() {
    // console.log(storedToken,client_pan)
    const updatedData = [ ...tabs];
    //console.log(updatedData)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


//===========Retrive Both Data==============

    let isBoth=false;

    try{
      const GST_res=await fetch(`${url_}/getuserBypan/${client_pan}/Both`, requestOptions);
     const GST_User = await GST_res.json(); 
     if (GST_res.status === 200) {
      updatedData[0].title=""
      updatedData[0].content = GST_User.userinfo; 
      if(GST_User.content)
      updatedData[0].profileimg = `data:image/png;base64,${GST_User.content}`;
      updatedData[0].isExist=true;

      isBoth=true;
    } else {
     // console.log(GST_User);   
     //swal.fire("Failed!", `${GST_User}`, "error");
    }
    }catch (error) {
      //swal.fire("Failed!", `${error}`, "error");
    }
    //===========Retrive IT User Data==============
if(!isBoth){

  if(client_id_it){
    console.log("IT",client_id_it)
    try{
      const IT_res=await fetch(`${url_}/getuserBypan/${client_pan}/Income_Tax`, requestOptions);
     const IT_User = await IT_res.json(); 
     if (IT_res.status === 200) {
      
      updatedData[0].content = IT_User.userinfo;  
      if(IT_User.content!==null) {
      updatedData[0].profileimg = `data:image/png;base64,${IT_User.content}`;
      }
      updatedData[0].isExist=true;
    } else {
      setActiveTab(1);
    }
    }catch (error) {
      swal.fire("Failed!", `${error}`, "error");
    }
  }else
  {
    setActiveTab(1);
  }
  


  


  //Retrive GST User Data

  if(client_id_gst){
    console.log("gst ",client_id_gst)
    try{
      const GST_res=await fetch(`${url_}/getuserBypan/${client_pan}/GST`, requestOptions);
     const GST_User = await GST_res.json(); 
     if (GST_res.status === 200) {
      console.log(GST_User)
      updatedData[1].content = GST_User.userinfo; 
      if(GST_User.content!==null){
      updatedData[1].profileimg = `data:image/png;base64,${GST_User.content}`;
      }
      updatedData[1].isExist=true;
    } else {
     // console.log(GST_User);   
     //swal.fire("Failed!", `${GST_User}`, "error");
    }
    }catch (error) {
      //swal.fire("Failed!", `${error}`, "error");
    }
  }
  
}
    
    
    
  

    console.log(updatedData)
    SetTabs(updatedData);
    
  }
  useEffect(() => {
    getCaInfo();
  }, []);


  async function handlePayment(){
    //console.log(tabs[activeTab].content.user_id)


  navigate("payment",{state:{user_id:tabs[activeTab].content.regId}});

    //===================Get Payment Details==========

    
    setQrCodeVisibility(true)
  }


  function handleTabSelect(index) {
   // e.preventDefault()
    //console.log(e.target.name)
    setActiveTab(index);
  };
 // console.log(activeKey);
 

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
                onClick={(e)=>{e.preventDefault();
                  navigate("/client/clientpasscheck/clienthome")}}                
                style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
              >
               <i className="fa-solid fa-angle-left"></i> &nbsp;&nbsp;My CA
              </Link>
              <NotificationBell onClick={handleNotification} no_of_notifications={no_of_notifications}/>
            </div>
            <div className={`${style.rightear}`}>
              <h4 onClick={toggleSidebar}>
                <i className="fa-solid fa-ellipsis"></i>
              </h4>
            </div>
          </div>
          {/* Headbar Ends ....................................................................................................... */}

 {/* Tabs Starts*/}  

 
 
 <div id="userData" className={`${style.tabs}`} >

 {tabs.map((tab, index) => (
  
          tab.isExist&&(<button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              handleTabSelect(index)}}
            className={index === activeTab ? `${style.active}` : ''}
          >
            {tab.title}
          </button>         
          
          )
        ))}
 
    </div>
    
{tabs[activeTab].isExist &&
    <>  
     
          {/* Profile Starts*/}
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.profileport}`}
          >
            <div className={`${style.card}`}>
              <img className={`${style.img}`} src={tabs[activeTab].profileimg?tabs[activeTab].profileimg : profile } alt="profile_picture" />
              <div className={`${style.cardbody}`}>
                <h5 className="card-title">{tabs[activeTab].content.name}</h5>
                <p className="card-text">{tabs[activeTab].content.profession}</p>
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
                {tabs[activeTab].content.office_Address}
              </p>
            </div>
            {/* Adress Ends......................................................................................................... */}

            {/* Telephone Starts */}
            {tabs[activeTab].content.telephone && <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Telephoneport}`}
            >
              <h5>Telephone</h5>
              <p> {tabs[activeTab].content.telephone}</p>
            </div>}
            {/* Telephone Ends......................................................................................................... */}

            {/* Mobile Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Mobileport}`}
            >
              <h5>Mobile</h5>
              <p> {tabs[activeTab].content.mobile}</p>
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
                {tabs[activeTab].content.email}
              </a>
            </div>
            {/* Email Ends......................................................................................................... */}

            {/* WhatsApp Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.WhatsAppport}`}
            >
              <h5>WhatsApp Link</h5>
              <a href="##"> {tabs[activeTab].content.whatsApp_Link}</a>
            </div>
            {/* WhatsApp Ends......................................................................................................... */}

            {/* Button Starts */}
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Buttonport}`}
            >{qrCodeVisibility&&<QRCode value={tabs[activeTab].content.whatsApp_Link}  style={{height:"5rem",width:"5rem"}}/>}</div>
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Buttonport}`}
            >             
              
              <button type="button" onClick={handlePayment}>PAY NOW</button>
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
