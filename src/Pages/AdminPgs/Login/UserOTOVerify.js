import React, { useState, useEffect } from 'react';
import { url_ } from '../../../Config';
import styles from './loginpage.module.css';
import InputField from '../../../components/InputField/InputField'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';




const UserOTOVerify = ({ setLoggedIn }) => {

  useEffect(() => {
    setLoggedIn(false)
  }, [])
  const Navigate = useNavigate();


  const [newsetPassword, setNewsetPassword] = useState(true);
  const [userData, setuserData] = useState({
    isPasswordNull: localStorage.getItem('isPasswordNull'),
    pan: localStorage.getItem('User_Pan'),
    otp: "",
  })


  const handleChange = (e) => {

    setuserData({ ...userData, [e.target.name]: e.target.value });
  };






  const verifyOtp = async () => {
    // console.log(userData.otp);


    try {

      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/verify_SubUserOtp?otp=${userData.otp}`, requestOptions);
      const result = await response.text()
      if (response.status === 200) {
        await Swal.fire("Success.", "OTP verified successfully.", "success")
        localStorage.setItem('otp', userData.otp)
        Navigate("/admin/ULogin");
      } else {
        await Swal.fire("Failed!!", "Invalid OTP. Please try again!!!", "error")
        setuserData({
          otp: ""
        })
      }

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
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



              <div className={styles.form}>


                <div className={styles.user_pass}>
                  <InputField placeholder='Enter OTP...' onChange={handleChange} name='otp' value={userData.otp} lblname='OTP' />
                </div>

                <div className={styles.btn_login}>
                  <button type="submit" onClick={verifyOtp}>VERIFY</button>
                </div>

              </div>


              {/* <div className={styles.link}>
                <Link to="User_registration">New to TAXKO? Click Here</Link>
                <Link to="forgetpass">Forget Password</Link>
              </div> */}
            </div>

            <div className={styles.footer}>
              <div className={styles.follow}>
                <h6 className={`${styles.followtxt}`}>Follow Us On</h6>
              </div>
              <div className={styles.icon}>
                <h1><a href="https://www.facebook.com/arkonetglobal%22" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-facebook" viewBox="0 0 16 16">
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg></a></h1>
                <h1><a href="https://twitter.com/arkonetglobal?s=11&t=_tXcbzY9oJ0xsskd5YCcMw%22" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg></a></h1>
                <h1><a href="https://www.instagram.com/arkonetglobal/?igshid=YmMyMTA2M2Y%3D%22" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-instagram" viewBox="0 0 16 16">
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg></a></h1>
              </div>
            </div>
          </div>
        </div>
      </div>






    </>
  );
}

export default UserOTOVerify;
