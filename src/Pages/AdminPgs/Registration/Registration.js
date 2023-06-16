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
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // try {

    //   event.preventDefault();

    //   fetch("http://localhost:8084/Reg", {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formdata)
    //   }).then((result) => {
    //     console.log("result", result)
    //     if (result.status === 200) {
    //       console.log("Data inserted successfully", "success")
    //       setFormdata = ("");
    //     } else {
    //       console.log("Data not inserted.!!", "danger")

    //     }
    //   })

    // } catch (error) {
    //   console.warn("Error on function calling...")
    // }

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
                <InputField placeholder='Enter your DOB' onChange={handleChange} lblname='DOB/DOI' name='dob' value={formdata.dob} />
              </div>
              <div className={styles.usermemno}>
                <InputField placeholder='Enter your MEmbership Number' onChange={handleChange} lblname='Membership Number' name='membership' value={formdata.membership} />
              </div>
              <div className={styles.userprofession}>
                <DropDown value_array={profesion_obj} lblname='Profession' name='profession' value={formdata.profession} />
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
                <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Addresss' name='office' value={formdata.office} />
              </div>
            </div>
            <div className={styles.third}>
              <div className={styles.pin}>
                <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin' value={formdata.pin} />
              </div>
              <div className={styles.state}>
                <DropDown value_array={States_obj} lblname='State' name='state' value={formdata.state} />
              </div>
              <div className={styles.whatsapp}>
                <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='WhatsApp Link' name='whatsapp' value={formdata.whatsapp} />
              </div>
              <div className={styles.investnow}>
                <InputField placeholder='Enter your investnow email' onChange={handleChange} lblname='InvestNow Email' name='investnow' value={formdata.investnow} />
              </div>
            </div>
            <div className={styles.fourth}>
              <div className={styles.pass}>
                <PasswordField placeholder='Enter your password' onChange={handleChange} lblname='Password' name='password' value={formdata.password} />
              </div>
              <div className={styles.cpass}>
                <PasswordField placeholder='Re-enter password' onChange={handleChange} lblname='Confirm Password' value={formdata.lastName} />
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
