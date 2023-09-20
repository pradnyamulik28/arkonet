
import React from 'react';
import styles from './ClientDocFolder.module.css';
import { Link } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useLocation,useNavigate } from 'react-router-dom'


const ClientDocFolder = () => {
  const  id  = useLocation().state.clientid; //Get Client Id parameter from route
  const navigate = useNavigate();


  function getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];

    for (let i = 0; i < 5; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(currentYear - i);
    }

    return lastFiveYears;
  }

  const lastFiveYearsArray = getLastFiveYears();

  const getFolderColor = (index) => {
    const colors = ['text-primary', 'text-danger', 'text-warning', 'text-success', 'text-secondary', 'text-info'];
    return colors[index % colors.length];
  };

  function handelLogout(e) {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/client/", { replace: true });
  }


  return (
    <div className={`${styles.outercontainer}`}>
    <div className={`container mt-3 ${styles.maincontainer}`}>
      <div className="row" >
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " id={styles.maindiv}>
          <h1><b /*onClick={(e) => {
                            e.preventDefault();
                            navigate(-1, {
                              state: { clientid: id},
                            });
                          }}*/  >                        
                         &nbsp;Income Tax
                         </b> </h1>
          <div className="row">
            {lastFiveYearsArray.map((year, index) => (
              <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                <Link to={`clientfileview`}  
                className={`${styles.linktab}`} 
                state={{clientid:id,year:`${year - 1}-${year.toString().slice(-2)}`}}> {/* Pass the year to SendData */}
                  <div className={`${styles.card} ${styles[`card${index + 1}`]}`} id={styles.card1}>
                    <div className={styles.icon}>
                      <p className={styles.icons}>
                        <i className={`bi bi-folder-fill ${getFolderColor(index)}`} id={styles.icon_left}></i>
                        <i className={`fa-solid fa-ellipsis-vertical ${getFolderColor(index)}`} id={styles.icon_right}></i>
                      </p>
                    </div>
                    <div className={`${getFolderColor(index)} ${styles.cont} h6`}>
                      <h5>A.Y {year - 1}-{year.toString().slice(-2)}</h5>
                      <p>Financial Year {year - 1}-{year.toString().slice(-2)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    
    <div onClick={handelLogout} className={`  ${styles.logout}`} >
      &nbsp;<svg 
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 14 16"
                          viewBox="0 0 14 16"
                          width="24"
                          height="24"
                        >
                          <path
                            fill="#ffd301"
                            fill-rule="evenodd"
                            d="M10,3.182v1.49c0,0.276,0.182,0.485,0.385,0.672C11.374,6.255,12,7.552,12,9
		c0,2.757-2.243,5-5,5s-5-2.243-5-5c0-1.448,0.626-2.745,1.615-3.656C3.818,5.157,4,4.964,4,4.688V3.182
		c0-0.276-0.204-0.405-0.444-0.269C1.434,4.114,0,6.388,0,9c0,3.866,3.135,7,7,7s7-3.134,7-7c0-2.612-1.434-4.886-3.556-6.087
		C10.204,2.776,10,2.905,10,3.182z"
                            clip-rule="evenodd"
                          />
                          <path
                            fill="#ffd301"
                            fill-rule="evenodd"
                            d="M7,7c0.553,0,1-0.447,1-1V1c0-0.553-0.447-1-1-1S6,0.447,6,1v5C6,6.553,6.447,7,7,7z"
                            clip-rule="evenodd"
                          />
                        </svg>&nbsp;Logout
                      </div>
                      </div>
    </div>
  );
}

export default ClientDocFolder;
