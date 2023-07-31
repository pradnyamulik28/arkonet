import React, { useState } from 'react';
// import swal from 'sweetalert';
// import { url_ } from '../../../Config';


const ResetPass = () => {


  const [formdata, setFormdata] = useState({
    PAN: "",
    OTP: "",
    Newpassword: ""
  });

  const handleChange = (e) => {

    setFormdata({ ...formdata, [e.target.name]: e.target.value });

  };
  const SendOTP = () => {
    console.log(formdata.PAN)
    // const url = `${url_}/createuser`;


    // console.log(url)

    // try {

    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },

    //     body: JSON.stringify(formdata.OTP),

    //   })
    //     .then((result) => {
    //       console.log("result", result)
    //       if (result.status === 200) {
    //         setFormdata({
    //           OTP: ""
    //         });
    //         swal("Success", "Registration successfully. You can login now.", "success");


    //         console.log("Data inserted successfully...")

    //       } else {

    //         swal("Failed!", "Registration failed.!!!!", "error");
    //         console.log("Data not inserted.!!")

    //       }
    //     })
    //     .catch((err) => {
    //       swal("Failed!", "Server Down !! Please try again!!!!", "error");
    //       console.log(err)
    //     });
    // } catch (error) {
    //   console.warn("Error on function calling...")
    // }
  }

  const VerifyOTP = () => {
    console.log(formdata.OTP)
    // const url = `${url_}/createuser`;


    // console.log(url)

    // try {

    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },

    //     body: JSON.stringify(formdata.OTP),

    //   })
    //     .then((result) => {
    //       console.log("result", result)
    //       if (result.status === 200) {
    //         setFormdata({
    //           OTP: ""
    //         });
    //         swal("Success", "Registration successfully. You can login now.", "success");


    //         console.log("Data inserted successfully...")

    //       } else {

    //         swal("Failed!", "Registration failed.!!!!", "error");
    //         console.log("Data not inserted.!!")

    //       }
    //     })
    //     .catch((err) => {
    //       swal("Failed!", "Server Down !! Please try again!!!!", "error");
    //       console.log(err)
    //     });
    // } catch (error) {
    //   console.warn("Error on function calling...")
    // }


  }

  const handleSubmit = () => {
    console.log(formdata.Newpassword)
    // const url = `${url_}/createuser`;


    // console.log(url)

    // try {

    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },

    //     body: JSON.stringify(formdata.OTP),

    //   })
    //     .then((result) => {
    //       console.log("result", result)
    //       if (result.status === 200) {
    //         setFormdata({
    //           OTP: ""
    //         });
    //         swal("Success", "Registration successfully. You can login now.", "success");


    //         console.log("Data inserted successfully...")

    //       } else {

    //         swal("Failed!", "Registration failed.!!!!", "error");
    //         console.log("Data not inserted.!!")

    //       }
    //     })
    //     .catch((err) => {
    //       swal("Failed!", "Server Down !! Please try again!!!!", "error");
    //       console.log(err)
    //     });
    // } catch (error) {
    //   console.warn("Error on function calling...")
    // }
  }

  return (
    <div>
      <div className="container">
        <div className="row m-4 d-flex flex-column">
          <label htmlFor="">Entered Registered PAN</label>
          <input type="text" value={formdata.PAN} onChange={handleChange} name='PAN' />
          <span onClick={SendOTP}>Send OTP</span>
          <input type="text" onChange={handleChange} value={formdata.OTP} name='OTP' />
          <button onClick={VerifyOTP}>Verify</button>
        </div>

        <div className="row m-4 d-flex flex-column">
          <label htmlFor="">New Password</label>
          <input type="text" onChange={handleChange} value={formdata.Newpassword} name='Newpassword' />

          <label htmlFor="">Confirm New Password</label>
          <input type="text" name="" id="" />
          <button onClick={handleSubmit}>Submit</button>
        </div>


      </div>

    </div>
  );
}

export default ResetPass;
