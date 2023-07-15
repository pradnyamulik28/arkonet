import React, { useState } from 'react';
// import axios from "axios";
import InputField from '../../../components/InputField/InputField';
import PasswordField from '../../../components/Password/PasswordField';
import styles from './Registration.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import Aprofesion_obj from '../../../ObjData/AProf.json';
import States_obj from '../../../ObjData/States.json';
import { useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from 'sweetalert';

const Registration = () => {
  const Navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: " ",
    datebirth: "",
    membership_No: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    office_Address: "",
    pin_Code: "",
    state: "",
    whatsApp_Link: "",
    investNow_Email: "",
    password: ""
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

    if (!formdata.name || !formdata.profession || !formdata.pan || !formdata.mobile || !formdata.email) {
      swal("Failed!", "Please fill the mandatory field !!", "error");
      console.log(formdata)
      return;
    } else {

      console.log(formdata)



      const url = `${url_}/createuser`;


      console.log(url)

      try {

        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(formdata),

        })
          .then((result) => {
            console.log("result", result)
            if (result.status === 200) {
              setFormdata({
                name: " ",
                datebirth: "",
                membership_No: "",
                profession: "",
                pan: "",
                telephone: "",
                mobile: "",
                email: "",
                office_Address: "",
                pin_Code: "",
                state: "",
                whatsApp_Link: "",
                investNow_Email: "",
                password: "",
              });
              swal("Success", "Registration successfully. You can login now.", "success");
              Navigate('/')

              console.log("Data inserted successfully...")

            } else {

              swal("Failed!", "Registration failed.!!!!", "error");
              console.log("Data not inserted.!!")

            }
          })
          .catch((err) => { console.log(err) });
      } catch (error) {
        console.warn("Error on function calling...")
      }
    }

  };



  return (
    <div>
      <div className={styles.right}>
        <div className={styles.regtitle}>
          <span> REGISTRATION FORM</span>
        </div>
        <div className={styles.regform}>
          <form action="/" onSubmit={handleSubmit}>

            <div className={styles.first}>

              <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={formdata.name} manadatory='*' />

              <InputField placeholder='Enter your DOB in YYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='datebirth' value={formdata.datebirth} />

              <InputField placeholder='Enter your Membership Number' onChange={handleChange} lblname='Membership Number' name='membership_No' value={formdata.membership_No} />

              <DropDown value_array={Aprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={formdata.profession} manadatory='*' />

              <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={formdata.pan} manadatory='*' />

              <InputField placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={formdata.telephone} maxLength='11' />

              <InputField placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={formdata.mobile} manadatory='*' maxLength='10' />

              <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={formdata.email} manadatory='*' />

              <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Addresss' name='office_Address' value={formdata.office_Address} />

              <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_Code' value={formdata.pin_Code} />

              <DropDown value_array={States_obj} lblname='State' name='state' value={formdata.state} onChange={handleChange} />

              <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='WhatsApp Link' name='whatsApp_Link' value={formdata.whatsApp_Link} />

              <InputField placeholder='Enter your investnow email' onChange={handleChange} lblname='InvestNow Email' name='investNow_Email' value={formdata.investNow_Email} />

              <PasswordField type='password' placeholder='Enter your password' onChange={handleChange} lblname='Password' name='password' value={formdata.password} />

              <PasswordField type='password' placeholder='Re-enter password' lblname='Confirm Password' />

              <div className={styles.btn_submit}>
                <button type="submit" onClick={handleSubmit}>SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Registration;