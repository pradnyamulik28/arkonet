import styles from './DashBoard.module.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url_ } from '../../../Config';

const DashBoard = () => {


  const [Totalclient, setTotalclient] = useState();
  const [TotalIncomeclient, setTotalIncomeclient] = useState();
  const [TotalGSTClients, setTotalGSTClients] = useState();


  const [TotalclientPayment, setTotalclientPayment] = useState();
  const [TotalclientpendingPayment, setTotalclientpendingPayment] = useState();
  const [TotalClientsreceivedPayment, setTotalClientsreceivedPayment] = useState();


  const [filedata, setFiledata] = useState([]);
  const [latestupdatedata, setLatestupdatedata] = useState();



  const [gstfiledata, setgstFiledata] = useState([]);
  const [gstlatestupdatedata, setgstLatestupdatedata] = useState();

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
            // console.log(data)
            setTotalclient(data.totalClientCount)
            setTotalIncomeclient(data.incomeTaxClientCount)
            setTotalGSTClients(data.gst_ClientCount)
            // console.log("Counts data", data)

          })
          .catch(error => console.log(error));
      } catch (error) {
        console.warn("Error on function calling...")
      }
    };

    totalClient();
    ClientsTotalPayment();
    Income_FileCount();
    Income_LatestUpdate();
    GST_FileCount();
    GST_LatestUpdate();
  }, []);


  const currentYear = new Date().getFullYear();




  const ClientsTotalPayment = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken} `);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/sumOFPaymentClient/${user_id}`, requestOptions);
      const result = await response.json();
      // console.log(result);
      // console.log(result.totalPayment);

      setTotalclientPayment(result.totalPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
      setTotalClientsreceivedPayment(result.receivedPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
      setTotalclientpendingPayment(result.pendingPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    } catch (error) {
      console.log('error', error);
    }
  };






  const Income_FileCount = () => {

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
          // const sortedData = data.sort((a, b) => b.accountyear.localeCompare(a.accountyear));
          setFiledata(data)
          // console.log(data)
        })
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));

    } catch (error) {
      console.warn("Error on function calling...")
    }
  };


  const Income_LatestUpdate = () => {

    const url = `${url_}/maxLastUpdateDate/${user_id}`;



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
          setLatestupdatedata(data.lastUpdateDate)
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.warn("Error on function calling...")
    }
  };

  const [gstdata, setgstdata] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const GST_FileCount = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/getGSTData?userid=${user_id}`, requestOptions);
      const result = await response.json();
      console.log(result);


      let data = [];

      result["GSTR-1"].forEach((item, index) => {
        data.push({
          month: item.month,
          GSTR1FD: item.filed,
          GSTR1NFD: item.notfiled,
          GSTR3BFD: result["GSTR3B"][index].filed,
          GSTR3BNFD: result["GSTR3B"][index].notfiled,
        });
      });

      console.log(data);
      setgstdata(data)

    } catch (error) {
      console.log('error', error);
    }
  };
  const displayData = showAll ? gstdata : gstdata.slice(0, 6);

  const GST_LatestUpdate = () => {

    const url = `${url_}/maxLastUpdateDate/${user_id}`;



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
          setLatestupdatedata(data.lastUpdateDate)
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.warn("Error on function calling...")
    }
  };


  // function GSTData() {


  // }
  return (



    <div>
      <div className="container">

        <div className="row">
          <div className="col-6">
            <div className={`card m-4 ${styles.cardd} text-center`} >
              <div className={`m-3 w-100 `}>
                <h5 className={`card-title font-weight-bold ${styles.green}`}>F.Y. {currentYear}-{(currentYear + 1).toString().slice(-2)}</h5>
                <div className={`${styles.count} d-flex justify-content-around`}>
                  <Link to="tc" className={` h6 card-link ${styles.black}`}>Total Clients
                    <h6 className={`${styles.black} font-weight-bold`}>{Totalclient}</h6>

                  </Link>
                  <Link to="tic" className={`h6 card-link ${styles.green}  `}>Income Tax
                    <h6 className={`${styles.black} font-weight-bold`}>{TotalIncomeclient}</h6>
                  </Link>
                  <Link to="gstclients" className={`h6 card-link text-primary  `}>GST
                    <h6 className={`${styles.black} font-weight-bold`}>{TotalGSTClients}</h6>
                  </Link>
                </div>
                <Link to='clientreg' ><input type="submit" value="ADD CLIENT" className={` h6 ${styles.abtn}`} /></Link>
              </div>

            </div>
          </div>
          <div className="col-6">
            <div className={`card m-4 ${styles.cardd} text-center`} >
              <h2 className='ml-4'>&lt;</h2>
              <div className={`m-3 w-100`}>
                <h5 className={`card-title font-weight-bold text-primary`}>FY {currentYear}-{(currentYear + 1).toString().slice(-2)}</h5>
                <div className={styles.count}>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Total Bill<h6 className={`${styles.black} font-weight-bold`}>{TotalclientPayment}</h6></Link>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Received<h6 className={`${styles.green} font-weight-bold`}>{TotalClientsreceivedPayment}
                  </h6></Link>
                  <Link to="#" className={`h6 card-link ${styles.black}`}>Pending<h6 className={`text-danger font-weight-bold`}>{TotalclientpendingPayment}
                  </h6></Link>
                </div>
                <h6 className={`${styles.green} text-primary`}>As on date</h6>
              </div>
            </div>
          </div>

        </div>




        <div className="row ">

          <div className="col-6">
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

                  <small >Last updated on {latestupdatedata}</small>


                </div>
              </div>
            </div>
          </div>


          {/* /////////////////////////////////////////////////////////////// */}

          <div className="col-6">
            <div className={`card mt-4 ${styles.gst_cardd} `} >

              <div className={`m-4 w-100`}>
                <div className="top d-flex justify-content-between">
                  <h3 className={`card-title font-weight-bold text-primary `}>GST</h3>
                  <h3><i className={`fa-solid fa-ellipsis-vertical  text-primary`}  ></i></h3>
                </div>
                <div >
                  <table className={`${styles.table} table text-center font-weight-bold`}>
                    <thead>
                      <tr>

                        <th></th>
                        <th colSpan="2" ><h4 className='font-weight-bold text-primary'>GSTR-1</h4></th>
                        <th colSpan="2" ><h4 className='font-weight-bold text-primary'>GSTR-3B</h4></th>
                      </tr>
                      <tr>
                        <th className='font-weight-bold '>MONTH</th>
                        <th className={`text-success`}>Filed</th>
                        <th className={`text-danger`}>Not Filed</th>
                        <th className={`text-success`}>Filed</th>
                        <th className={`text-danger`}>Not Filed</th>

                      </tr>
                    </thead>
                    <tbody>
                      {displayData.map((items, index) => {
                        return (
                          <tr key={index}>
                            <td className='text-black'>{items.month}</td>
                            <td className=' text-success'>{items.GSTR1FD}</td>
                            <td className=' text-danger'>{items.GSTR1NFD}</td>
                            <td className=' text-success'>{items.GSTR3BFD}</td>
                            <td className=' text-danger'>{items.GSTR3BNFD}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="top d-flex justify-content-between">
                    <small >Last updated on {latestupdatedata}</small>
                    {showAll ? (
                      <h6>
                        <span
                          className={`font-weight-bold text-primary`}
                          onClick={() => setShowAll(false)}
                          style={{ cursor: 'pointer' }}
                        >
                          Less...
                        </span>
                      </h6>
                    ) : (
                      <h6>
                        <span
                          className={`font-weight-bold text-primary`}
                          onClick={() => setShowAll(true)}
                          style={{ cursor: 'pointer' }}
                        >
                          More...
                        </span>
                      </h6>
                    )}
                  </div>

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
