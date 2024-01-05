import React, { useState } from 'react';

import styles from './HomePgClientRegister.module.css';
import { Link } from "react-router-dom";
import RadioInput from '../../../components/RadioField/RadioInput';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import residential_status from '../../../ObjData/ResidentialStatus.json'
import Cpro from '../../../ObjData/CProf.json'
import StateObj from '../../../ObjData/States.json'
import formfields from './formfields';
import InputType from "./InputType"
import Swal from 'sweetalert2';






const HomePgClientRegister = () => {
  const Navigate = useNavigate();

  //Tocheck Password strength
  const [strenghtScore, setStrenghtScore] = useState("null");
  const zxcvbn = require("zxcvbn");


  const [Income_Tax_Radio, setIncome_Tax_Radio] = useState(false);
  const [GST_Radio, setGST_Radio] = useState(false);
  const [Both_Radio, setBoth_Radio] = useState(false);

  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull, setIsProfessionNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);


  //const [buttonDisable,setButtonDisable]=useState(true);
  const [formdata, setFormdata] = useState({
    category: "",
    name: "",
    datebirth: "",
    membership_No: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    address: "",
    pin_Code: "",
    state: "",
    residential_status: "",
    password: "",
    confirmpassword: ""
  });






  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pan") {
      if (value.length === 10) {
        FetchClientDATA(value);
      }
      // console.log(value)
    }

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

      case "password":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        //----Password Strenght-------
        if (value !== "") {
          const pass = zxcvbn(value);
          //console.log(pass.score);
          setStrenghtScore(pass.score);
        } else {
          setStrenghtScore("null");
        }


        //---check Password match-----
        if (formdata.confirmpassword !== value) {
          setIsPasswordMatch(false);
        } else {
          setIsPasswordMatch(true);
        }

        break;


      case "confirmpassword":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });


        //---check Password match-----
        if (formdata.password !== value) {
          setIsPasswordMatch(false);
        } else {
          setIsPasswordMatch(true);
        }
        break;


      default:
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }



  };



  const FetchClientDATA = async (Cpan) => {

    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/getClientException?pan=${Cpan}`, requestOptions);
      const result = await response.json();

      if (result.status === "NOT_FOUND") {
        Swal.fire("Failed!", `${result.message}`, "error")
        setFormdata({ pan: "" })
      }
    } catch (error) {
      console.log('error', error);
    }
  }




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

    // Check Password Match
    if (
      formdata.password !== formdata.confirmpassword ||
      (formdata.password === "" || formdata.confirmpassword === "")
    ) {
      setIsPasswordMatch(false);
      console.log("password mismatch");
    }

    // Check Form Fields
    if (
      !formdata.name ||
      !formdata.profession ||
      !isValidPAN ||
      !isValidMobile ||
      !isValidEmail ||
      !isPasswordMatch


    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      // console.log(formdata);
      return;
    } else {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "name": formdata.name,
          "dob": formdata.datebirth,
          "profession": formdata.profession,
          "pan": formdata.pan,
          "telephone": formdata.telephone,
          "mobile": formdata.mobile,
          "email": formdata.email,
          "address": formdata.address,
          "pin_code": formdata.pin_Code,
          "state": formdata.state,
          "residential_status": formdata.residential_status,
          "category": formdata.category,
          "password": formdata.password
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const response = await fetch(`${url_}/saveClientTemp`, requestOptions);
        const result = await response.json();
        if (result.status === "NOT_FOUND") {
          Swal.fire("Failed!", `${result.message}`, "error")
          console.log(formdata)
        } else {
          const A = await Swal.fire("Success.", `Registered successfully`, "success")
          setFormdata({
            category: "",
            name: "",
            datebirth: "",
            membership_No: "",
            profession: "",
            pan: "",
            telephone: "",
            mobile: "",
            email: "",
            address: "",
            pin_Code: "",
            state: "",
            residential_status: "",
            password: "",
            confirmpassword: ""
          });
        }
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }

    }
  };



  return (
    <div>

      
      <div className="modal fade" 
      id="clientregistrationform" 
      tabindex="-1" 
      role="dialog" 
      aria-labelledby="myLargeModalLabel" 
      aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLabel">New message</h5> */}
              <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </span>
            </div>
            <div className='d-flex justify-content-center'>
              <div className={styles.right}>

                <div className={styles.regform}>
                  <form action="" onSubmit={handleSubmit}>
                    <div className={styles.radio}>
                      <RadioInput name='category' label='Income Tax' value='Income_Tax' checked={formdata.category === 'Income_Tax'} onChange={handleChange} manadatory='*' disabled={Income_Tax_Radio} />
                      <RadioInput name='category' label='GST' value='GST' checked={formdata.category === 'GST'} onChange={handleChange} manadatory='*' disabled={GST_Radio} />
                      <RadioInput name='category' label='Both' value='Both' checked={formdata.category === 'Both'} onChange={handleChange} manadatory='*' disabled={Both_Radio} />

                    </div>
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
                          validationmsg={formfield.validationmsg}
                          strenghtScore={formfield.name === "password" ? strenghtScore : ""}
                          isNameNull={formfield.name === "name" && isNameNull}
                          isValidEmail={formfield.name === "email" && isValidEmail}
                          isValidMobile={formfield.name === "mobile" && isValidMobile}
                          isValidPAN={formfield.name === "pan" && isValidPAN}
                          isPasswordMatch={formfield.name === "confirmpassword" && isPasswordMatch}
                          isProfessionNull={formfield.name === "profession" && isProfessionNull}
                        />
                      ))}
                      <div className={`${styles.btn_submit} mt - 4`}>
                        <button type="submit" onClick={handleSubmit}>
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePgClientRegister;
