import styles from './DashBoard.module.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url_ } from '../../../Config';

const DashBoard = () => {
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const url = `${url_}/counts/${user_id}`;
  const [Totalclient, setTotalclient] = useState();
  const [TotalIncomeclient, setTotalIncomeclient] = useState();


  useEffect(() => {
    totalClient();
  }, []);

  function totalClient() {
    try {

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setTotalclient(data.totalClientCount)
          setTotalIncomeclient(data.incomeTaxClientCount)
          console.log("TC", data)

        })
        .catch(error => console.log(error));
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }





  return (



    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className={`card m-4 ${styles.cardd} text-center`} >
              <h2 className='ml-4'>&lt;</h2>
              <div className={`m-3 ${styles.right}`}>
                <h5 className={`card-title font-weight-bold ${styles.green}`}>FY 2023-24</h5>
                <div className={styles.count}>
                  <Link to="/tc" className={` card-link ${styles.black}`}>Total Clients<h6 className={`${styles.black} font-weight-bold`}>{Totalclient}</h6></Link>
                  <Link to="/tic" className={`card-link ${styles.green}  `}>Income Tax<h6 className={`${styles.black} font-weight-bold`}>{TotalIncomeclient}</h6></Link>
                </div>
                <Link to='/clientreg' ><input type="submit" value="ADD CLIENT" className={` ${styles.abtn}`} /></Link>
                <h6 className={`${styles.green} mt-3`}>As on date</h6>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-6">
            <div className={`card m-4 ${styles.cardd} text-center`} >
              <h2 className='ml-4'>&lt;</h2>
              <div className={`m-3 ${styles.right}`}>
                <h5 className={`card-title font-weight-bold text-primary`}>FY 2023-24</h5>
                <div className={styles.count}>
                  <Link to="#" className={` card-link ${styles.black}`}>Total Bill<h6 className={`${styles.black} font-weight-bold`}>{`${income_count}`}</h6></Link>
                  <Link to="#" className={`card-link ${styles.black}`}>Received<h6 className={`${styles.green} font-weight-bold`}>&#8377;
                    {`${income_count}`}</h6></Link>
                  <Link to="#" className={`card-link ${styles.black}`}>Pending<h6 className={`text-danger font-weight-bold`}>&#8377;
                    {`${income_count}`}</h6></Link>
                </div>
                <h6 className={`${styles.green} text-primary mt-3`}>As on date</h6>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div >
  );
}

export default DashBoard;
