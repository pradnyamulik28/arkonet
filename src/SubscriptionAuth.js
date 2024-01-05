// SubAuth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { url_ } from './Config';

const SubscriptionAuth = (props) => {
  const navigate = useNavigate();


  const user_id = window.localStorage.getItem('user_id');
  const userpan = window.localStorage.getItem('pan');
  const storedToken = window.localStorage.getItem('jwtToken');

  useEffect(() => {
    CheckUserSubPlanStatus();
    if (!localStorage.length > 0) {
      navigate('/admin/');
    }
  }, [navigate]);


  const CheckUserSubPlanStatus = async () => {
    try {
      // Ensure these variables are defined and accessible in this scope
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/flashmessage/Subscription/${userpan}`, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


  const Cmp = props.Cmp;

  return (
    <>
      <Cmp />
    </>
  );
}

export default SubscriptionAuth;

