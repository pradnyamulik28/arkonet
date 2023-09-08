import arkonet from "../../../Images/Arkonet.jpg";
import style from "./ClientPassCheck.module.css";
import React, { useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useLocation } from 'react-router-dom';
import swal from "sweetalert2";
//import { CONFIRM_KEY } from "sweetalert/typings/modules/options/buttons";

function ClientPassCheck() {
  
  // const {isPasswordNull,clientpan}=useLocation().state; //Get Password status and Clientid(PAN) from route
 
  const clientpan=useLocation().state.clientpan;
  const [isPasswordNull,setIsPasswordNull]=useState(useLocation().state.isPasswordNull);
  
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
      //On Set Password Success Login
      handleLogin();
     
  })
      .catch((error) => console.log("error", error));      


  } else {
    console.log(
      "Password : ",
      credentials.Upassword,
      "Confirm : ",
      credentials.confirmpassword
    );
  }


};


//----------------Login---------------
  const handleLogin = async () => {
      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(clientpan,credentials.Upassword)

    var raw = JSON.stringify({
      clientusername: clientpan,
      clientpassword: credentials.Upassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${url_}/client/authenticate`, requestOptions)
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
        const jwtToken = data.token;
        localStorage.setItem("jwtToken", jwtToken);
        const client_id = data.client.clientId;
            
        localStorage.setItem("client_id", client_id);
        storeJwtData(data.client);
                
        Navigate(`clientdocfolder`, { state: { clientid: client_id } });
        
      })
      .catch((error) => console.log("error", error));
  };


 function handleButtonClick()
 {
  //console.log("Client Id : ",clientpan);
  if(isPasswordNull)
  {
      //Code to Set the Password
      handleSetPassword();

  }
  else
  { //Code to Login
    handleLogin();
  }

 }

 const handleForgotPass =()=> {
  setIsPasswordNull(true);
  setCredentials({Upassword: "",
  confirmpassword:""});
};


  return (
    <div className={`${style.outercontainer}`}>
    {/*  main class */}
    <div className={`${style.maincontainer}`}>
      {/* Header */}
      <div className={`${style.header}`}>
        <Link to="/client" id={`${style.welcome}`}>
          &lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to
        </Link>
        <h2>TAXKO</h2>
      </div>

      {/* Main Content */}
      <div className={`${style.inputs}`}>
        <form className={`${style.form}`}>         
          <label htmlFor="password" className={`${style.labels}`}>
           {isPasswordNull ? "Set your Password" : "Enter Your Password"}
          </label>
          <input
            type="password"
            id="Upassword"
            name="Upassword"
            placeholder={`${isPasswordNull ? "Set your Password" : "Enter your Password"}`}
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
      <div className={`${style.button}`}>
        <button type="button" className={`${style.login}`} onClick={handleButtonClick}>
        {isPasswordNull ? "Set Password" : "Login"}
        </button>
        {/* <a href="previous link" id={`${style.forgot}`} onClick={handleForgotPass}>
          <u>Forgot Password?</u>
        </a> */}
        <p id={`${style.forgot}`} onClick={handleForgotPass}>
          <u>Forgot Password?</u>
        </p>
      </div>

      {/* Copyright */}
      <div className={`${style.copyright}`}>
        <p  id={`${style.devs}`}>
          Developed & Managed by
        </p>
        <a href="https://www.arkonetglobal.com/"><img src={arkonet} alt="" id={`${style.arkonet}`} /></a>
        <a href="" id={`${style.social}`}>
          Follow us on
        </a>
        <div className={`${style.handles}`}>
          <a href="previous link" id={`${style.instagram}`}>
            <i className="fa-brands fa-instagram" style={{ color: "#05022c" }}></i>
          </a>
          <a href="" id={`${style.twitter}`}>
            <i className="fa-brands fa-twitter" style={{ color: "#05022c" }}></i>
          </a>
          <a href="" id={`${style.facebook}`}>
            <i className="fa-brands fa-facebook-f" style={{ color: "#05022c" }}></i>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ClientPassCheck;
