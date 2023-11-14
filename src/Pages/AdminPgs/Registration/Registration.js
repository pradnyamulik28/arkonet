import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import formfields from './formfields';
import InputType from "./InputType"

const Registration = () => {
  const Navigate = useNavigate();


  const { referralParam } = useParams();//get User Info from url

    // if(referralParam)
    // {
    //   const [timestamp, refereduserId] = referralParam.split('_');
    //   console.log("Timestamp:",timestamp,"    Reffered by :",refereduserId);
    // }

    

  //Tocheck Password strength
  const [strenghtScore, setStrenghtScore] = useState("null");
  const zxcvbn = require("zxcvbn");


  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull, setIsProfessionNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);


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
    refrenceId: referralParam?referralParam.split('_')[1]:null,
    password: "",
    confirmpassword: ""
  });

  
useEffect(()=>{
  if(referralParam){      
    const inputElement = document.getElementsByName('refrenceId', 'text');
    console.log("input field : ",inputElement.length)
    if (inputElement.length) {
        inputElement[0].disabled  = true;
    }
}
},[])




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
      console.log(formdata);
      return;
    } else {
      const url = `${url_}/createuser`;
      console.log(url);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
            refrenceId: "",
            password: "",
            confirmpassword: "",
          });
          swal.fire(
            "Success",
            "Registration successful. You can log in now.",
            "success"
          );
          Navigate("/admin/");
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
        <div className={`${styles.regtitle} d-flex justify-content-around mb-2`}>
          <span> REGISTRATION FORM</span>
          <Link to="/admin/"  ><span>Login</span></Link>
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
                  value={formdata[formfield.name]}
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
              <div className={`${styles.btn_submit} mt-4`}>
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