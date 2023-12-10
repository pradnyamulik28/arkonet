import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import formfields from './formfields';
import InputType from "./InputType"
import Swal from 'sweetalert2';

const Registration = () => {
  const Navigate = useNavigate();


  const { referralParam } = useParams();  //get User Info from url

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
  const [isValidPIN, setIsValidPIN] = useState(true);

const [email,setEmail]=useState()
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
    pin_code: "",
    state: "",
    whatsApp_Link: "",
    investNow_Email: [],
    refrenceId: referralParam ? referralParam.split('_')[1] : null,
    password: "",
    confirmpassword: ""
  });


  useEffect(() => {
    if (referralParam) {
      const inputElement = document.getElementsByName('refrenceId', 'text');
      console.log("input field : ", inputElement.length)
      if (inputElement.length) {
        inputElement[0].disabled = true;
      }
    }
  }, [])




  const handleChange = (e) => {
    const { name, value } = e.target;

    //=============================================================================
    switch (name) {
      case "name":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsNameNull(false);
        } else {
          setIsNameNull(true);
        }
        break;

      case "profession":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsProfessionNull(false);
        } else {
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


        case "pin_code":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic pin code validation
        const pinPattern = /^[1-9]{1}[0-9]{5}$/;
        setIsValidPIN(pinPattern.test(e.target.value));
        break;

      case "investNow_Email":
      
        setEmail(value);
        // setFormdata({ ...formdata, investNow_Email: "" });
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


  function manageMailList(event,index){
          event.preventDefault();
          
          switch (event.target.id) {
            case "add":
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!email || !emailPattern.test(email)||formdata.investNow_Email.includes(email)) {
                Swal.fire({
                  icon: "error",
                  text: !email
                    ? "Blank field..!!"
                    : !emailPattern.test(email) ? "Invalid email..!!" 
                    : formdata.investNow_Email.includes(email) && "Item already exists",
                });
              } else {
               
                  setFormdata({...formdata, investNow_Email: [email,...formdata.investNow_Email ]});
                  setEmail('');
                
              }
              break;

            case "remove":
              const updatedItems = [...formdata.investNow_Email];
              updatedItems.splice(index, 1);
              setFormdata({...formdata,investNow_Email:updatedItems});
              break;
            default:
              break;
          }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formdata)

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

    const pinPattern = /^[1-9]{1}[0-9]{5}$/;
    setIsValidPIN(pinPattern.test(formdata.pin_code));
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
      !isValidPIN||
      !isValidEmail ||
      !isPasswordMatch
    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {
      const url = `${url_}/createuser`;
      // console.log(url);
      // console.log(formdata)


      var raw = JSON.stringify({
        "user": {
          name: formdata.name,
          datebirth: formdata.datebirth,
          membership_No: formdata.membership_No,
          profession:formdata.profession,
          pan: formdata.pan,
          telephone: formdata.telephone,
          mobile: formdata.mobile,
          email: formdata.email,
          office_Address: formdata.office_Address,
          pin_code: formdata.pin_code,
          state: formdata.state,
          whatsApp_Link: formdata.whatsApp_Link,
          password: formdata.password,
          refrenceId: formdata.refrenceId,

        },
        "invest_now_email": formdata.investNow_Email
      });



      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: raw,
        });

        const result = await response.json()
        console.log("response", result);

        if (result.status === "NOT_FOUND") {
          swal.fire("Failed!", `${result.message}`, "error");
        } else if (result.status === "UNAUTHORIZED") {
          swal.fire("Failed!", `${result.message}`, "error");
        } else if (response.status === 200) {
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
            pin_code: "",
            state: "",
            whatsApp_Link: "",
            investNow_Email: [],
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
            <div >
              {formfields.map((formfield) => (
                <>
                <div className={formfield.name==="investNow_Email"&&`${styles.first}`}>
                <InputType
                  key={"k" + formfield.id}
                  labelname={formfield.labelname}
                  name={formfield.name}
                  type={formfield.type}
                  placeholder={formfield.placeholder}
                  value={formfield.name==="investNow_Email"?email:formdata[formfield.name]}
                  mandatory={formfield.mandatory}
                  onChange={handleChange}
                  validationmsg={formfield.validationmsg}
                  strenghtScore={formfield.name === "password" ? strenghtScore : ""}
                  isNameNull={formfield.name === "name" && isNameNull}
                  isValidEmail={formfield.name === "email" && isValidEmail}
                  isValidPIN={formfield.name === "pin_code" && isValidPIN}
                  isValidMobile={formfield.name === "mobile" && isValidMobile}
                  isValidPAN={formfield.name === "pan" && isValidPAN}
                  isPasswordMatch={formfield.name === "confirmpassword" && isPasswordMatch}
                  isProfessionNull={formfield.name === "profession" && isProfessionNull}
                />
                {formfield.name==="investNow_Email"&&<i class="fa-solid fa-plus" style={{"margin":"0px 20px","cursor":"pointer","float":"right","position":"relative","top":"1rem","right":"0rem"}} 
                id="add" onClick={(e)=>{manageMailList(e)}}></i>}

                </div>
                {formfield.name==="investNow_Email"&&
                <>
               
                 <ul className={formdata.investNow_Email.length>0&&`${styles.emaillist}`}>
                 {formdata.investNow_Email.map((email, index) => (                  
                  <li key={index}  className={styles.emailitem}>
                    <i class="fa fa-times" aria-hidden="true" id="remove" 
                    onClick={(e)=>{manageMailList(e,index)}}>
                    </i>
                      {email}
                  </li>
                 ))}
               </ul>
               </>
                }
                </>
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