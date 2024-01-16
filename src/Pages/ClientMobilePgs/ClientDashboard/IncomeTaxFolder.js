import React from 'react';
import style from "./ClientDashboard.module.css";
import { Link } from 'react-router-dom';

const IncomeTaxFolder = (props) => {
  return (
    <div className='col-6' id="clientincometax" onClick={props.handleCardClick}>
      <Link  >
        <div className={`${style.uniclass} ${style.card1}`}>
          <div className={`${style.icons} `}>
            <div className={`${style.lefticons} `}>
              <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#22b0b2" }}></i></h1>
            </div>
            <div className={`${style.righticons} `}>
              <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "#36dce2" }} ></i></h4>
            </div>
          </div>
          <div className={`${style.textual} `}>
            <div className={`${style.uptext} `}>
              <h5 style={{ color: "#54a280", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Income Tax</h5>
            </div>
            <div className={`${style.lowtext} `}>
              <p style={{ color: "#36dce2", fontSize: "0.9em" }}>{props.lastUpdateDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default IncomeTaxFolder;
