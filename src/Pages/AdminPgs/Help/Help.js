import React from 'react';
import style from './Help.module.css';
import arkonet from '../../../Images/Arkonet.jpg'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Help = () => {
  const Navigate = useNavigate();
  swal("Success", "Coming Soon....", "success");
  Navigate(-1);
  return (
    <div>
      <div class={style.logo1}>
        <img src={arkonet} alt="Logo" />
      </div>
      <div class="info">
        <h3>
          <p>Welcome to the world of the Internet! The Internet is a global network that connects millions of computers, enabling communication, information sharing, and access to a vast array of resources. It has revolutionized the way we live, work, and interact.</p>
          <p>From browsing websites to sending emails, streaming videos, and connecting through social media, the Internet has become an integral part of modern society.</p>
        </h3>
        <Link to={'/admin/'} style={{ color: 'blue', fontSize: '20px' }}>Click here to login.</Link>
      </div>
    </div>
  );
}

export default Help;
