import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DemoImage from '../../../Images/Taxko.jpg'
import style from './Subscription.module.css'
import { url_ } from '../../../Config';
import PaymentGateway from '../../../PaymentGateway';
import samplepdf from "../../../Files/payment.pdf";

const NewSubcription = () => {
  const Navigate = useNavigate();

  const U_Name = window.localStorage.getItem('user_name');
  const U_Mobile = window.localStorage.getItem('mobile');
  const U_Email = window.localStorage.getItem('email');
  const U_Pan = window.localStorage.getItem('pan');
  const userid = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const { subs_pack, subs_amount, no_of_client } = useLocation().state;

  // const blob = new Blob([DemoImage], { type: 'application/pdf' });

  // // Create a File object from the blob
  // const PAYMENT_PDF = new File([blob], 'Payment_Successful.pdf');

  const submitAcknowledgement = async () => {

    const blob = new Blob([samplepdf], { type: 'application/pdf' });

    // Create a File object from the blob
    const emptyFile = new File([blob], 'empty_file_attatchment.pdf')


    const message = `Dear Accounts Team,
    Greeting from TAXKO!

    I hope this message finds you well. 

    Our client ${localStorage.getItem("user_name")}, has made payment for ${subs_pack} subcription pack worth Rs${subs_amount}. 
    Following is the attachment of payment acknowledgement.Kindly activate the subscription as soon as possible.

    Best regards,

    ${localStorage.getItem("user_name")},
    Contact no : ${localStorage.getItem("mobile")}`;


    const formattedMsg = message.replace(/\n/g, '<br>')
    // console.log(message)


    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var formdata = new FormData();
      formdata.append("aceesclient", no_of_client);
      formdata.append("userid", userid);
      formdata.append("attachmentContent", emptyFile);
      formdata.append("subscriptionprice", subs_amount);
      formdata.append("subscriptiontype", subs_pack);
      formdata.append("subject", "paymnet");
      formdata.append("text", formattedMsg);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/Subscription/${U_Pan}`, requestOptions)
      const result = await response.text();
      if (response.status === 200) {
        // console.log("mail sent...");
        // console.log(no_of_client);
        // console.log(userid);
        // console.log(emptyFile);
        // console.log(subs_amount);
        // console.log(subs_pack);
        // console.log("Payment Acknowledgement");
        // console.log(formattedMsg);
        // console.log(submitAcknowledgement);
        // console.log(result);
        // window.location.reload();
        localStorage.clear();
        Navigate('/admin')

      } else {
        console.log(result);

      }
    } catch (error) {
      console.log(error)
    }
  }


  // const handlepayment = () => {

  //   const blob = new Blob([samplepdf], { type: 'application/pdf' });

  //   // Create a File object from the blob
  //   const emptyFile = new File([blob], 'empty_file_attatchment.pdf')


  //   const message = `Dear Accounts Team,
  //   Greeting from TAXKO!

  //   I hope this message finds you well. 

  //   Our client ${localStorage.getItem("user_name")}, has made payment for ${subs_pack} subcription pack worth Rs${subs_amount}. 
  //   Following is the attachment of payment acknowledgement.Kindly activate the subscription as soon as possible.

  //   Best regards,

  //   ${localStorage.getItem("user_name")},
  //   Contact no : ${localStorage.getItem("mobile")}`;


  //   const formattedMsg = message.replace(/\n/g, '<br>')
  //   // console.log(message)
  //   console.log(no_of_client);
  //   console.log(userid);
  //   console.log(emptyFile);
  //   console.log(subs_amount);
  //   console.log(subs_pack);
  //   console.log("Payment Acknowledgement");
  //   console.log(formattedMsg);
  //   console.log(submitAcknowledgement);
  // }
  return (

    <div style={{
      height: "auto",
      width: "70%",
      margin: "10%",
      boxShadow: "gray 1px 1px 10px",
      marginTop: "2rem",
      marginBottom: "2rem",
      borderRadius: "50px",
    }}>
      <div className='d-flex flex-column align-items-center '>
        <h2 className='d-flex justify-content-center mt-4 mb-3' style={{ fontSize: "2em" }}>
          <b>Order Details</b>
        </h2>
      </div>
      <hr style={{ backgroundColor: "#ffd401", height: "2px", borderRadius: "5px" }} />

      <div className='d-flex justify-content-center'>
        <div style={{ width: "80%" }}>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Name</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Name}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>PAN</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Pan}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Email</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Email}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Contact</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Mobile}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Pack Type</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{subs_pack}</span>
          </div>

          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Amount</h5></span>
            <span className='col-2 text-center'><h3>:</h3></span>
            <span className='col-6 text-center ' style={{ fontSize: "1.5em" }}>{subs_amount}/-</span>
          </div>
        </div>
      </div>

      <PaymentGateway
        ClientContact={U_Mobile}
        ClientEmail={U_Email}
        ClientName={U_Name}
        ClientPan={U_Pan}
        Amount={subs_amount}
        FunctionToExcute={submitAcknowledgement}
      >
        <div className='d-flex flex-column align-items-center '>
          <div className={`${style.btn} mb-5 d-flex justify-content-center mt-4`}>
            {/* <button className={`${style.button1}`} onClick={handlepayment} > */}
            <button className={`${style.button1}`}>
              Confirm Order
            </button>
          </div>
        </div>
      </PaymentGateway>
    </div>


  );
}

export default NewSubcription;
