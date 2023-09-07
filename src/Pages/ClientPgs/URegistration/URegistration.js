import React, { useState } from 'react';

import styles from './URegistration.module.css';

import RadioInput from '../../../components/RadioField/RadioInput';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import formfields from './formfields';
import InputType from "./InputType"






const URegistration = () => {

  const Navigate = useNavigate();
  // Access JWT token and remove double quotes
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  // const cleanedToken = window.storedToken.replace(/^"(.*)"$/, '$1');



  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull, setIsProfessionNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPAN, setIsValidPAN] = useState(true);

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
    //=============================================================================
    switch (name) {

      case "name":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsNameNull(false);
        }
        else {
          setIsNameNull(true);
        }
        break;


      case "profession":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsProfessionNull(false);
        }
        else {
          setIsProfessionNull(true);
        }
        break;


      case "email":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        //---Basic Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(e.target.value));
        break;

      case "pan":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        //---Basic PAN Validation
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        setIsValidPAN(panPattern.test(e.target.value));
        break;

      case "mobile":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic mobile validation
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;

      case "telephone":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        break;



      default:
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }


  };

  const handleSubmit = async (event) => {
    event.preventDefault();




    if (!formdata.name) {
      setIsNameNull(false);
    }

    if (!formdata.profession) {
      setIsProfessionNull(false);
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(formdata.email));

    // PAN Validation
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setIsValidPAN(panPattern.test(formdata.pan));

    // Mobile Validation
    const mobilePattern = /^[789]\d{9}$/;
    setIsValidMobile(mobilePattern.test(formdata.mobile));



    // Check Form Fields
    if (
      !formdata.name ||
      !formdata.profession ||
      !isValidPAN ||
      !isValidMobile ||
      !isValidEmail ||
      !formdata.category

    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {
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

        if (result.status === "NOT_FOUND") {
          swal.fire("Failed!", `${result.message}`, "error");
        } else if (result.status === "UNAUTHORIZED") {
          swal.fire("Failed!", `${result.message}`, "error");
        } else {
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
          swal.fire(
            "Success",
            "Registered successful.",
            "success"
          );
          Navigate(-1)
        }
      } catch (error) {
        swal.fire(
          "Failed!",
          "Server Down!! Please try again later!!!!",
          "error"
        );
        console.error(error);
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
                validationmsg={formfield.validationmsg}
                // strengh/tScore={formfield.name === "password" ? strenghtScore : ""}
                isNameNull={formfield.name === "name" && isNameNull}
                isValidEmail={formfield.name === "email" && isValidEmail}
                isValidMobile={formfield.name === "mobile" && isValidMobile}
                isValidPAN={formfield.name === "pan" && isValidPAN}
                // isPasswordMatch={formfield.name === "confirmpassword" && isPasswordMatch}
                isProfessionNull={formfield.name === "profession" && isProfessionNull}
              />
            ))}


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
