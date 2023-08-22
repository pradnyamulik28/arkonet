import styles from './DashBoard.module.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url_ } from '../../../Config';

const DashBoard = () => {


  const [Totalclient, setTotalclient] = useState();
  const [TotalIncomeclient, setTotalIncomeclient] = useState();
  const [filedata, setFiledata] = useState([]);

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  useEffect(() => {

    const totalClient = () => {

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
            // console.log("TC", data)

          })
          .catch(error => console.log(error));
      } catch (error) {
        console.warn("Error on function calling...")
      }
    };

    totalClient();
    FileCount();
  }, []);


  const FileCount = () => {





    try {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`${url_}/filedNotfiledCounts/${user_id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          const sortedData = data.sort((a, b) => b.accountyear.localeCompare(a.accountyear));
          setFiledata(sortedData)
          console.log(sortedData)
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    } catch (error) {
      console.warn("Error on function calling...")
    }
  };



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
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Total Bill<h6 className={`${styles.black} font-weight-bold`}>{'3,50,620'}</h6></Link>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Received<h6 className={`${styles.green} font-weight-bold`}>&#8377;{'2,05,600'}
                    {`${0}`}</h6></Link>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Pending<h6 className={`text-danger font-weight-bold`}>&#8377;{'8,70,600'}
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

                  <table className={`${styles.table} table text-center font-weight-bold`}>
                    <thead>
                      <tr>
                        <th scope="col" >Assessment Year</th>
                        <th scope="col" className={`${styles.green} `}>Filed</th>
                        <th scope="col" className={`text-danger `}>Not Filed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filedata.map((items, index) => {
                        return (
                          <tr key={index} >
                            <td>{items.accountyear}</td>
                            <td className={`${styles.green} `}>{items.filed}</td>
                            <td className={`text-danger `}>{items.notfiled}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

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
