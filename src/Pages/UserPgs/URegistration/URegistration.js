import React, { useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import styles from './URegistration.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import profesion_obj from './Prof.json';
import States_obj from './States.json';
import RadioInput from '../../../components/RadioField/RadioInput';


const URegistration = () => {
  const residentialStatus = [
    {
      val: " Resident Indian",
      option_name: "Business"
    },
    {
      val: "Non-Resident Indian",
      option_name: "Servic"
    }
  ];

  const [formdata, setFormdata] = useState({
    name: "",
    dob: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    address: "",
    pin_Code: "",
    state: "",
    residential_status: "",
    category: "",
    regId: ""

  });
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    var token = window.localStorage.getItem('token');
    var regId = window.localStorage.getItem('regId');
    try {


      fetch("http://localhost:8081/client", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(formdata)
      }).then((result) => {
        console.log("result", result)
        if (result.status === 200) {
          setFormdata({
            name: "",
            dob: "",
            profession: "",
            pan: "",
            telephone: "",
            mobile: "",
            email: "",
            address: "",
            pin_Code: "",
            state: "",
            residential_status: "",
            category: "",
            regId: `${regId}`
          });
          console.log(formdata.state)
          console.log("Data inserted successfully...")
        } else {
          console.log("Data not inserted.!!")

        }
      })

    } catch (error) {
      console.warn("Error on function calling...")
    }

    console.log(JSON.stringify(formdata));
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
              <RadioInput name='category' label='Income Tax' value='Income_Tax' checked={formdata.category === 'Income_Tax'} onChange={handleChange} />
              <RadioInput name='category' label='Demo' value='Demo' checked={formdata.category === 'Demo'} onChange={handleChange} />
            </div>
            <div className={styles.first}>
              <div className={styles.username}>
                <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={formdata.name} />
              </div>
              <div className={styles.userdob}>
                <InputField placeholder='Enter your DOB in DD/MM/YYYY' onChange={handleChange} lblname='DOB/DOI' name='dob' value={formdata.dob} />
              </div>

              <div className={styles.userprofession}>
                <DropDown value_array={profesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={formdata.profession} />
              </div>
              <div className={styles.userpan}>
                <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={formdata.pan} />
              </div>
            </div>
            <div className={styles.second}>
              <div className={styles.usertelephone}>
                <InputField placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={formdata.telephone} />
              </div>
              <div className={styles.usermobile}>
                <InputField placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={formdata.mobile} />
              </div>
              <div className={styles.useremail}>
                <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={formdata.email} />
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
                <DropDown value_array={residentialStatus} lblname='Residential Status' name='residential_status' value={formdata.residential_status} onChange={handleChange} />
              </div>

              <div className={styles.btn_submit}>
                <button type="submit">SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default URegistration;
