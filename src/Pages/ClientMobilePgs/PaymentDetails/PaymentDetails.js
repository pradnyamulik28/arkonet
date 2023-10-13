import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./PaymentDetails.module.css";
import { url_ } from "../../../Config";
import notavailable from "../../../Images/notavailable.jpg";

function PaymentDetails() {

  const user_id=useLocation().state.user_id;
  const [bankDetails, setBankDetails] = useState({
    qrCode:notavailable,
    upiId: "",
    bank_name: "",
    accountName: "",
    accountNumber: "",
    ifsc: "",
  });
  const storedToken = window.localStorage.getItem("jwtToken");
  
  
useEffect(()=>{
  // console.log("FEtch")
  fetchBankDetails();
},[]);

  async function fetchBankDetails(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

 fetch(`${url_}/getclientpaymentDetails/${user_id}`, requestOptions)
  .then(response => response.json())
  .then(data => {
    //console.log(data.paymentDetails.qrCode)
    
    setBankDetails({
    qrCode:`data:image/png;base64,${data.paymentDetails.qrCode}`,
    upiNumber:data.paymentDetails.upiId,//data.PaymentDetails.upiNumber,
    upiId: data.paymentDetails.upiId,
    bank_name: data.paymentDetails.bank_name,
    accountName: data.paymentDetails.accountName,
    accountNumber: data.paymentDetails.accountNumber,
    ifsc: data.paymentDetails.ifsc
    })
  })
  .catch(error => console.log('error', error));
  }



  async function handlePayment(){

  }
  return (
    <div className={`${style.container}`}>
      <h2>Payment Details</h2>
      <h5>QR Code</h5>
      <img
        className={`${style.qrcode}`}
        src={bankDetails.qrCode}
        alt="UPI QR Code"
      />
     

      <h5>UPI Number</h5>
      <p>{bankDetails.upiNumber}</p>

      <h5>UPI ID</h5>
      <p>{bankDetails.upiId}</p>

      <div className={`${style.bank_details}`}>
        <h2>Bank Details</h2>
        <p>
          <span>Bank Name:</span> {bankDetails.bank_name}
        </p>
        <p>
          <span>Account Number:</span> {bankDetails.accountNumber}
        </p>
        <p>
          <span>Account Name:</span> {bankDetails.accountName}
        </p>
        <p>
          <span>IFSC Number:</span> {bankDetails.ifsc}
        </p>
      </div>
      <button type="button" className={`${style.button}`} onClick={handlePayment}>Proceed..</button>
    </div>
  );
}

export default PaymentDetails;
