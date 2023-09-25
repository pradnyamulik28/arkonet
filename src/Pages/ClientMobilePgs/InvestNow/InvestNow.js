import style from "./InvestNow.module.css";
import profile from "../../../Images/profile.png";
import HI from "../../../Images/cards.png";
import LI from "../../../Images/coininhand.png";
import handrupee from "../../../Images/handrupeecircle.png";
import MF from "../../../Images/percentageraise.png";
import NPS from "../../../Images/sackinhand.png";
import FD from "../../../Images/ticksack.png";
import { Link, useNavigate } from "react-router-dom";
function InvestNow() {
  const navigate = useNavigate();
  return (
    <div className={`${style.row}`}>
      {/* Background */}

      {/* Mobile Viewport */}
      <div
        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.mobileport}`}
      >
        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          <div className={`${style.leftear}`}>
            <Link
              to="/client/clientpasscheck/clientdocfolder"
              state={{ clientid: localStorage.getItem("clientId") }}
              style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
            >
              {" "}
              &lt; &nbsp;&nbsp;InvestNow
            </Link>
            <i
              className={`fa-regular fa-bell fa-bell-large`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </div>
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* Ad Starts */}
        <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Adport}`}
        >
          <img className={`${style.img}`} src={profile} alt="changeimage" />
          <div className={`${style.details}`}>
            <h5>SAVE TAX</h5>
            <h6>Ask HOW?</h6>
            <h6>Call On 9090990909</h6>
          </div>
        </div>
        {/* Ad Ends......................................................................................................... */}

        <div className={`row ${style.components}`}>
          {/* FD Component Starts */}
          <div
            className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
          >
            <a href="##" className={`${style.fd}`}>
              <img src={FD} alt="image1" />
              <p>Fixed Deposit</p>
            </a>
          </div>
          {/* FD Component Ends.................................................................................... */}

          {/* National Pension Sceme Component Starts */}
          <div
            className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
          >
            <a href="##" id="npsa" className={`${style.nps}`}>
              <img src={NPS} alt="image2" />
            </a>
            <label htmlFor="npsa" className={`${style.label}`}>
              <p>National Pension Scheme</p>
            </label>
          </div>
          {/* National Pension Sceme Component Ends.................................................. */}

          {/* Mutual Fund Component Starts */}
          <div
            className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
          >
            <a href="##" className={`${style.mf}`}>
              <img src={MF} alt="image3" />
              <p>Mutual Fund</p>
            </a>
          </div>
          {/* Mutual Fund Component Ends..................................................................... */}

          {/* Life Insurance Component Starts */}
          <div
            className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
          >
            <a href="##" className={`${style.li}`}>
              <img src={LI} alt="image4" />
              <p>Life Insurance</p>
            </a>
          </div>
          {/* Life Insurance  Component Ends.................................................................... */}

          {/* Health Insurance Component Starts */}
          <div
            className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
          >
            <a href="##" className={`${style.hi}`}>
              <img src={HI} alt="image5" />
              <p>Health Insurance</p>
            </a>
          </div>
          {/* Health Insurance  Component Ends.................................................................... */}
        </div>
      </div>
    </div>
  );
}

export default InvestNow;
