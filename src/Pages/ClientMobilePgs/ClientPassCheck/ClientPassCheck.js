import arkonet from "../../../Images/Arkonet.jpg";
import style from "./ClientPassCheck.module.css";
import React, { useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useLocation } from 'react-router-dom';
import swal from "sweetalert2";
import "../../../Images/Twittericon.css"
import { useRef } from "react";
//import { CONFIRM_KEY } from "sweetalert/typings/modules/options/buttons";

function ClientPassCheck() {
  
  
 
  const clientpan=useLocation().state.clientpan;
  const [isPasswordNull,setIsPasswordNull]=useState(useLocation().state.isPasswordNull);


  const [oTPVerification,setOTPVerification]=useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(),useRef(),useRef()];
  const [otpFields,setOtpFields]=useState([
    "","","","","",""
  ])

  

  
  const [credentials, setCredentials] = useState({
    Upassword: "",
    confirmpassword:""
  });

  const Navigate=useNavigate();

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    

 //Code to : to check two passwords as you type confirm password
 if (e.target.name === "confirmpassword" && credentials.Upassword !== e.target.value) {        
  //console.log("Password mismatch");       
}  


  }


  //------------------store jwt user data in localStorage----------------
function storeJwtData(jwtData) {
  Object.keys(jwtData).forEach((key) => {
    localStorage.setItem(key, jwtData[key]);
  });
 
}


//---------------Set New Password -----------------------------
const handleSetPassword = async () => {
  if (
    credentials.Upassword === credentials.confirmpassword &&
    (credentials.Upassword !== "" || credentials.confirmpassword !== "")
  ) {
    //-----Code to Set Password -----------

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      pan: clientpan,
      newPassword: credentials.Upassword,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${url_}/client/SetPassword`, requestOptions)
      .then((response) => response.text())
      .then((result) => {      
      console.log(result)
      getToken()     
  })
      .catch((error) => console.log("error", error));      


  } else {
    swal.fire("Failed!", "Password Mismatch !!!", "error");
  }


};

async function getToken(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "clientusername": clientpan,
  "clientpassword": credentials.Upassword
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch(`${url_}/client/authenticate`, requestOptions)
  .then(response => {
    if (response.status === 404) {
      swal.fire("Failed!", "PAN Not Found !!!", "error");
      setCredentials({ Upassword: "" });
      // Handle 404 Not Found error here
      // For example: throw new Error('Resource not found');
    } else if (response.status === 401) {
     
      swal.fire("Failed!", "Invalid login credential !!!", "error");
      setCredentials({ Upassword: "" });
      // Handle 401 Unauthorized error here
      // For example: throw new Error('Unauthorized');
    }
    return response.json();
  })
  .then(result =>{ //console.log(result)
   // console.log(result.token)
    localStorage.setItem("jwtToken", result.token);
    handleLogin();
  })
  .catch(error => console.log('error', error));
}
//----------------Login---------------
  const handleLogin = async () => {
   const storedToken=localStorage.getItem("jwtToken");
   // console.log(storedToken);
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

await fetch(`${url_}/pan?pan=${clientpan}`, requestOptions)
  .then((response) => {
        if (response.status === 404) {
          swal.fire("Failed!", "Invalid login credential !!!", "error");
          setCredentials({Upassword:"",});
          // Handle 404 Not Found error here
          // For example: throw new Error('Resource not found');
        } else if (response.status === 401) {
          swal.fire("Failed!", "Invalid login credential !!!", "error");
          setCredentials({Upassword:""});
          // Handle 401 Unauthorized error here
          // For example: throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((data) => {
        const jwtToken = storedToken  ;
        //console.log(data);
        //localStorage.setItem("jwtToken", jwtToken);

        if(data.users.length>0)
        data.users.map((item)=>{
      console.log(item.category);
      switch(item.category){
          case "Income_Tax":
            localStorage.setItem("client_id_it", item.clientId);
            localStorage.setItem("user_id_it", item.userid);
            break;
          case "GST":
            localStorage.setItem("client_id_gst", item.clientId);
            localStorage.setItem("user_id_gst", item.userid);
            break;
          case "Both":
            console.log("both")
            localStorage.setItem("client_id_it", item.clientId);
            localStorage.setItem("client_id_gst", item.clientId);

            localStorage.setItem("user_id_it", item.userid);
            localStorage.setItem("user_id_gst", item.userid);
            break;
          default:
        }
      })
        //const client_id = data.client.clientId;            
        //localStorage.setItem("client_id", client_id);
        storeJwtData(data.users[0]);
                
        Navigate(`clienthome`, { state: { clientid: data.users[0].clientId } });
      })
        .catch((error) => console.log("error", error));
      
   
  };


 function handleButtonClick()
 {
  //console.log("Client Id : ",clientpan);
  if(isPasswordNull)
  {
      //Code to Set the Password
      // handleSetPassword();
      sendOTP();

  }
  else
  { //Code to Login
    //handleLogin();
    getToken();
  }

 }

 const handleForgotPass =()=> {
  setIsPasswordNull(true);
  setCredentials({Upassword: "",
  confirmpassword:""});
};

const sendOTP = async()=>{
if (
  credentials.Upassword === credentials.confirmpassword &&
  (credentials.Upassword !== "" || credentials.confirmpassword !== "")
) {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  
  try{const response=await fetch(`${url_}/client/send-otp?pan=${clientpan}`, requestOptions);
  const result = await response.text(); 
  if (response.status === 200) {
    console.log(result)
    setOTPVerification(true);
  } else {  
    swal.fire("Failed!", `${result}`, "error");
  }}catch(error){
    swal.fire("Failed!", `${error}`, "error");
  }

}
else {
  swal.fire("Failed!", "Password Mismatch !!!", "error");
}



}


const verifyOTP = async()=>{
  
  let OTP='';

  for (const key in otpFields) {
    if (otpFields.hasOwnProperty(key)) {
      OTP += otpFields[key].toString();
    }
  }
  console.log(OTP)
  if(OTP.length>5)
  {  
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const response=await fetch(`${url_}/client/verify-otp?otp=${OTP}`, requestOptions);
    const result = await response.text(); 
    if (response.status === 200) {
     handleSetPassword();
    //  getToken();
    } else {  
      
      swal.fire("Failed!", `Invalid OTP`, "error");
    }
  }
  else{
    swal.fire("Failed!", `Enter OTP`, "error");
  }
  
}

function handleOTPField(value,index){

const newValue = value;
if (/^[0-9\b\177]+$/.test(newValue)) {
  const newOtp = [...otpFields];
  newOtp[index] = newValue;
  setOtpFields(newOtp);

  if (index < otpFields.length - 1) {
    inputRefs[index + 1].current.focus();
  }
} else if (value === "") {
  // Handle the case when the input is empty (e.g., after using backspace or delete)
  const newOtp = [...otpFields];
  newOtp[index] = "";
  setOtpFields(newOtp);
} else {
  // Handle the case when the input contains an invalid character
  // You can show an error message or take other appropriate action
}

}


  return (
    <div className={`${style.outercontainer}`}>
    {/*  main class */}
    <div className={`${style.maincontainer}`}>
      {/* Header */}
      <div className={oTPVerification?`${style.header} ${style.header_otp}`:`${style.header}`}>
        <Link to="/client" id={`${style.welcome}`}>
          &lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to
        </Link>
        <h2>TAXKO</h2>
      </div>


      


      {/* Main Content */}
      <div className={oTPVerification?`${style.inputs} ${style.disabled_fields}`:`${style.inputs}`}>
        <form className={oTPVerification?`${style.form} ${style.form_opt}` : `${style.form}`}>         
          <label htmlFor="password" className={`${style.labels}`}>
           {isPasswordNull ? "Set your Password" : "Enter Your Password"}
          </label>
          <input
            type="password"
            id="Upassword"
            name="Upassword"
            placeholder={`${isPasswordNull ? "New Password" : "Enter your Password"}`}
            value={credentials.Upassword}
            onChange={handleChange}
            autoComplete="off"
          />
          {isPasswordNull &&
          <>
          <label htmlFor="confirmpassword" className={`${style.labels}`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <input
           type="password"
           id="confirmpassword"
           name="confirmpassword"
           placeholder="Confirm Password"
           value={credentials.confirmpassword}
           onChange={handleChange}
           autoComplete="off"
         /></> 
           }
        </form>
      </div>

      {/* Button */}
      <div className={oTPVerification ? `${style.button} ${style.button_opt}` : `${style.button}`}>
        <button type="button" className={oTPVerification?`${style.login} ${style.disabled_fields}`:`${style.login}`} onClick={handleButtonClick}>
        {isPasswordNull ? "Send OTP" : "Login"}
        </button>
        {/* <a href="previous link" id={`${style.forgot}`} onClick={handleForgotPass}>
          <u>Forgot Password?</u>
        </a> */}
        {!isPasswordNull&&<p id={`${style.forgot}`} onClick={handleForgotPass}>
          <u>Forgot Password?</u>
        </p>}

        {oTPVerification && <div className={`${style.port}`}>
      <div className={`${style.reset}`} ><p onClick={sendOTP}>Resend OTP</p></div>

<div className={`${style.otp}`}>
        <div className={`${style.otpcluster}`}>

        {otpFields.map((value,index)=>{
          return (
            <div className={`${style.o}`}>
        <input className={`${style.optinp}`}  type="text" name={`${value}`} id={`${value}`} maxlength="1"
        // onChange={handleOTPField}  
        value={value}
        ref={inputRefs[index]}
        onChange={(e) => {
          handleOTPField(e.target.value,index)
        }}
        />
        </div>
          )
        })}
        <div className={`${style.fo}`}>
        <button type="submit" className={`${style.btnvr}`} onClick={verifyOTP}>Verify</button>
        </div>
        </div>
</div>
</div>}
      </div>


    

      {/* Copyright */}
      <div className={`${style.copyright}`}>
        <p  id={`${style.devs}`}>
          Developed & Managed by
        </p>
        <a href="https://www.arkonetglobal.com/"><img src={arkonet} alt="" id={`${style.arkonet}`} /></a>
        <p href="" id={`${style.social}`}>
          Follow us on
        </p>
        <div className={`${style.handles}`}>
          <a href="https://www.instagram.com/arkonetglobal/?igshid=YmMyMTA2M2Y%3D" id={`${style.instagram}`}>
            <i className="fa-brands fa-instagram" style={{ color: "#05022c" }}></i>
          </a>
          <a href="https://twitter.com/arkonetglobal?s=11&t=_tXcbzY9oJ0xsskd5YCcMw" id={`${style.twitter}`}>
          <i className="bi-twitter-x fs-1 inverted"></i>
          </a>
          <a href="https://www.facebook.com/arkonetglobal" id={`${style.facebook}`}>
            <i className="fa-brands fa-facebook-f" style={{ color: "#05022c" }}></i>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ClientPassCheck;
