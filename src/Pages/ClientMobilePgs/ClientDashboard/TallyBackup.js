import React from 'react';
import style from "./ClientDashboard.module.css";
import { Link } from 'react-router-dom';

const TallyBackup = (props) => {
  return (
    <div className='col-6' id="tallybackup" onClick={props.handleCardClick}>
      <Link >
        <div className={`${style.uniclass} ${style.card5}`}>
          <div className={`${style.icons} `}>
            <div className={`${style.lefticons} `}>
              <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "rgb(85 216 173)" }}></i></h1>
            </div>
            <div className={`${style.righticons} `}>
              <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "rgb(85 216 173)" }} ></i></h4>
            </div>
          </div>
          <div className={`${style.textual} `}>
            <div className={`${style.uptext} `}>
              <h5 style={{ color: "rgb(85 216 173)", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Tally Backup</h5>
            </div>
            <div className={`${style.lowtext} `}>
              <p style={{ color: "rgb(85 216 173)", fontSize: "0.9em" }}>{props.lastUpdateDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TallyBackup;
