import React, { useState } from 'react';
import style from './ResetPass.module.css'
// import swal from 'sweetalert';
import { url_ } from '../../../Config';
import swal from 'sweetalert';


const ResetPass = () => {


  const [data, setData] = useState({
    pan: "",
    otp: "",
    newPassword: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });



  };


  const SendOTP = () => {
    const otpurl = `${url_}/send-otp`;



    try {

      const formdata = new FormData();
      formdata.append("pan", data.pan);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(otpurl, requestOptions)
        .then(response => {
          response.json();
          console.log(response.status)
          if (response.status === 200) {
            swal("Success.", "OTP is sent registered email. Verify the OTP", "success");
            setData({
              pan: ""
            })
          } else {
            swal("Failed", "Enter valid OTP", "error");
            setData({
              pan: ""
            })
          }
        })

        .catch(error => console.log('error', error));



    } catch (error) {
      console.warn("Error on function calling...")
    }

  }

  const VerifyOTP = () => {

    const verifyurl = `${url_}/verify-otp`;

    try {

      const formdata = new FormData();
      formdata.append("otp", data.otp);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(verifyurl, requestOptions)
        .then(response => {
          response.json();
          console.log(response.status)
          if (response.status === 200) {
            swal("Success.", "OTP Verified.", "success");

          } else {
            swal("Failed", "Invalid OTP!!", "error");

            console.log(data.otp)
          }
        })

        .catch(error => console.log('error', error));



    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  const handleSubmit = () => {




    if (data.newPassword === data.confirmpassword) {

      console.log("New:", data.newPassword)
      console.log("Confirm:", data.confirmpassword)

      const verifyurl = `${url_}/reset-password`;

      try {

        const formdata = new FormData();
        formdata.append("otp", data.otp);
        formdata.append("newPassword", data.newPassword);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch(verifyurl, requestOptions)
          .then(response => {
            response.json();
            console.log(response.status)
            if (response.status === 200) {
              swal("Success.", "Password changed successfully.", "success");
              setData({
                newPassword: "",
                confirmpassword: "",
                otp: ""

              })
            } else {
              swal("Failed", "Failed to change password!!", "error");
              setData({
                newPassword: "",
                confirmpassword: ""
              })
            }
          })

          .catch(error => console.log('error', error));



      } catch (error) {
        console.warn("Error on function calling...")
      }



    } else {
      swal("Failed!", "Passsword doesn't match!!", "error");

    }

  }

  return (
    <div>
      <div className="container">
        <div className={`${style.title} row m-5 mt-5 `}>Forget Password</div>
        <div className="row m-4 d-flex flex-column">
          <label htmlFor="">Enter Registered PAN</label>
          <input type="text" value={data.pan} onChange={handleChange} name='pan' placeholder='Enter Registered PAN....' autoComplete='off' />
        </div>
        <div className="row m-2 d-flex justify-content-end mr-4">
          <span onClick={SendOTP} className={`${style.line} ${style.hover}`}>Send OTP</span>
        </div>
        <div className='row m-4 mt-5'>
          <div className="col-6">
            <input type="text" onChange={handleChange} value={data.otp} name='otp' placeholder='Enter the OTP....' autoComplete='off' />
          </div>
          <div className={`col-6 ${style.btn} d-flex justify-content-center`}>
            <button onClick={VerifyOTP}>Verify</button>
          </div>
        </div>

        <div className="row m-4 d-flex flex-column">

          <div className="row m-4">
            <label htmlFor="">New Password</label>
            <input type="password" onChange={handleChange} value={data.newPassword} name='newPassword' placeholder='Enter new password....' autoComplete='off' />
          </div>
          <div className="row m-4">
            <label htmlFor="">Confirm New Password</label>
            <input type="password" onChange={handleChange} value={data.confirmpassword} name='confirmpassword' placeholder='Re-enter new password....' autoComplete='off' />
          </div>
          <div className={`row d-flex justify-content-center ${style.btn}`}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>


      </div>

    </div >
  );
}

export default ResetPass;
