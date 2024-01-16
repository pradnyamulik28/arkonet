import React from 'react';
import style from "./ClientDashboard.module.css";

const RecentUploadsFile = (props) => {
  return (
    <div className={`${style.uploadation}`}>
      <div className={`${style.leftdear}`}>
        <div className={`${style.licon}`}>
          <h1>{props.lastUploadedPdffileType === "pdf" ? <i className="fa-solid fa-file-pdf" style={{ color: "#ff0000" }} onClick={props.viewLastUploadedFile}></i>
            : <i className="fa-solid fa-image" style={{ color: '#ff1100' }} onClick={props.viewLastUploadedImage}></i>}

          </h1>
        </div>
        <div className={`${style.ricon}`}>
          <div className={`${style.uptext} `}>
            <p style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)", fontWeight: "bold", marginBottom: "0.4rem" }}>{props.lastUploadedPdffileName}</p>
          </div>
          <div className={`${style.lowtext} `}>
            <p style={{ color: "grey", fontSize: "0.9em" }}>{props.lastUploadedPdfDate}</p>
          </div>
        </div>
      </div>
      <div className={`${style.rightdear}`}>
        <p className={`${style.p4}`} style={{ color: "grey" }}>{props.lastUploadedPdfsize}</p>
      </div>
    </div>
  );
}

export default RecentUploadsFile;
