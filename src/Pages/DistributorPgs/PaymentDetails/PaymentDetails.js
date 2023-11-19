import styles from "./PaymentDetails.module.css"
import profileimg from '../../../Images/profile.png'
import InputField from "../../../components/InputField/InputField";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { url_ } from "../../../Config";

function PaymentDetails(){
    const user_id = window.localStorage.getItem('user_id');
    const storedToken = window.localStorage.getItem('jwtToken');
  
  
  
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
  
      if (e.target.type === "file") {
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.files[0] });
  
  
      } else {
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
          await Swal.fire(
            'Success.',
            `${result}`,
            'success'
          )
          window.location.reload();
  
        } else {
          Swal.fire(
            'Failed!',
            `Failed to save data!!!`,
            'error'
          )
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
          await Swal.fire(
            'Success.',
            `${result}`,
            'success'
          )
  
  
        } else {
          Swal.fire(
            'Failed!',
            `Failed to update data!!!`,
            'error'
          )
        }
      } catch (error) {
        console.log('error', error);
      }
    };
  
    const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;
  
    return(
        <>
        <div className="row">
        <div className={`${styles.paytitle}`}>PAYMENT DETAILS</div>
      </div>
      <div className={` row ${styles.paymentres} m-2  `}>
        <div className={`${styles.proimg}`} >

          <div className={styles.file_upload}>
            <div className={styles.image_upload_wrap}>
              <input className={styles.file_upload_input} type='file' name='profilepic' /*onChange={bankhandleChange}*/ />
              <div className={styles.drag_text}>
                <img src={imageSrc} alt="Profile Image" />
                <h4>Upload File</h4>
                {/* <h6>{image_name}</h6> */}
              </div>
            </div>
          </div>

        </div>
        <div className='ml-5'>
          <div className={`${styles.qrupload} mb-4 `}>
            <label >QR CODE</label>
            <input type="file" name="qrcode" id="" className={`${styles.qrinput}`} onChange={bankhandleChange} />
          </div>
          <div className={`${styles.upiid} `}>
            <InputField lblname='UPI ID' color='red' placeholder='Enter your UPI ID' name='upiid' value={bankdetails.upiid} onChange={bankhandleChange} />
            <InputField lblname='UPI Number' color='red' placeholder='Enter your UPI Number' name='upinumber' value={bankdetails.upinumber} onChange={bankhandleChange} />

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
      </>
    )
}
export default PaymentDetails;