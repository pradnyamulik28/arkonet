import style from "./ClientPassChange.module.css";
import { useState } from "react";
import { url_ } from '../../../Config';
import swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
function ClientPassChange(){
    const Clientid=localStorage.getItem("client_id");
    const navigate=useNavigate();
    const storedToken = window.localStorage.getItem("jwtToken");

    const [credentials, setCredentials] = useState({
        oldPassword:"",
        Upassword: "",
        confirmpassword:""
      });

      function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        
    
     //Code to : to check two passwords as you type confirm password
     if (e.target.name === "confirmpassword" && credentials.Upassword !== e.target.value) {        
      //console.log("Password mismatch");       
    }      
    
      }




      
   
      const handleChangePassword = async (e) => {
       // e.preventdefault();
        if (
          credentials.Upassword === credentials.confirmpassword &&
          (credentials.Upassword !== "" || credentials.confirmpassword !== "")
        ) {
           
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${storedToken}`);
          
          var raw = JSON.stringify({
            "oldPassword": credentials.oldPassword,
            "newPassword": credentials.Upassword
          });
          
          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
         try{
          const response= await fetch(`${url_}/changePasswordclient/${Clientid}`, requestOptions)
         const result = await response.text();
         //console.log(response.status);
         //console.log(result); 
         if (response.status === 401) {
          swal.fire("Failed!", `${result}`, "error");
        } else {
          swal.fire("Success", `Password changed successful.`, "success");
          setCredentials({
            oldPassword:"",
            Upassword: "",
            confirmpassword:""
          });
        }
        }catch (error) {
          swal.fire("Failed!", `${error}`, "error");
        }
      
      
        } else {
          swal.fire("Failed!", "Password Mismatch !!!", "error");
        }      
      
      };


    return (
        <div className={`row ${style.row1}`}>
        <div className={`${style.allport}`}>
        
        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
        <div className={`${style.leftear}`}>
        <Link
                onClick={(e)=>{e.preventDefault();
                  navigate("/client/clientpasscheck/clienthome")}}                
                 style={{ fontSize: "2rem" , margin: "0.5rem", color: "black"}}> 
        <i className="fa-solid fa-angle-left" style={{ fontSize: "1.5rem" , color: "grey"}} ></i></Link>
        </div>
        {/* <div className={`${style.rightear}`}>
        <h4>
        <img src={fd} alt="fd"  style={{ fontSize: "2rem",width: "2rem" }} />
        </h4>
        </div> */}
        </div>
        {/* Headbar Ends ....................................................................................................... */}
        
        {/* ABD Starts*/}
        <div className={`${style.abd}`}>
        <h3 className={`${style.h31}`}>Change Password</h3>
        </div>
        {/* ABD Ends ....................................................................................................... */}
        
        
        {/* workport Starts*/}
        <div className={`row ${style.workport}`}>
        
        <div className={`${style.input}`}>
        <div className={`${style.label}`}>
        <label htmlFor="oldPassword" className={`${style.ltxt}`}>Current Password</label>
        </div>
        <div className={`${style.txtbox}`}>
        <input type="password" className={`${style.ipc}`} id='oldPassword'
        name='oldPassword'
         value={credentials.oldPassword}
         onChange={handleChange}
         autoComplete="off" />
        </div>
        </div>
        
        <div className={`${style.input}`}>
        <div className={`${style.label}`}>
        <label htmlFor="Upassword" className={`${style.ltxt}`}>New Password</label>
        </div>
        <div className={`${style.txtbox}`}>
        <input type="password" className={`${style.ipc}`} id='Upassword'
        name='Upassword'
         value={credentials.Upassword}
         onChange={handleChange}
         autoComplete="off"/>
        </div>
        </div>
        
        <div className={`${style.input}`}>
        <div className={`${style.label}`}>
        <label htmlFor="confirmpassword" className={`${style.ltxt}`}>Confirm New Password</label>
        </div>
        <div className={`${style.txtbox}`}>
        <input type="password" className={`${style.ipc}`} id='confirmpassword'
        name='confirmpassword'
         value={credentials.confirmpassword}
         onChange={handleChange}
         autoComplete="off"/>
        </div>
        </div>
        </div>
        {/* workport Ends ....................................................................................................... */}
        
        
        </div>
        <div className={`${style.button}`}>
        <button type="submit" className={`${style.btnsbt}`} onClick={handleChangePassword}>Submit</button>
        </div>
        </div>
        
          );
}
export default ClientPassChange