import React, { useState } from 'react';
import LeftSide from './LeftSide';
import InputField from './InputField';
import PasswordField from './PasswordField';
import styles from './Registration.module.css';

const Registration = () => {

  const [formdata, setFormdata] = useState({
    Name: "",
    dob: "",
    membership: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    office: "",
    pin: "",
    state: "",
    whatsapp: "",
    investnow: "",
    password: "",
  });

  const handleNameChange = (e) => {
    setFormdata(e.target.value);
  };



  return (
    <div>
      <div className={styles.right}>
        <div className={styles.regtitle}>
          <span> REGISTRATION FORM</span>
        </div>
        <div className={styles.regform}>
          <form action="/">

            <div className={styles.first}>
              <div className={styles.username}>
                <InputField placeholder='Enter your Name' lblname='Name' />
              </div>
              <div className={styles.userdob}>
                <InputField placeholder='Enter your DOB' lblname='DOB/DOI' />
              </div>
              <div className={styles.usermemno}>
                <InputField placeholder='Enter your MEmbership Number' lblname='Membership Number' />
              </div>
              <div className={styles.userprofession}>
                <InputField placeholder='Enter your Profession' lblname='Profession' />
              </div>
              <div className={styles.userpan}>
                <InputField placeholder='Enter your Pan' lblname='Pan' />
              </div>
            </div>
            <div className={styles.second}>
              <div className={styles.usertelephone}>
                <InputField placeholder='Enter your Telephone' lblname='Telephone' />
              </div>
              <div className={styles.usermobile}>
                <InputField placeholder='Enter your Mobile' lblname='Mobile' />
              </div>
              <div className={styles.useremail}>
                <InputField placeholder='Enter your Email' lblname='Email' />
              </div>
              <div className={styles.userofficeadd}>
                <InputField placeholder='Enter your office address' lblname='Office Addresss' />
              </div>
            </div>
            <div className={styles.third}>
              <div className={styles.pin}>
                <InputField placeholder='Enter your pin' lblname='Pin Code' />
              </div>
              <div className={styles.state}>
                <InputField placeholder='Enter your state' lblname='State' />
              </div>
              <div className={styles.whatsapp}>
                <InputField placeholder='Enter your whatsapp link' lblname='WhatsApp Link' />
              </div>
              <div className={styles.investnow}>
                <InputField placeholder='Enter your investnow email' lblname='InvestNow Email' />
              </div>
            </div>
            <div className={styles.fourth}>
              <div className={styles.pass}>
                <PasswordField placeholder='Enter your password' lblname='Password' />
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
