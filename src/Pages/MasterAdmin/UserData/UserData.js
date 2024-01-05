import React, { useState } from 'react';
import DropDown from '../../../components/DropDown/DropDown'
import Uprofesion_obj from '../../../ObjData/AProf.json'
import States_obj from '../../../ObjData/States.json'

import swal from 'sweetalert';
import { url_ } from '../../../Config';
import styles from './UserData.module.css';
import profileimg from '../../../Images/profile.png'
import InputField from '../../../components/InputField/InputField';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const UserData = () => {

  const Navigate = useNavigate()
  const user_id = useLocation().state.UserId;

  const storedToken = window.localStorage.getItem('jwtToken');

  const [values, setValues] = useState({
    name: "",
    datebirth: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    office_Address: "",
    pin_code: "",
    state: "",
    whatsApp_Link: "",
    investNow_Email: "",
    userid: `${user_id}`,
  })


  useEffect(() => {
    GetClient();
    Getbankdetails();

  }, [])



  function GetClient() {
    console.log(user_id)
    try {

      fetch(`${url_}/getuserByid/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          setValues({
            name: res.name,
            datebirth: res.datebirth,
            profession: res.profession,
            pan: res.pan,
            telephone: res.telephone,
            mobile: res.mobile,
            email: res.email,
            office_Address: res.office_Address,
            pin_code: res.pin_code,
            state: res.state,
            whatsApp_Link: res.whatsApp_Link,
            investNow_Email: res.investNow_Email,
            userid: res.regId,
          })

        })
        .catch(error => {


          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${url_}/updateuser/${user_id}`;
    console.log(url);
    console.log(values)
    try {

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },

        body: JSON.stringify(values),
      })
        .then(res => {
          swal("Success", "Data updated successfully.", "success");
          window.history.back();
          console.log(values)
        })
        .catch(error => {
          swal("Failed!", " Failed to update.!!!!", "error");
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }




  ////////////////////////////////////////////////////////////////////////////////////


  const [bankdatalength, setBankDataLength] = useState();
  const [imgcontent, setImgContent] = useState();
  const [image_name, setImage_name] = useState(null);
  const [bankdetails, setBankdetails] = useState({

    profilepic: null,
    qrcode: null,
    upiid: "",
    upinumber: "",
    bankname: "",
    accountname: "",
    accountnumber: "",
    ifsc: ""
  });

  const bankhandleChange = (e) => {





    const { name, value } = e.target;


    if (name === "upinumber") {
      if (value.length === 10) {

        const mobilePattern = /^[789]\d{9}$/;
        if (mobilePattern.test(e.target.value)) {
          setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
          e.target.value = value.replace(/\D/g, "");
        } else {

          Swal.fire("Enter valid UPI Number!")

        }
      }

    }

    //=============================================================================
    switch (name) {


      case "accountnumber":
        setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        break;



      case "upinumber":

        setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");



        break;

      case "qrcode":
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.files[0] });
        break;
      case "profilepic":
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.files[0] });
        break;



      default:
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.value });
    }


    // console.log(bankdetails)
  };


  function Getbankdetails() {
    try {

      fetch(`${url_}/getpaymentDetails/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          const objectPropertyCount = Object.keys(res).length;
          setBankDataLength(objectPropertyCount);
          setImgContent(res.content)
          setBankdetails({
            profilepic: res.paymentDetails.imageName,
            upiid: res.paymentDetails.upiId,
            upinumber: res.paymentDetails.upiNumber,
            bankname: res.paymentDetails.bank_name,
            accountname: res.paymentDetails.accountName,
            accountnumber: res.paymentDetails.accountNumber,
            ifsc: res.paymentDetails.ifsc,
            qrcode: res.paymentDetails.qrcode
          })

        })
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  const SaveBankData = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${storedToken}`
    );

    var formdata = new FormData();
    formdata.append("userid", user_id);
    formdata.append("QR", bankdetails.qrcode);
    formdata.append("Bank_Name", bankdetails.bankname);
    formdata.append("AccountName", bankdetails.accountname);
    formdata.append("AccountNumber", bankdetails.accountnumber);
    formdata.append("IFSC", bankdetails.ifsc);
    formdata.append("UPI_ID", bankdetails.upiid);
    formdata.append("UPI_Number", bankdetails.upinumber);
    formdata.append("image", bankdetails.profilepic);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${url_}/paymentDetails`, requestOptions);
      const result = await response.text();
      console.log(result);
      if (response.status === 200) {
        await swal(
          'Success.',
          `${result}`,
          'success'
        )
        window.location.reload();

      } else {
        swal(
          'Failed!',
          `Failed to save data!!!`,
          'error'
        )
        console.log(formdata)
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const UpdateBankData = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var formdata = new FormData();
    formdata.append("image", bankdetails.profilepic);
    formdata.append("QR", bankdetails.qrcode);
    formdata.append("Bank_Name", bankdetails.bankname);
    formdata.append("AccountName", bankdetails.accountname);
    formdata.append("AccountNumber", bankdetails.accountnumber);
    formdata.append("IFSC", bankdetails.ifsc);
    formdata.append("UPI_Number", bankdetails.upiid);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/UpdatePaymentDetails/${user_id}`, requestOptions);
      const result = await response.text();
      console.log(result);
      if (response.status === 200) {
        await swal(
          'Success.',
          `${result}`,
          'success'
        )


      } else {
        swal(
          'Failed!',
          `Failed to update data!!!`,
          'error'
        )
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GOTOUserSubPlan = (id, pan) => {
    Navigate('userSubPlan', {
      state: {
        USERSUBID: id,
        USERSUBPAN: pan

      },
    });

  }
  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;

  return (
    <div>
      <div className={styles.right}>
        <div className={`${styles.regtitle} d-flex justify-content-around align-items-center m-4`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <h3> C.A UPDATE FORM</h3>
          <div className={`${styles.btn_submit} `}>
            <button type="submit" onClick={handleSubmit}>
              UPDATE
            </button>
          </div>
        </div>
        <div className={styles.regform}>
          <form action="" onSubmit={handleSubmit}>
            <div className={styles.first}>
              <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={values.name} />
              <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='datebirth' value={values.datebirth} />
              <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={values.profession} />
              <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} disabled={true} />
              <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={values.telephone} maxLength='11' />
              <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} maxLength='10' />
              <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={values.email} />
              <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Address' name='office_Address' value={values.office_Address} />
              <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_code' value={values.pin_code} />
              <DropDown value_array={States_obj} lblname='State' name='state' value={values.state} onChange={handleChange} />
              <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='Whatsapp Link' name='whatsApp_Link' value={values.whatsApp_Link} />
              <InputField placeholder='Enter your investnow email' onChange={handleChange} lblname='InvestNow Email' name='investNow_Email' value={values.investNow_Email} />
            </div>

          </form>
        </div>
      </div>

      <div className="row">
        <div className={`${styles.paytitle}`}>PAYMENT DETAILS</div>
      </div>
      <div className={` row ${styles.paymentres} m-2  `}>
        <div className={`${styles.proimg} d-flex flex-column align-items-center`} >

          <div className={styles.file_upload}>
            <div className={styles.image_upload_wrap}>
              <input className={styles.file_upload_input} type='file' name='profilepic' onChange={bankhandleChange} />
              <div className={styles.drag_text}>
                <img src={imageSrc} alt="Profile Image" />
                <h4>Upload File</h4>
              </div>
            </div>
          </div>
          <button className='mt-2' onClick={() => GOTOUserSubPlan(user_id, values.pan)} >SUBSCRIPTION</button>
        </div>
        <div className='ml-5'>
          <div className={`${styles.qrupload} mb-4 `}>
            <label >QR CODE</label>
            <input type="file" name="qrcode" id="" className={`${styles.qrinput}`} onChange={bankhandleChange} />
          </div>
          <div className={`${styles.upiid} `}>
            <InputField lblname='UPI ID' color='red' placeholder='Enter your UPI ID' name='upiid' value={bankdetails.upiid} onChange={bankhandleChange} />
            <InputField lblname='UPI Number' color='red' placeholder='Enter your UPI Number' name='upinumber' value={bankdetails.upinumber} onChange={bankhandleChange} maxLength={10} />

          </div>
          <div className={`${styles.detailtitle}`}>BANK DETAILS</div>
          <div className="accname">
            <InputField lblname='BANK NAME' color='red' placeholder='Enter bank name' name='bankname' value={bankdetails.bankname} onChange={bankhandleChange} />
            <InputField lblname='ACCOUNT NAME' color='red' placeholder='Enter account name' name='accountname' value={bankdetails.accountname} onChange={bankhandleChange} />
            <InputField lblname='ACCOUNT NUMBER' color='red' placeholder='Enter account number' name='accountnumber' value={bankdetails.accountnumber} onChange={bankhandleChange} />
            <div className={`${styles.ifsc} `}>
              <InputField lblname='IFSC' color='red' placeholder='Enter IFSC code' name='ifsc' value={bankdetails.ifsc} onChange={bankhandleChange} />

              {bankdatalength > 0 ?
                (
                  <button onClick={UpdateBankData}>UPDATE</button>
                ) : (
                  <button onClick={SaveBankData}>SAVE</button>
                )}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default UserData;
