import styles from './DashBoard.module.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';
import imgprofile from '../../../Images/profile.png'
// import ExcelToJsonConverter from '../BulkImport/ExcelToJsonConverter';

const DashBoard = () => {

  const [subscription_status, setSubscriptionStatus] = useState();

  // const subscription_status = localStorage.getItem(`subscription_status`)

  const username = localStorage.getItem("user_name");
  const userpan = localStorage.getItem("pan");
  const userPro = localStorage.getItem("profession");
  const logintime = TimeConvert(localStorage.getItem("logintime"));


  const options = { day: "numeric", month: "long", year: "numeric" };
  const todate = new Date().toLocaleDateString("en-GB", options);

  const Navigate = useNavigate();
  const [Totalclient, setTotalclient] = useState();
  const [TotalIncomeclient, setTotalIncomeclient] = useState();
  const [TotalGSTClients, setTotalGSTClients] = useState();


  const [TotalclientPayment, setTotalclientPayment] = useState();
  const [TotalclientpendingPayment, setTotalclientpendingPayment] = useState();
  const [TotalClientsreceivedPayment, setTotalClientsreceivedPayment] = useState();
  const [TotalClientsdiscountPayment, setTotalClientsdiscountPayment] = useState();


  const [filedata, setFiledata] = useState([]);
  const [incomelatestupdatedata, setincomelatestupdatedata] = useState();



  const [gstfiledata, setgstFiledata] = useState([]);
  const [gstlatestupdatedata, setgstLatestupdatedata] = useState();

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  function TimeConvert(ConvertingDate) {

    if (ConvertingDate === null) {
      return null;
    } else {
      const date = new Date(ConvertingDate);
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      return formattedTime;

    }

  }

  function handleLinkClick(e) {
    const isactive = checkSubscriptionStatus(e);
    // console.log(subscription_status);

    if (subscription_status === "grace_period" || !isactive)
      Swal.fire({
        icon: "error",
        text: `Sorry your subscription has expired today on ${TimeConvert(localStorage.getItem("end_time"))}`,
      });
  }


  function TimeConvert(ConvertingDate) {

    if (ConvertingDate === null) {
      return null;
    } else {
      const date = new Date(ConvertingDate);
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      return formattedTime;

    }

  }

  function checkSubscriptionStatus(e) {
    if (localStorage.getItem("end_time")) {
      const startDateTime = new Date();
      const endDateTime = new Date(localStorage.getItem("end_time"));
      const timeDiff =
        endDateTime.getHours() * 60 +
        endDateTime.getMinutes() -
        (startDateTime.getHours() * 60 + startDateTime.getMinutes());

      const hours = parseInt(timeDiff / 60);
      const minutes = timeDiff % 60;
      // console.log(hours, minutes);

      if (hours <= 0 && minutes <= 0) {
        e.preventDefault();
        localStorage.setItem("subscription_status", "grace_period");
        setSubscriptionStatus("grace_period");
        return false;
      } else return true;
    } else {
      return true;
    }
  }
  useEffect(() => {
    setSubscriptionStatus(localStorage.getItem(`subscription_status`));
  }, [subscription_status]);

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


  let currentYear = new Date().getFullYear();
  const currentMonth=new Date().getMonth();

    if(currentMonth<3){    
      currentYear=currentYear-1
    }
  const fyyear = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`



  const ClientsTotalPayment = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken} `);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/sumOFPaymentClientByUserid/${user_id}/${fyyear}`, requestOptions);
      const result = await response.json();
      // console.log(result);

      setTotalclientPayment(result.totalPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
      setTotalClientsreceivedPayment(result.receivedPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
      setTotalclientpendingPayment(result.pendingPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
      setTotalClientsdiscountPayment(result.discountPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }))
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
          console.log(data)
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
          const date = new Date(data.lastUpdateDate);
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-GB', options);
          setincomelatestupdatedata(formattedDate);
          // console.log(data)
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
          GSTR3BFD: result["GSTR-3B"][index].filed,
          GSTR3BNFD: result["GSTR-3B"][index].notfiled,
        });
      });

      // console.log(data);
      // setgstdata(data)





      const currentMonth = new Date().getMonth();

      // Filter the data for months up to and including the current month
      const filteredData = data.filter(entry => {
        const entryMonth = new Date(entry.month + ' 1, 2023').getMonth();
        return entryMonth <= currentMonth;
      });

      // Reverse the order of the filtered data
      const reversedData = filteredData.reverse();

      // console.log(reversedData);
      setgstdata(reversedData)



    } catch (error) {
      console.log('error', error);
    }
  };
  const displayData = showAll ? gstdata : gstdata.slice(0, 6);

  const GST_LatestUpdate = () => {

    const url = `${url_}/GSTmaxLastUpdateDate/${user_id}`;



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
          // console.log(data.MaxDate)
          const date = new Date(data.MaxDate);
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-GB', options);
          setgstLatestupdatedata(formattedDate)
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.warn("Error on function calling...")
    }
  };

  const GOTO = (category, cmonth) => {
    Navigate('clientlist'
      , {
        state: {
          ClientStateCategory: category,
          ClientStateCategorymonth: cmonth
        },
      });

  }

  const [imgcontent,setImgContent]=useState(null)

  function getProfileImage() {
    try {

      fetch(`${url_}/getpaymentDetails/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {            
          setImgContent(res.content)   

        })
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  useEffect(()=>{getProfileImage()},[])
  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : imgprofile;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 justify-content-center">
            <div className={`card mt-4 mb-2 ${styles.cardd1} text-center`}>
              <div className={`${styles.profilerow} row`}>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                <div className={`${styles.profileimg}`}>
                <img  src={imageSrc} alt="" className="mt-2 mb-2" />                
                <div style={{"marginLeft":"2rem","textAlign":"left"}}>
                  <h3>{username}</h3>
                  <h5>{userpan}</h5>
                 </div>
                </div>
                </div>
                <div className={`col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ${styles.content}`} >
                <div className={styles.centrecoloum}>
                  <h6 className='text-muted '>Profession&nbsp;&nbsp;: {userPro}</h6>                  
                  {/* <h6 className='text-muted '>Date :  {todate}</h6> */}
                  <h6 className='text-muted '>&#128337;Login Time&nbsp;&nbsp;: {logintime}</h6>
                </div>              
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className={`card m-4 ${styles.cardd} text-center`}>
              <div className={`m-3 w-100 `}>
                <h5 className={`card-title font-weight-bold ${styles.green}`}>
                  F.Y. {fyyear}
                </h5>
                <div
                  className={`${styles.count} d-flex justify-content-around`}
                >
                  <Link to="tc" className={` h6 card-link ${styles.black}`}>
                    Total Clients
                    <h6 className={`${styles.black} font-weight-bold`}>
                      {Totalclient}
                    </h6>
                  </Link>
                  <Link to="tic" className={`h6 card-link ${styles.green}  `}>
                    Income Tax
                    <h6 className={`${styles.black} font-weight-bold`}>
                      {TotalIncomeclient}
                    </h6>
                  </Link>
                  <Link
                    to="gstclients"
                    className={`h6 card-link text-primary  `}
                  >
                    GST
                    <h6 className={`${styles.black} font-weight-bold`}>
                      {TotalGSTClients}
                    </h6>
                  </Link>
                  {/* <Link to="gstclients" className={`h6 card-link text-primary  `}>Both
                    <h6 className={`${styles.black} font-weight-bold`}>{TotalGSTClients}</h6>
                  </Link> */}
                </div>
                <Link
                  to="clientreg"
                  className={
                    subscription_status === "on" ? `` : `${styles.btndisable}`
                  }
                  onClick={handleLinkClick}
                >
                  <input
                    type="submit"
                    value="ADD CLIENT"
                    className={` h6 ${styles.abtn}`}
                  />
                </Link>
                {/* <Link
                  // to="clientreg"
                  className={
                    subscription_status === "on" ? `` : `${styles.btndisable}`
                  }
                  style={{"marginLeft":"6px"}}
                  // onClick={handleLinkClick}
                >
                  <input
                    type="submit"
                    value="BULK IMPORT"
                    className={` h6 ${styles.abtn}`}
                  />
                  
                </Link>    */}
                {/* <ExcelToJsonConverter />           */}
              </div>
            </div>

            <div className={`card m-4 ${styles.cardd} `}>
              <div className={`m-4 w-100`}>
                <div className="top d-flex justify-content-between">
                  <h3
                    className={`card-title font-weight-bold ${styles.green} `}
                  >
                    Income Tax
                  </h3>
                  <h3>
                    <i
                      className={`fa-solid fa-ellipsis-vertical ${styles.green} `}
                    ></i>
                  </h3>
                </div>
                <div>
                  <table
                    className={`${styles.table} table text-center font-weight-bold`}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Assessment Year</th>
                        <th scope="col" className={`${styles.green} `}>
                          Filed
                        </th>
                        <th scope="col" className={`text-danger `}>
                          Not Filed
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filedata.map((items, index) => {
                        return (
                          <tr key={index}>
                            <td>{items.accountyear}</td>
                            <td
                              className={`${styles.green} `}
                              onClick={() =>
                                GOTO("IncomeFD", items.accountyear)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {items.filed}
                            </td>
                            <td
                              className={`text-danger `}
                              onClick={() =>
                                GOTO("IncomeNFD", items.accountyear)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {items.notfiled}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <small>Last updated on {incomelatestupdatedata}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">

            <div className={`card m-4 ${styles.cardd} text-center`}>
              <h2 className="ml-4">&lt;</h2>
              <div className={`m-3 w-100`}>
                <h5 className={`card-title font-weight-bold text-primary`}>
                  FY {fyyear}
                </h5>
                <div className={styles.count}>
                  <div className={`h6 card-link ${styles.black}`}>
                    Total Bill
                    <h6 className={`${styles.black} font-weight-bold`}>
                      {TotalclientPayment}
                    </h6>
                  </div>
                  <div className={`h6 card-link ${styles.black}`}>
                    Received
                    <h6 className={`${styles.green} font-weight-bold`}>
                      {TotalClientsreceivedPayment}
                    </h6>
                  </div>
                  <div
                    className={`h6 card-link ${styles.black}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => GOTO("Pending", fyyear)}
                  >
                    Pending
                    <h6 className={`text-danger font-weight-bold`}>
                      {TotalclientpendingPayment}
                    </h6>
                  </div>
                  <div
                    className={`h6 card-link ${styles.black}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => GOTO("Pending", fyyear)}
                  >
                    Discount
                    <h6 className={`text-success font-weight-bold`}>
                      {TotalClientsdiscountPayment}
                    </h6>
                  </div>
                </div>
                <h6 className={`${styles.green} text-primary`}>
                  As on {todate}
                </h6>
              </div>
            </div>

            <div className={`card mt-4 ${styles.gst_cardd} `}>
              <div className={`m-4 w-100`}>
                <div className="top d-flex justify-content-between">
                  <h3 className={`card-title font-weight-bold text-primary `}>
                    GST
                  </h3>
                  <h3>
                    <i
                      className={`fa-solid fa-ellipsis-vertical  text-primary`}
                    ></i>
                  </h3>
                </div>
                <div>
                  <table className={`${styles.table} table font-weight-bold`}>
                    <thead>
                      <tr>
                        <th></th>
                        <th colSpan="2">
                          <h4 className="font-weight-bold text-primary">
                            GSTR-1
                          </h4>
                        </th>
                        <th colSpan="2">
                          <h4 className="font-weight-bold text-primary">
                            GSTR-3B
                          </h4>
                        </th>
                      </tr>
                      <tr>
                        <th className="font-weight-bold ">MONTH</th>
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
                            <td className="text-black ">{items.month}</td>
                            <td
                              className=" text-success  text-center"
                              onClick={() => GOTO("GSTR1FD", items.month)}
                              style={{ cursor: "pointer" }}
                            >
                              {items.GSTR1FD}
                            </td>
                            <td
                              className=" text-danger text-center"
                              onClick={() => GOTO("GSTR1NFD", items.month)}
                              style={{ cursor: "pointer" }}
                            >
                              {items.GSTR1NFD}
                            </td>
                            <td
                              className=" text-success text-center"
                              onClick={() => GOTO("GSTR3BFD", items.month)}
                              style={{ cursor: "pointer" }}
                            >
                              {items.GSTR3BFD}
                            </td>
                            <td
                              className=" text-danger text-center"
                              onClick={() => GOTO("GSTR3BNFD", items.month)}
                              style={{ cursor: "pointer" }}
                            >
                              {items.GSTR3BNFD}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="top d-flex justify-content-between">
                    <small>Last updated on {gstlatestupdatedata}</small>
                    {showAll ? (
                      <h6>
                        <span
                          className={`font-weight-bold text-primary`}
                          onClick={() => setShowAll(false)}
                          style={{ cursor: "pointer" }}
                        >
                          Less...
                        </span>
                      </h6>
                    ) : (
                      <h6>
                        <span
                          className={`font-weight-bold text-primary`}
                          onClick={() => setShowAll(true)}
                          style={{ cursor: "pointer" }}
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
    </div>
  );
}

export default DashBoard;
