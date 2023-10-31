import React from 'react';
import styles from './Gst.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { url_ } from '../../../Config';

const Gst = () => {
  const Navigate = useNavigate();
  const clientid = useLocation().state.clientId;
  const clientname = useLocation().state.clientname;
  const clientpan = useLocation().state.clientpan;


  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

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



  const sendCountData = async (year) => {

    const shortYear = (year + 1).toString().slice(-2);
    const yearRange = `${year}-${shortYear}`;





    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const raw = JSON.stringify({
      "userid": user_id,
      "clientid": clientid,
      "accountyear": yearRange,
      "filednotfiled": "No"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/saveData`, requestOptions);
      const result = await response.text();
      console.log(result);
      Navigate('gstrfolder', {
        state: {
          ClientID: clientid,
          Year: yearRange
        },
      });

    } catch (error) {
      console.error('An error occurred while sending count data:', error);
    }

    console.log(yearRange)
  };

  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 mt-5" id={styles.maindiv}>
          <h1 className='d-flex align-items-center'>
            <div className='text-primary' style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
              &#8617;&nbsp;
            </div>
            <b className='text-primary'>GST</b>
          </h1>
          <div className="row">
            {lastFiveYearsArray.map((year, index) => (
              <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div onClick={() => sendCountData(year)} className={styles.folderlink}> {/* Pass the year to SendData */}
                  <div className={`${styles.card} ${styles[`card${index + 1}`]}`} id={styles.card1}>
                    <div className={styles.icon}>
                      <p className={styles.icons}>
                        <i className={`bi bi-folder-fill ${getFolderColor(index)}`} id={styles.icon_left}></i>
                        <i className={`fa-solid fa-ellipsis-vertical ${getFolderColor(index)}`} id={styles.icon_right}></i>
                      </p>
                    </div>
                    <div className={`${getFolderColor(index)} ${styles.cont}`}>
                      <h5>F.Y {year}-{(year + 1).toString().slice(-2)}</h5>
                    </div>
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

export default Gst;
