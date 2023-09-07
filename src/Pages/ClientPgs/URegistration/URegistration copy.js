import React, { useState } from 'react';

import InputField from '../../../components/InputField/InputField';
import styles from './URegistration.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import Uprofesion_obj from '../../../ObjData/CProf.json';
import States_obj from '../../../ObjData/States.json';
import ResidentialStatus from '../../../ObjData/ResidentialStatus.json'
import RadioInput from '../../../components/RadioField/RadioInput';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';







const URegistration = () => {

  const navigate = useNavigate();
  // Access JWT token and remove double quotes
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  // const cleanedToken = window.storedToken.replace(/^"(.*)"$/, '$1');


  const [formdata, setFormdata] = useState({
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_Code: "",
    profession: "",
    state: "",
    telephone: "",
    category: "",
    dob: "",
    name: "",
    residential_status: "",
    userid: `${user_id}`,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile' || name === 'telephone') {
      const numericValue = value.replace(/\D/g, '');
      setFormdata({ ...formdata, [e.target.name]: numericValue });
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }


  };

  const handleSubmit = async (event) => {
    event.preventDefault();




    if (formdata.mobile.length !== 10) {
      swal.fire("Failed!", "Enter valid 10 digit mobile number!!", "error");

    }

    if (formdata.pan.length !== 10 || !formdata.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      swal.fire("Failed!", "Enter valid 10 digit PAN!!", "error");

    }

    if (!formdata.name || !formdata.profession || !formdata.pan || !formdata.mobile || !formdata.category) {
      swal.fire("Failed!", "Please fill the mandatory field !!", "error");
    }
    else {


      const url = `${url_}/createclient`;
      console.log(url);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          },
          body: JSON.stringify(formdata),
        });

        const result = await response.json()
        console.log("response", result);
        if (response.ok) {

          setFormdata({
            address: "",
            email: "",
            mobile: "",
            pan: "",
            pin_Code: "",
            profession: "",
            state: "",
            telephone: "",
            category: "",
            dob: "",
            name: "",
            residential_status: "",
            userid: `${user_id}`,
          });

          swal.fire("Success", "Data inserted successfully.", "success");
          navigate(-1);

        } else {

          if (result.status === "NOT_FOUND" || result.status === "UNAUTHORIZED") {
            swal.fire("Failed!", `${result.message}`, "error");
          }
        }

      } catch (error) {
        swal.fire(
          "Failed!",
          "Server Down!! Please try again later!!!!",
          "error"
        );

      }





    }
  };


  return (
    <div>
      <div className={styles.right}>
        <div className={styles.regtitle} style={{ textAlign: 'center' }}>
          <span>CLIENT REGISTRATION FORM</span>
        </div>
        <div className={styles.regform}>
          <form action="/" onSubmit={handleSubmit}>

            <div className={styles.radio}>
              <RadioInput name='category' label='Income Tax' value='Income_Tax' checked={formdata.category === 'Income_Tax'} onChange={handleChange} manadatory='*' />
              <RadioInput name='category' label='Demo' value='Demo' checked={formdata.category === 'Demo'} onChange={handleChange} manadatory='*' />

            </div>


            <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={formdata.name} manadatory='*' />

            <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='dob' value={formdata.dob} />

            <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={formdata.profession} manadatory='*' />


            <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={formdata.pan} manadatory='*' />


            <InputField type='text' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={formdata.telephone} maxLength='11' />

            <InputField type='text' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={formdata.mobile} manadatory='*' maxLength='10' />

            <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={formdata.email} />

            <InputField placeholder='Enter your office address' onChange={handleChange} lblname=' Addresss' name='address' value={formdata.address} />

            <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_Code' value={formdata.pin_Code} maxLength='6' />

            <DropDown value_array={States_obj} lblname='State' name='state' value={formdata.state} onChange={handleChange} />

            <DropDown value_array={ResidentialStatus} lblname='Residential Status' name='residential_status' value={formdata.residential_status} onChange={handleChange} />


            <div className={styles.btn_submit}>
              <button type="submit" onClick={handleSubmit}>SUBMIT</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default URegistration;
