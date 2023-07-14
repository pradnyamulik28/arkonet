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








const URegistration = () => {




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
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;


    if (!panRegex.test(formdata.pan) && formdata.pan !== 10) {
      swal("Failed!", "Enter valid PAN!!", "error");
      // return;
    }

    if (!formdata.name || !formdata.profession || !formdata.pan || !formdata.mobile || !formdata.email) {
      swal("Failed!", "Please fill the mandatory field !!", "error");
      // return;
      console.log(formdata)
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
            <div className={styles.first}>
              <div className={styles.username}>
                <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={formdata.name} manadatory='*' />
              </div>
              <div className={styles.userdob}>
                <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='dob' value={formdata.dob} />
              </div>

              <div className={styles.userprofession}>
                <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={formdata.profession} manadatory='*' />
              </div>
              <div className={styles.userpan}>
                <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={formdata.pan} manadatory='*' />
              </div>
            </div>
            <div className={styles.second}>
              <div className={styles.usertelephone}>
                <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={formdata.telephone} />
              </div>
              <div className={styles.usermobile}>
                <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={formdata.mobile} manadatory='*' />
              </div>
              <div className={styles.useremail}>
                <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={formdata.email} manadatory='*' />
              </div>
              <div className={styles.userofficeadd}>
                <InputField placeholder='Enter your office address' onChange={handleChange} lblname=' Addresss' name='address' value={formdata.address} />
              </div>
            </div>
            <div className={styles.third}>
              <div className={styles.pin}>
                <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_Code' value={formdata.pin_Code} />
              </div>
              <div className={styles.state}>
                <DropDown value_array={States_obj} lblname='State' name='state' value={formdata.state} onChange={handleChange} />
              </div>
              <div className={styles.state}>
                <DropDown value_array={ResidentialStatus} lblname='Residential Status' name='residential_status' value={formdata.residential_status} onChange={handleChange} />
              </div>

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

export default URegistration;
