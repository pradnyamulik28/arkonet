import React, { useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import style from './SubLogin.module.css'
import Swal from 'sweetalert2';
import { url_ } from '../../../Config';

const SubLoginUpdate = (props) => {
  const storedToken = window.localStorage.getItem('jwtToken');
  const user_id = window.localStorage.getItem('user_id');

  const clientdata = props.Data;
  const [values, setValues] = useState({
    email: clientdata.email,
    mobile: "",
    pan: "",
    name: "",
  })


  const handleChange = (e) => {
    const { name } = e.target
    switch (name) {
      case "name":
        setValues({ ...values, [e.target.name]: e.target.value });
        break;
      case "email":
        setValues({ ...values, [e.target.name]: e.target.value });
        break;
      case "pan":
        setValues({ ...values, [e.target.name]: e.target.value });
        break;
      case "mobile":
        setValues({ ...values, [e.target.name]: e.target.value });
        break;

      default:
        break;
    }

  }









  const handleUpdate = async () => {

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      Swal.fire('Invalid email format');
      return;
    }

    // Validate mobile format (assuming a simple check for numeric value and length here)
    const mobileRegex = /^[0-9]+$/;
    if (!mobileRegex.test(values.mobile) || values.mobile.length !== 10) {
      Swal.fire('Invalid mobile number');
      return;
    }

    // Validate PAN format (assuming a simple check for alphanumeric and length here)
    const panRegex = /^[A-Za-z0-9]+$/;
    if (!panRegex.test(values.pan) || values.pan.length !== 10) {
      Swal.fire('Invalid PAN');
      return;
    }



    if (
      !values.name ||
      !values.email ||
      !values.pan ||
      !values.mobile
    ) {
      Swal.fire("Please fill in all fields")
    } else {
      try {
        // Set up headers for the request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${storedToken}`);

        // Create a JSON string with the data to be updated
        var raw = JSON.stringify({
          "name": values.name,
          "pan": values.pan,
          "email": values.email,
          "mobile": values.mobile
        });

        // Set up the request options
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        // Make the PUT request using the Fetch API

        const response = await fetch(`${url_}/updateSub_Users/${user_id}`, requestOptions);
        // const result = await response.text();
        // console.log(result);
        if (response.status === 200) {
          await Swal.fire("Success.", "Data updated successful.", "success")
          setValues({
            pan: "",
            email: "",
            mobile: "",
            name: ""
          })
          window.location.reload();
        } else {
          Swal.fire("Failed!", "Failed to update!!", "error")
          setValues({
            pan: "",
            email: "",
            mobile: "",
            name: ""
          })
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <>


      <span data-toggle="modal" data-target="#exampleModal1">
        {props.children}
      </span>


      <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div className=' mt-4 mb-2 ml-3'>
                <h4><b>UPDATE SUB-LOGIN</b></h4>
              </div>
              <button className={`${style.close}`} type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <>
                <div className='d-flex flex-column justify-content-center'>

                  <InputField placeholder='Enter name...' onChange={handleChange} lblname='Name' name='name' value={values.name} />
                  <InputField placeholder='Enter PAN...' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} />
                  <InputField placeholder='Enter email...' onChange={handleChange} lblname='Email' name='email' value={values.email} />
                  <InputField placeholder='Enter mobile...' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} />

                </div>
              </>
            </div>
            <div class="modal-footer">

              <div className='mt-3 d-flex justify-content-center w-100'>
                <button className={`${style.buysublogin_btn} d-flex justify-content-center`} onClick={handleUpdate}><b>UPDATE</b></button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default SubLoginUpdate;
