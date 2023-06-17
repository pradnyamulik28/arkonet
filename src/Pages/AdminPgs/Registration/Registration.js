import React, { useState } from 'react';
import LeftSide from '../../../components/LeftSide/LeftSide';
import InputField from '../../../components/InputField/InputField';
import PasswordField from '../../../components/Password/PasswordField';
import styles from './Registration.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import profesion_obj from './Prof.json';
import States_obj from './States.json';


const Registration = () => {

  const [formdata, setFormdata] = useState({
    name: "",
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
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {


      fetch("http://localhost:8081/user", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      }).then((result) => {
        console.log("result", result)
        if (result.status === 200) {
          console.log("Data inserted successfully...")
          // setFormdata = ("");
          console.log(formdata.state)
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
          <span> REGISTRATION FORM</span>
        </div>
        <div className={styles.regform}>
          <form action="/" onSubmit={handleSubmit}>

            <div className={styles.first}>
              <div className={styles.username}>
                <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={formdata.name} />
              </div>
              <div className={styles.userdob}>
                <InputField placeholder='Enter your DOB in YYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='datebirth' value={formdata.datebirth} />
              </div>
              <div className={styles.usermemno}>
                <InputField placeholder='Enter your MEmbership Number' onChange={handleChange} lblname='Membership Number' name='membership_No' value={formdata.membership_No} />
              </div>
              <div className={styles.userprofession}>
                <DropDown value_array={profesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={formdata.profession} />
              </div>
              <div className={styles.userpan}>
                <InputField placeholder='Enter your Pan' onChange={handleChange} lblname='Pan' name='pan' value={formdata.pan} />
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
                <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Addresss' name='office_Address' value={formdata.office_Address} />
              </div>
            </div>
            <div className={styles.third}>
              <div className={styles.pin}>
                <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_Code' value={formdata.pin_Code} />
              </div>
              <div className={styles.state}>
                <DropDown value_array={States_obj} lblname='State' name='state' value={formdata.state} />
              </div>
              <div className={styles.whatsapp}>
                <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='WhatsApp Link' name='whatsApp_Link' value={formdata.whatsApp_Link} />
              </div>
              <div className={styles.investnow}>
                <InputField placeholder='Enter your investnow email' onChange={handleChange} lblname='InvestNow Email' name='investNow_Email' value={formdata.investNow_Email} />
              </div>
            </div>
            <div className={styles.fourth}>
              <div className={styles.pass}>
                <PasswordField placeholder='Enter your password' onChange={handleChange} lblname='Password' name='password' value={formdata.password} />
              </div>
              <div className={styles.cpass}>
                <PasswordField placeholder='Re-enter password' lblname='Confirm Password' />
              </div>
              <div className={styles.btn_submit}>
                <button type="submit">SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <LeftSide />
    </div>
  );
}

export default Registration;
