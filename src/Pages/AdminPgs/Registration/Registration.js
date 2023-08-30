import React, { useState } from 'react';
import styles from './Registration.module.css';
import { useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from 'sweetalert';
import formfields from './formfields';
import InputType from "./InputType"

const Registration = () => {
  const Navigate = useNavigate();


  //Tocheck Password strength
  const [strenghtScore, setStrenghtScore] = useState("null");
  const zxcvbn = require("zxcvbn");


  //const [buttonDisable,setButtonDisable]=useState(true);
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
    confirmpassword: ""
  });






  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" || name === "telephone") {
      const numericValue = value.replace(/\D/g, "");
      setFormdata({ ...formdata, [e.target.name]: numericValue });
      e.target.value = numericValue;
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
      if (name === "password") {
        if (value !== "") {
          const pass = zxcvbn(value);
          console.log(pass.score);
          setStrenghtScore(pass.score);
        }
        else {
          setStrenghtScore("null");
        }
      }


      //Code to : to check two passwords
      if (name === "confirmpassword" && formdata.password !== value) {
        console.log("Password mismatch");
      }

    }

  };





  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formdata.name || !formdata.profession || !formdata.pan || !formdata.mobile || !formdata.email || !formdata.password || !formdata.confirmpassword) {
      swal("Failed!", "Please fill the mandatory field !!", "error");
      return;
    }

    if (formdata.pan.length !== 10 || !formdata.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {

      swal("Failed!", "Enter valid 10 digit PAN!!", "error");
      return;
    }
    if (formdata.password !== formdata.confirmpassword) {

      swal("Failed!", "Password and Confirm-Password Should Match!!", "error");
      return;
    }
    else {

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
                confirmpassword: ""
              });
              swal("Success", "Registration successfully. You can login now.", "success");
              Navigate('/admin/')

              console.log("Data inserted successfully...")

            } else {

              swal("Failed!", "Registration failed.!!!!", "error");
              console.log("Data not inserted.!!")

            }
          })
          .catch((err) => {
            swal("Failed!", "Server Down !! Please try again!!!!", "error");
            console.log(err)
          });
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
          <form action="" onSubmit={handleSubmit}>
            <div className={styles.first}>
              {formfields.map((formfield) => (
                <InputType
                  key={"k" + formfield.id}
                  labelname={formfield.labelname}
                  name={formfield.name}
                  type={formfield.type}
                  placeholder={formfield.placeholder}
                  value={formdata.value}
                  mandatory={formfield.mandatory}
                  onChange={handleChange}
                  strenghtScore={formfield.name === "password" ? strenghtScore : ""}
                />
              ))}


              <div className={styles.btn_submit}>
                <button type="submit" onClick={handleSubmit}>
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;