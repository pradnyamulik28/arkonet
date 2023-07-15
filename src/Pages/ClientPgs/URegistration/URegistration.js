import React, { useState } from 'react';

import InputField from '../../../components/InputField/InputField';
import styles from './URegistration.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import Uprofesion_obj from '../../../ObjData/CProf.json';
import States_obj from '../../../ObjData/States.json';
import ResidentialStatus from '../../../ObjData/ResidentialStatus.json'
import RadioInput from '../../../components/RadioField/RadioInput';
import { url_ } from '../../../Config';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';







const URegistration = () => {

  const Navigate = useNavigate();


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

  const handleSubmit = (event) => {
    event.preventDefault();




    if (formdata.pan.length !== 10 || !formdata.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      swal("Failed!", "Enter valid 10 digit PAN!!", "error");
      return;
    }

    if (!formdata.name || !formdata.profession || !formdata.pan || !formdata.mobile) {
      swal("Failed!", "Please fill the mandatory field !!", "error");
      console.log(formdata)
      return;
    } else {


      const url = `${url_}/createclient`;


      console.log(url)

      try {

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          },

          body: JSON.stringify(formdata),

        }).then((result) => {
          if (result.status === 200) {
            // 
            setFormdata({
              address: "",
              email: "",
              mobile: "",
              pan: "",
              profession: "",
              state: "",
              telephone: "",
              category: "",
              dob: "",
              name: "",
              pin_Code: "",
              userid: `${user_id}`,
              residential_status: ""
            });
            swal("Success", "Data inserted successfully.", "success");
            Navigate('/dashboard')
            console.log(storedToken)
            console.log(formdata)

          } else {
            swal("Failed!", "Data not inserted !!", "error");
            console.log(storedToken)
            console.log(formdata)

          }
        })
          .catch((err) => { console.log(err) });
      } catch (error) {
        console.warn("Error on function calling...")
      }
      console.log(formdata)
    }





  };


  return (
    <div>
      <div className={styles.right}>
        <div className={styles.regtitle}>
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

            <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_Code' value={formdata.pin_Code} />

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
