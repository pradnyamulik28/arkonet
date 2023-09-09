import arkonet from "../../../Images/Arkonet.jpg";
import style from "./ClientLogin.module.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import swal from "sweetalert2";

function ClientLogin() {
  const Navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    UID: "",
  });


  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();

    //------------------Check the password status------------


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "pan": credentials.UID
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${url_}/client/isPasswordNull`, requestOptions)
      .then(response => {
        if (response.status === 404) {
          swal.fire("Failed!", "Invalid login credential !!!", "error");
          setCredentials({ UID: "", });
          // Handle 404 Not Found error here
          // For example: throw new Error('Resource not found');
        } else if (response.status === 401) {
          swal("Failed!", "Unauthorised !!!", "error");
          setCredentials({ UID: "", });
          // Handle 401 Unauthorized error here
          // For example: throw new Error('Unauthorized');
        }

        return response.json();
      })
      .then(result => {
        console.log(result)
        //Pass Password Status,clientpan) to next page
        Navigate(`clientpasscheck`,
          {
            state: {
              isPasswordNull: result.isPasswordNull,
              clientpan: credentials.UID
            }
          })
      })
      .catch(error => console.log('error', error));

  };

  return (
    <div className={`${style.outercontainer}`}>
      {/*  main class */}
      <div className={`${style.maincontainer}`}>
        {/* Header */}
        <div className={`${style.header}`}>
          <p id={`${style.welcome}`}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to
          </p>
          <h2>TAXKO</h2>
        </div>

        {/* Main Content */}
        <div className={`${style.inputs}`}>
          <form className={`${style.form}`}>
            <label htmlFor="UID" className={`${style.labels}`}>
              Client ID
            </label>
            <input
              type="text"
              id="UID"
              name="UID"
              placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Enter Your PAN"
              value={credentials.UID}
              onChange={handleChange}
              autoComplete="off"
              autoCapitalize='true'
            />

          </form>
        </div>

        {/* Button */}
        <div className={`${style.button}`}>
          <button type="button" className={`${style.login}`} onClick={handleLogin}>
            Next
          </button>
          {/* <a href="previous link" id={`${style.forgot}`}>
            <u>Forgot Password?</u>
          </a> */}
        </div>

        {/* Copyright */}
        <div className={`${style.copyright}`}>
          <p id={`${style.devs}`}>
            Developed & Managed by
          </p>
          <a href="https://www.arkonetglobal.com/"><img src={arkonet} alt="" id={`${style.arkonet}`} /></a>
          <a href="" id={`${style.social}`}>
            Follow us on
          </a>
          <div className={`${style.handles}`}>
            <a href="" id={`${style.instagram}`}>
              <i className="fa-brands fa-instagram" style={{ color: "#05022c" }}></i>
            </a>
            <a href="" id={`${style.twitter}`}>
              <i className="fa-brands fa-twitter" style={{ color: "#05022c" }}></i>
            </a>
            <a href="" id={`${style.facebook}`}>
              <i className="fa-brands fa-facebook-f" style={{ color: "#05022c" }}></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ClientLogin;