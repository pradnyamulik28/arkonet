import React from 'react';
import { useLocation } from 'react-router-dom';

const HelpClientMailView = () => {
  const name = useLocation().state.ClientName;
  const quarray = useLocation().state.ClientQuarry;
  const details = useLocation().state.ClientDetails;
  const date = useLocation().state.MailDate;
  
  const style={
    border: "15px solid #ffd4018f",
    margin:"2rem 2rem",
    minWidth:"350px",
  }
  const mobileStyles = {
    style: {
      border: "10px solid #ffd4018f",
      margin:"2rem 2rem",
    }
  };
  return (
    <div style={style}>
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: " 4rem auto" }}>
        <p>
          <h6>From,</h6>
          <h5><b>{name}</b></h5>
        </p>
        <br />
        <br />
        <p>
          <h6>Query: <b>{quarray}</b></h6>
        </p>
        <br />

        <h6>Details:</h6>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{details}</b></p>
        <br />
        <small>Date: <b>{date}</b></small>

        <hr />

        {/* <p style={{fontsize: "14px; color: #888;">This email was sent by [Your Company Name]. Please do not reply to this email.</p> */}
      </div>
    </div>
  );
}

export default HelpClientMailView;
