import styles from './DashBoard.module.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url_ } from '../../../Config';

const DashBoard = () => {


  const [Totalclient, setTotalclient] = useState();
  const [TotalIncomeclient, setTotalIncomeclient] = useState();


  useEffect(() => {

    const totalClient = () => {

      const user_id = window.localStorage.getItem('user_id');
      const storedToken = window.localStorage.getItem('jwtToken');
      const url = `${url_}/counts/${user_id}`;



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
    };

    totalClient();

  }, []);






  return (



    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className={`card m-4 ${styles.cardd} text-center`} >
              <h2 className='ml-4'>&lt;</h2>
              <div className={`m-3 w-100 `}>
                <h5 className={`card-title font-weight-bold ${styles.green}`}>FY 2023-24</h5>
                <div className={styles.count}>
                  <Link to="/tc" className={` h6 card-link ${styles.black}`}>Total Clients
                    <h6 className={`${styles.black} font-weight-bold`}>{Totalclient}</h6>

                  </Link>
                  <Link to="/tic" className={`h6 card-link ${styles.green}  `}>Income Tax
                    <h6 className={`${styles.black} font-weight-bold`}>{TotalIncomeclient}</h6>
                  </Link>
                </div>
                <Link to='/clientreg' ><input type="submit" value="ADD CLIENT" className={` h6 ${styles.abtn}`} /></Link>
                <h6 className={`${styles.green} `}>As on date</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className={`card m-4 ${styles.cardd} text-center`} >
              <h2 className='ml-4'>&lt;</h2>
              <div className={`m-3 w-100`}>
                <h5 className={`card-title font-weight-bold text-primary`}>FY 2023-24</h5>
                <div className={styles.count}>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Total Bill<h6 className={`${styles.black} font-weight-bold`}>{`${0}`}</h6></Link>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Received<h6 className={`${styles.green} font-weight-bold`}>&#8377;
                    {`${0}`}</h6></Link>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Pending<h6 className={`text-danger font-weight-bold`}>&#8377;
                    {`${0}`}</h6></Link>
                </div>
                <h6 className={`${styles.green} text-primary`}>As on date</h6>
              </div>
            </div>
          </div>

        </div>


        <div className="row">
          <div className="col-sm-7">
            <div className={`card m-4 ${styles.cardd} `} >

              <div className={`m-4 w-100`}>
                <div className="top d-flex justify-content-between">
                  <h3 className={`card-title font-weight-bold ${styles.green} `}>Income Tax</h3>
                  <h3><i className={`fa-solid fa-ellipsis-vertical ${styles.green} `}  ></i></h3>
                </div>
                <div >

                  <div className={styles.count}>
                    <div className={`mr-2 font-weight-bold ${styles.ntf}`}>Assessment Year
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                    </div>

                    <div className={`font-weight-bold text-success ${styles.ntf}`}>Filled
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                    </div>

                    <div className={`font-weight-bold text-danger ${styles.ntf}`}>Not Filled
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                      <h6 className={`mt-4`}>{Totalclient}</h6>
                    </div>


                  </div>
                  <small >Last updated on 19 May 2023</small>


                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div >
  );
}

export default DashBoard;
