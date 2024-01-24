

import React from 'react';
import styles from './GstrFolder.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';


const GstrFolder = () => {
  const Navigate = useNavigate();
  const clientid = useLocation().state.ClientID;
  const year = useLocation().state.Year;





  const folderTitle = ["GSTR-1", "GSTR-2", "GSTR-3B", "GSTR-9", "GSTR-9A"];

  const getFolderColor = (index) => {
    const colors = ['text-primary', 'text-danger', 'text-warning', 'text-success', 'text-secondary', 'text-info'];
    return colors[index % colors.length];
  };




  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GoTo = (title) => {
    Navigate('gstrfileupload', {
      state: {
        clientId: clientid,
        Year: year,
        Title: title
      },
    })

  }
  return (
    <div className="container">
      <div className='row'>
      <h2 className={`mt-5 d-flex align-items-center ${styles.h1}`}>
            <div className='text-black' style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
              &#8617;&nbsp;
            </div>
            <b className='text-black'>GST</b>
          </h2>
          {/* <span className='text-primary ml-5'>F.Y {year}</span> */}
      </div>
             
         
          <div className="row">
          <div className={`mt-2 ${styles.maindiv}`} id={styles.maindiv}>          
          <div className={`${styles.folder_div}`}>
            {folderTitle.map((title, index) => (              
                <div className={styles.folderlink} onClick={() => GoTo(title)}> {/* Pass the year to SendData */}
                  <div className={`${styles.card} ${styles[`card${index + 1}`]}`} id={styles.card1}>
                    <div className={styles.icon}>
                      <p className={styles.icons}>
                        <i className={`bi bi-folder-fill ${getFolderColor(index)}`} id={styles.icon_left}></i>
                        <i className={`fa-solid fa-ellipsis-vertical ${getFolderColor(index)}`} id={styles.icon_right}></i>
                      </p>
                    </div>
                    <div className={`${getFolderColor(index)} ${styles.cont}`}>
                      <h5>{title}</h5>
                    </div>
                  </div>
                </div>              
            ))}
            </div>
            </div>
          </div>        
    </div>
  );
}

export default GstrFolder;
