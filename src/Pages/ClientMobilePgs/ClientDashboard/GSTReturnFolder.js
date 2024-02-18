import React from 'react';
import style from "./ClientDashboard.module.css";
import { Link } from 'react-router-dom';

const GSTReturnFolder = (props) => {
  return (
    <div className='col-6' id="kyc" onClick={props.handleCardClick}>
      <Link >
        <div className={`${style.uniclass} ${style.card6}`}>
          <div className={`${style.icons} `}>
            <div className={`${style.lefticons} `}>
              <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#d276f8" }}></i></h1>
            </div>
            <div className={`${style.righticons} `}>
              <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "#cb60f7" }} ></i></h4>
            </div>
          </div>
          <div className={`${style.textual} `}>
            <div className={`${style.uptext} `}>
              <h5 style={{ color: "#cb60f7", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>GST Return</h5>
            </div>
            <div className={`${style.lowtext} `}>
              <p style={{ color: "#cb60f7", fontSize: "0.9em" }}>{props.lastUpdateDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GSTReturnFolder;
