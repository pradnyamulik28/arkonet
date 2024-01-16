// RazorpayComponent.js
import React from 'react';
import { key_id, url_ } from './Config';
// import { useNavigate } from "react-router-dom";
import TAXKO from '../src/Images/taxko_logo.jpeg'


const PaymentGateway = (props) => {
  // const Navigate = useNavigate();
  const storedToken = window.localStorage.getItem('jwtToken');

  const CName = props.ClientName;
  const CEmail = props.ClientEmail;
  const CContact = props.ClientContact;
  const CPan = props.ClientPan;
  const CAmount = props.Amount;

  const handlePayment = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      const response = await fetch(`${url_}/create-order?amount=${CAmount}&currency=INR`, requestOptions);
      const orderData = await response.text(); // Assuming the server responds with JSON
      // console.log(orderData)
      const razorpay = new window.Razorpay({
        key_id: key_id,
        order_id: orderData,
        name: "TAXKO", //your business name
        description: "Test Transaction",
        image: TAXKO,
        handler: async function (response) {
          // Handle the success callback
          console.log('Payment success:', response);

          FunctionCall(response);

          // window.location.reload();



        },
        prefill: {
          name: CName,
          email: CEmail,
          contact: CContact,
        },
        theme: {
          color: '#ffd400',
        },
      });


      razorpay.open();
    } catch (error) {
      console.log('error', error);
    }



    const FunctionCall = async (data) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${storedToken}`);

        const raw = JSON.stringify({
          order_id: data.razorpay_payment_id,
          payment_id: data.razorpay_order_id,
          signature: data.razorpay_signature,
          pan: CPan,
          amount: CAmount,
          name: CName,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          `${url_}/saveTransaction`,
          requestOptions
        );
        const result = await response.text();
        if (response.status === 200) {
          props.FunctionToExcute();
          // console.log(result);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log("error", error);
      }
    };




  };

  return (
    <span onClick={handlePayment}>
      {props.children}
    </span>
  );
};

export default PaymentGateway;
