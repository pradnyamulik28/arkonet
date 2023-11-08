import React, { useState } from 'react';
import styles from './loginpage.module.css';
import axios from "axios";
import { url_ } from '../../../Config';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';
import swal from 'sweetalert';
import Swal from 'sweetalert2';



const Loginpage = ({ setLoggedIn }) => {
  const Navigate = useNavigate();

  const grace_period_days=30;

  const [formdata, setFormdata] = useState({
    username: "",
    password: ""


  });
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const checkSubscriptionStatus=async ()=>{
    
   
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);
    
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    
    const response = await fetch(
      `${url_}/subscriptionpackuserdata/${formdata.username}`,
      requestOptions
    );
    const result = await response.json();
    //console.log(result.subscriptionData);
    
    if (response.status === 200) {
     
      const daysDiff = (Math.floor((new Date(result.subscriptionData.subendtdate)-new Date())/ (1000 * 60 * 60 * 24)))+1;
      console.log(daysDiff)
    
      if(result.subscriptionData.forcestop)
      {
        return 'forceful_stop';
      }
      else if(!result.subscriptionData.paid && result.subscriptionData.subendtdate===null){
        return 'not_subscribed';
      }
      else if(!result.subscriptionData.paid && daysDiff<(-grace_period_days)){
        return 'off';
      }
      else if(!result.subscriptionData.paid && daysDiff<0){
        localStorage.setItem("end_date",result.subscriptionData.subendtdate);
        const targetDate = new Date(result.subscriptionData.subendtdate.split("T")[0]); //Set Date to March 31
      const futureDate = new Date(targetDate);
      futureDate.setDate(targetDate.getDate() + grace_period_days);

        localStorage.setItem("grace_perido_end",futureDate)
        return 'grace_period'
      }
      else if(result.subscriptionData.paid && daysDiff>=0){
        return 'on'
      }  
    }
    else{
    return
    }    
    
    
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



  const handleLogin = async (e) => {
    e.preventDefault();

    const url = `${url_}/authenticate`;

    try {
      const result = await axios({
        url: url,
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(formdata),
      });
      console.log(formdata)
      if (result.status === 200) {

        const jwtToken = result.data.token;
        const user_id = result.data.user.regId;
        const user_name = result.data.user.name;
        const user_mobile = result.data.user.mobile;
        const user_pan = result.data.user.pan;

        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('user_name', user_name);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('LogedIn', 'true');
        localStorage.setItem('mobile', user_mobile);
        localStorage.setItem('pan', user_pan);


        const sub_status=await checkSubscriptionStatus();//console.log(sub_status)
        localStorage.setItem(`subscription_status`,sub_status);
                // await checkSubscriptionStatus();
                const subscription_status=localStorage.getItem(`subscription_status`)
                switch (subscription_status) {
                  case "forceful_stop":
                    Swal.fire({
                      icon: "warning",
                      text: `Your services has been stoped due to some reasons. Kindly contact admin team to resume your services.`,
                    });
                    setFormdata({
                      username: "",
                      password: "",
                    });
                    break;
        
        
                    case "not_subscribed":              
                      Swal.fire({
                        icon: "info",
                        text: `Subsribe to avail services.`,
                      });
                      Navigate("UserSubscriptionPage");
                      setLoggedIn(true);
                      break;
        
                  case "off":
                    console.log("off")
                    Swal.fire({
                      icon: "info",
                      text: `Your subscription and grace period has expired please renew your pack to resume your services.`,
                    });
                    Navigate("UserSubscriptionPage");
                    setLoggedIn(true);
                    break;
        
                  case "grace_period":
                    const end_date=new Date(localStorage.getItem("end_date"));
                    const next_date=new Date(localStorage.getItem("grace_perido_end"))
                    Swal.fire({
                      icon: "info",
                      text: `Your subscription has expired on ${end_date.getDate()} ${numberToMonth(end_date.getMonth()+1)} ${end_date.getFullYear()},
                       Your grace period to renew subscription is till ${next_date.getDate()} ${numberToMonth(next_date.getMonth()+1)} ${next_date.getFullYear()}. After that all of your services will be stopped.`,
                    });
                    Navigate("dashboard");
                    setLoggedIn(true);
        
                    break;
                  case "on":
                    Navigate("dashboard");
                    setLoggedIn(true);
        
                    break;
                  default:
                    break;
                }

      } else {
        console.log("Login failed.!!");
      }
    } catch (error) {
      swal("Failed!", "Invalid login credential !!!", "error");
      setFormdata({
        username: "",
        password: ""
      });
      console.log(error);
    }
  };

  return (

    <div className="container">


      <div className={styles.right}>
        <div className={styles.right_body}>
          <div className={styles.header}>
            <div className={styles.greet}>
              <h3>Welcome</h3>
            </div>
            <div className={styles.app_title}>TAXKO</div>
            <div className={styles.app_desp}>
              Best cloud based storage platfrom for all Businesses and individuals to manage their tax filling data.
            </div>
          </div>
          <div className={styles.main}>
            <form onSubmit={handleLogin} autoComplete=''>
              <div className={styles.form}>
                <div className={styles.user_id}>
                  <InputField placeholder='Enter your PAN' onChange={handleChange} name='username' value={formdata.username} lblname='PAN' />

                </div>
                <div className={styles.user_pass}>
                  <InputField placeholder='Enter your Password' onChange={handleChange} name='password' value={formdata.password} lblname='Password' type="password" />
                </div>

                <div className={styles.btn_login}>
                  <button type="submit">LOGIN</button>
                </div>

              </div>
            </form>
            <div className={styles.link}>
              <Link to="User_registration">New to TAXKO? Click Here</Link>
              <Link to="forgetpass">Forget Password</Link>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.follow}>
              <h6 className={`${styles.followtxt}`}>Follow Us On</h6>
            </div>
            <div className={styles.icon}>
              <h1><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-facebook" viewBox="0 0 16 16">
                <path
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg></a></h1>
              <h1><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
              </svg></a></h1>
              <h1><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-instagram" viewBox="0 0 16 16">
                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg></a></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;