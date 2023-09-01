import React, { useState } from 'react';
import styles from './Registration.module.css';
import { useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import formfields from './formfields';
import InputType from "./InputType"

const Registration = () => {
  const Navigate = useNavigate();

  //Tocheck Password strength
  const [strenghtScore, setStrenghtScore] = useState("null");
  const zxcvbn = require("zxcvbn");

  
  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull,setIsProfessionNull]=useState(true);
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
    password: "",
    confirmpassword: ""
  });






  const handleChange = (e) => {
    const { name, value } = e.target;



    //=============================================================================
    switch (name) {

      case "name":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if(!e.target.value){
          setIsNameNull(false);
        }
        else{
          setIsNameNull(true);
        }
        break;

      
      case "profession":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if(!e.target.value){
          setIsProfessionNull(false);
        }
        else{
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


      case "confirmpassword" :
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


  const handleSubmit = (event) => {
    event.preventDefault();
   
      if(!formdata.name){
        setIsNameNull(false);
      }

      if(!formdata.profession){
        setIsProfessionNull(false)
      }

      //--- Email Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailPattern.test(formdata.email));
     
       
        //--- PAN Validation
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        setIsValidPAN(panPattern.test(formdata.pan));          
   
      
      // mobile validation
      const mobilePattern = /^[789]\d{9}$/;
      setIsValidMobile(mobilePattern.test(formdata.mobile));
           
      //---check Password match-----
      if (formdata.password !== formdata.confirmpassword
        || (formdata.password ==="" || formdata.confirmpassword==="")) {
        setIsPasswordMatch(false);  console.log("password mismatch")      
      }      

      //-------Check Form Fields----------
      if (!formdata.name || !formdata.profession || 
        !isValidPAN || !isValidMobile || !isValidEmail || !isPasswordMatch) {
        swal.fire("Failed!", "Please fill the mandatory field !!", "error");
        console.log(formdata)
        return;
      }
    else {

      console.log(formdata)



      // const url = `${url_}/createuser`;


      // console.log(url)

      // try {

      //   fetch(url, {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },

      //     body: JSON.stringify(formdata),

      //   })
      //     .then((result) => {
      //       console.log("result", result)
      //       if (result.status === 200) {
      //         setFormdata({
      //           name: "",
      //           datebirth: "",
      //           membership_No: "",
      //           profession: "",
      //           pan: "",
      //           telephone: "",
      //           mobile: "",
      //           email: "",
      //           office_Address: "",
      //           pin_Code: "",
      //           state: "",
      //           whatsApp_Link: "",
      //           investNow_Email: "",
      //           password: "",
      //           confirmpassword: ""
      //         });
      //         swal("Success", "Registration successfully. You can login now.", "success");
      //         Navigate('/admin/')

      //         console.log("Data inserted successfully...")

      //       } else {

      //         swal("Failed!", "Registration failed.!!!!", "error");
      //         console.log("Data not inserted.!!")

      //       }
      //     })
      //     .catch((err) => {
      //       swal("Failed!", "Server Down !! Please try again!!!!", "error");
      //       console.log(err)
      //     });
      // } catch (error) {
      //   console.warn("Error on function calling...")
      // }

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
                  validationmsg={formfield.validationmsg}
                  strenghtScore={formfield.name === "password" ? strenghtScore : ""}
                  isNameNull={formfield.name==="name" && isNameNull}
                  isValidEmail={formfield.name==="email"&& isValidEmail}
                  isValidMobile={formfield.name==="mobile"&& isValidMobile}
                  isValidPAN={formfield.name==="pan"&& isValidPAN}
                  isPasswordMatch={formfield.name==="confirmpassword" && isPasswordMatch}  
                  isProfessionNull={formfield.name==="profession" && isProfessionNull}                
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