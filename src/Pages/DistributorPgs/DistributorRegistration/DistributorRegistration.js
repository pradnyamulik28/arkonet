import React, { useEffect, useState } from 'react';
import styles from './DistributorRegistration.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import Formfields from './formfields';
import InputType from "./InputType"
import PaymentDetails from '../PaymentDetails/PaymentDetails';

const DistributorRegistration = () => {
  
  const location=useLocation();
  const Navigate = useNavigate();
  const storedToken=localStorage.getItem("jwtToken");
  const distributor_id=localStorage.getItem("distributor_id");
 
  const [formfields,setFormFields]=useState(Formfields);

  const [formStatus,setFormStatus]=useState("registration")//state : "registration"/"update"



  useEffect(()=>{
    
    switch (location.pathname) {
      case "/distributor/distributor_reg":
        setFormFields(Formfields);
        setFormStatus("registration");
        break;

      case "/distributor/update/distributor_reg":
        //Remove Password Fields If Update
        const filteredFields=formfields.filter((item)=>{
          if(item.name==="password" || item.name==="confirmpassword"){
            return false
          }
          else return true;
        })
        setFormFields(filteredFields);
        setFormStatus("update");
        getDistributorData();
        break;

      default:
        break;
    }
      },[formStatus]);
 

  const [strenghtScore, setStrenghtScore] = useState("null");
  const zxcvbn = require("zxcvbn");


  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull, setIsProfessionNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [isAddressNull,setIsAddressNull]=useState(true);
  const [isValidPIN, setIsValidPIN] = useState(true);
  const [isStateNull, setIsStateNull] = useState(true);

  
  const [formdata, setFormdata] = useState({
    name:null,
    datebirth:null,
    profession:null,
    pan:null,
    telephone:null,
    mobile:null,
    address:null,
    email:null,
    pin_code:null,
    state:null,
    whatsApp_Link:null,
    password:null,
    confirmpassword: null
  });

  
useEffect(()=>{
     
   

},[])


async function getDistributorData(){

  //Disable PAN Field 
  const inputElementpan = document.getElementsByName('pan', 'text');
    
    if (inputElementpan.length) {
        inputElementpan[0].disabled  = true;
    }



    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${url_}/all/distributorbyid/${distributor_id}`,
      requestOptions
    );
    const result = await response.json();
    if (response.status === 200) {
      // console.log(result);
     
      
      setFormdata(result);
    }

    


}

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


        case "address":
          setFormdata({ ...formdata, [e.target.name]: e.target.value });
          if (!e.target.value) {
            setIsAddressNull(false);
          }
          else {
            setIsAddressNull(true);
          }
          break;


        case "pin_code":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic pin code validation
        const pinPattern = /^[1-9]{1}[0-9]{5}$/;
        setIsValidPIN(pinPattern.test(e.target.value));
        break;


        case "state":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsStateNull(false);
        }
        else {
          setIsStateNull(true);
        }
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

  const handleUpdateForm = async (event) => {
    console.log(formdata)
    event.preventDefault();

    if (!formdata.name) {
      setIsNameNull(false);
    }

    if (!formdata.profession) {
      setIsProfessionNull(false);
    }
    if(!formdata.address){
      setIsAddressNull(false)
    }
    if(!formdata.state){
      setIsStateNull(false)
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

   

    // Check Form Fields
    if (
      !formdata.name ||
      !formdata.profession ||
      !isValidPAN ||
      !isValidMobile ||
      !isValidEmail ||
      !isAddressNull||
      !isStateNull||
      !isValidPIN
     
    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {
      const url = `${url_}/updateDistribution/${distributor_id}`;
      console.log(url);

      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
            name: null,
            datebirth: null,
            profession: null,
            pan: null,
            telephone: null,
            mobile: null,
            address: null,
            email: null,
            pin_code: null,
            state: null,
            whatsApp_Link: null,
            password: null,
            confirmpassword: null,
          });
          swal.fire(
            "Success",
            "Information updated.",
            "success"
          );
          
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



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formdata.name) {
      setIsNameNull(false);
    }

    if (!formdata.profession) {
      setIsProfessionNull(false);
    }
    if(!formdata.address){
      setIsAddressNull(false)
    }
    if(!formdata.state){
      setIsStateNull(false)
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
      !isValidEmail ||
      !isAddressNull||
      !isStateNull||
      !isValidPIN||
      !isPasswordMatch
    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {
      const url = `${url_}/savedistributor`;
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
            name: null,
            datebirth: null,
            profession: null,
            pan: null,
            telephone: null,
            mobile: null,
            address: null,
            email: null,
            pin_code: null,
            state: null,
            whatsApp_Link: null,
            password: null,
            confirmpassword: null,
          });
          swal.fire(
            "Success",
            "Registration successful. You can log in now.",
            "success"
          );
          Navigate("/distributor/");
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
  function copyReferralLink(){
    // const refferalLink=`http://localhost:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
     const refferalLink=`http://taxko.in/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${formdata.pan}`;
     const copy = require('clipboard-copy')
     copy(refferalLink);
    
     swal.fire('Refferal link has been copied to clipboard');
   }


  return (
    <div>
      <div className={styles.right}>
        <div className={`${styles.regtitle} d-flex justify-content-around mb-2`}>
          {formStatus==="registration"?<span> DISTRIBUTOR REGISTRATION FORM</span>:
          formStatus==="update"&&<span> DISTRIBUTOR UPDATE FORM</span>}
         {formStatus==="registration" &&<Link to="/distributor/"  ><span>Login</span></Link>}
          {formStatus==="update" && <Link onClick={handleUpdateForm}><span>Update</span></Link> }
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

                  isAddressNull={formfield.name === "address" && isAddressNull}
                  isValidPIN={formfield.name === "pin_code" && isValidPIN}
                  isStateNull={formfield.name === "state" && isStateNull}
                  
                  isValidMobile={formfield.name === "mobile" && isValidMobile}
                  isValidPAN={formfield.name === "pan" && isValidPAN}
                  isPasswordMatch={formfield.name === "confirmpassword" && isPasswordMatch}
                  isProfessionNull={formfield.name === "profession" && isProfessionNull}
                />
              ))}
              {formStatus==="registration"&&<div className={`${styles.btn_submit} mt-4`}>
                <button type="submit" onClick={handleSubmit}>
                  SUBMIT
                </button>
              </div>}
            </div>
          </form>
        </div>
         
      </div>
      
      {/* {formStatus==="update"&&
      
      <PaymentDetails /> */}
      
    </div>
  );
}

export default DistributorRegistration;