import style from "./DistributorDash.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { url_ } from "../../../Config";

function DistributorDash() {

    const Navigate = useNavigate();
    const storedToken = window.localStorage.getItem('jwtToken');

    useEffect(() => {
        
    }, []);


    const [distributorData,setDistributorData]=useState({
        name:localStorage.getItem("distributor_name")

    })

    const [admincounts, setadmincounts] = useState(0)
    const [admincountscategory, setadmincountscategory] = useState([])
    const [adminClients, setadminClients] = useState([])
    const [adminSubscription, setadminSubscription] = useState([]);
    const [adminRenewal, setadminRenewal] = useState([])


    const [earnings,setEarnings]=useState({
        totalearnings:(175240).toLocaleString('en-IN'),
        lastmonth:(26846).toLocaleString('en-IN'),
        unpaid:(14800).toLocaleString('en-IN'),
    })

    const CurrentYear = new Date().getFullYear();


    const Getdistributordata = async () => {
     
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch(`${url_}/allusersdata/counts`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //console.log(result)
                
                setadmincounts(result.count)
            })
            .catch((error) => {
                console.log(error);
            })
        await fetch(`${url_}/user/countbyprofession`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)
                setadmincountscategory(result)
            })
            .catch((error) => {
                console.log(error);
            })
        await fetch(`${url_}/allclient/client-count`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)
                setadminClients(result)
            })
            .catch((error) => {
                console.log(error);
            })
            console.log(new Date().getFullYear())
        await fetch(`${url_}/master/countsubscription`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                
                const singleObject = result.reduce((acc, curr) => {
                    if (curr.subscriptionCount === new Date().getFullYear()-1) {
                        acc['lastyear'] = curr.count;
                    } else if (curr.subscriptionCount === new Date().getFullYear()) {
                        acc['presentyear'] = curr.count;
                    } else {
                        acc[curr.subscriptionCount] = curr.count;
                    }
                    return acc;
                }, {});
                setadminSubscription(singleObject);
                // console.log(singleObject)

            })
            .catch((error) => {
                console.log(error);
            })
        await fetch(`${url_}/master/countreneval`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const singleObjectRenewal = result.reduce((acc, curr) => {
                    if (curr.subscriptionCount === '3 Month') {
                        acc['threeMonth'] = curr.count;
                    } else if (curr.subscriptionCount === '6 Month') {
                        acc['sixMonth'] = curr.count;
                    } else {
                        acc[curr.subscriptionCount] = curr.count;
                    }
                    return acc;
                }, {});
                setadminRenewal(singleObjectRenewal)
                console.log(singleObjectRenewal);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    const GOTO = (category) => {
        // Navigate('searchadmin', {
        //     state: {
        //         userProfession: category
        //     },
        // });

    }
    const GOTOuserList = (category) => {
        // Navigate('userlist', {
        //     state: {
        //         userProfession: category
        //     },
        // });

    }
    const GOTOClients = (category) => {
        // Navigate('clientview', {
        //     state: {
        //         ClientCategory: category
        //     },
        // });

    }
    return (
      <div className="w-100">
        {/* <SideBar /> */}

        <div className={`${style.workport}`}>
          {/* Left col starts */}
          <div className={`${style.leftcol}`}>
            <div className={`${style.ltop}`}>
              <div className={`${style.ltopcontaint}`}>
                <h5 classname={`${style.itopheadersmall}`}>
                  {distributorData.name}
                </h5>
                <h6 classname={`${style.itoppara}`}>Total Subsriptions</h6>
                <h3 classname={`${style.itopheaderlarge}`}>{admincounts}</h3>
                <small classname={`${style.itopshrink}`}>As on date</small>
              </div>
            </div>

            <div className={`${style.lbottom} `}>
              <div className={`${style.lbotcontaint} `}>
                <div className={`${style.rt} `}>
                  <h4 className={`${style.lboth2}`}>
                    <b>SUBSCRIPTION DETAILS</b>
                  </h4>
                </div>
                <div className={`${style.tabular} `}>
                  <div className={`${style.sinrow}`}>
                    <div className={`${style.title} mt-4 mb-3`}>
                      <h5>ADMIN TYPE</h5>
                    </div>
                    {/* <div className={`${style.value}`}></div> */}
                  </div>

                  <table className="table  ">
                    <tbody>
                      {admincountscategory.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <b>{item.profession}</b>
                          </td>

                          <td
                            onClick={() => GOTO(item.profession)}
                            style={{ cursor: "pointer" }}
                          >
                            <b>{item.count}</b>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Left Col ends */}

          {/* Right Col starts */}
          <div className={`${style.rightcol}`}>
            <div className={`${style.Rtop}`}>
              <div className={`${style.rtt}`}>
                <h5
                  classname={`${style.earnings}`}
                  style={{ color: "#ffbb00", fontWeight: "700" }}
                >
                  EARNINGS (&#8377;)
                </h5>
              </div>
              <div className={`${style.rtm}`}>
                <div className={`${style.rtabular}`}>
                  <div className={`${style.rtcol1}`}>
                    <div className={`${style.title}`}>
                      <h6 className={style.pb}>Total Earnings</h6>
                    </div>
                    <div className={`${style.value}`}>
                      <p className={`${style.pv}`}>{earnings.totalearnings}</p>
                    </div>
                    </div>

                    <div className={`${style.rtcol1}`}>
                    <div className={`${style.title} ${style.lastmonth}`}>
                      <h6 className={style.pb}>Last Month</h6>
                    </div>
                    <div className={`${style.value}`}>
                      <p className={`${style.pv}`}>{earnings.lastmonth}</p>
                    </div>
                        </div>

                        <div className={`${style.rtcol1}`}>

                    <div className={`${style.title} ${style.unpaid}`}>
                      <h6 className={style.pb}>Unpaid</h6>
                    </div>
                    <div className={`${style.value}`}>
                      <p className={`${style.pv}`}>{earnings.unpaid}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${style.rtb}`}>
                <p>
                  <b>As on Date</b>
                </p>
              </div>
            </div>

            {/* .......................... */}
            {/* <div className={`${style.Rmiddle}`}> */}

            <div className={`${style.Rtop}`}>
              <div className={`${style.rtt}`}>
                <h5
                  classname={`${style.bussiness}`}
                  style={{ color: "#68C76B", fontWeight: "700" }}
                >
                  BUSINESS
                </h5>
              </div>
              <div className={`${style.rtm}`}>
                <div className={`${style.rtabular} mt-3`}>
                  <div className={`${style.rtcol1}`}>
                    <div className={`${style.title}`}>
                      <h6 className={`${style.pb}`}>Today</h6>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Today's Subscription")}
                      style={{ cursor: "pointer" }}
                    >
                      <h6 className={`${style.pv}`}>
                        {adminSubscription.Today}
                      </h6>
                    </div>
                  </div>
                  <div className={`${style.rtcol1}`}>
                    <div className={`${style.title}`}>
                      <h6 className={`${style.pb}`}>Yesterday</h6>
                    </div>
                    <div
                      className={`${style.value}  d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Yesterday's Subscription")}
                      style={{ cursor: "pointer" }}
                    >
                      <h6 className={`${style.pv}`}>
                        {adminSubscription.Yestarday}
                      </h6>
                    </div>
                  </div>
                  <div className={`${style.rtcol1}`}>
                    <div className={`${style.title}`}>
                      <h6 className={`${style.pb}`}>Week</h6>
                    </div>
                    <div
                      className={`${style.value}  d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Week's Subscription")}
                      style={{ cursor: "pointer" }}
                    >
                      <h6 className={`${style.pv}`}>
                        {adminSubscription.Weak}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${style.rmb}`}>
                <div className={`${style.rtabular}`}>
                  <div className={`${style.rmcol1}`}>
                    <div className={`${style.title}`}>
                      <p className={`${style.p}`}>
                        Current Year <br />
                        {`${CurrentYear}-${(CurrentYear + 1)
                          .toString()
                          .slice(-2)}`}
                      </p>
                    </div>
                    <div
                      className={`${style.value}  d-flex justify-content-center`}
                      onClick={() =>
                        GOTOuserList("Present Year's Subscription")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <p className={`${style.pv}`}>
                        {adminSubscription.presentyear}
                      </p>
                    </div>
                  </div>
                  <div className={`${style.rmcol2}`}>
                    <div className={`${style.title}`}>
                      <p className={`${style.p}`}>
                        Last Year <br />
                        {`${CurrentYear - 1}-${CurrentYear.toString().slice(
                          -2
                        )}`}
                      </p>
                    </div>
                    <div
                      className={`${style.value}  d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Last Year's Subscription")}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={`${style.pv}`}>
                        {adminSubscription.lastyear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}
            {/* .......................... */}

            <div className={`${style.Rbottom}`}>
              <div className={`${style.rbt}`}>
                <h5 classname={`${style.renewal}`}>UPCOMMING RENEWAL</h5>
              </div>

              <div className={`${style.rbm}`}>
                <div className={`${style.rtabular}`}>
                  <div className={`${style.rbcol1}`}>
                    <div className={`${style.title}`}>
                      <span className={`${style.p}`}>Today</span>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center `}
                      onClick={() => GOTOuserList("Today's Renewal")}
                      style={{ cursor: "pointer" }}
                    >
                      <span className={`${style.pvr}`}>
                        {adminRenewal.Today}
                      </span>
                    </div>
                  </div>
                  <div className={`${style.rbcol2}`}>
                    <div className={`${style.title}`}>
                      <span className={`${style.p}`}>Tomorrow</span>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Tomorrow's Renewal")}
                      style={{ cursor: "pointer" }}
                    >
                      <span className={`${style.pvdr}`}>
                        {adminRenewal.Tomorrow}
                      </span>
                    </div>
                  </div>
                  <div className={`${style.rbcol3}`}>
                    <div className={`${style.title}`}>
                      <span className={`${style.p}`}>Week</span>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Week's Renewal")}
                      style={{ cursor: "pointer" }}
                    >
                      <span className={`${style.pvy}`}>
                        {adminRenewal.Weak}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${style.rbb}`}>
                <div className={`${style.rtabular}`}>
                  <div className={`${style.rbcol1}`}>
                    <div className={`${style.title}`}>
                      <p className={`${style.p}`}>Month</p>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center`}
                      onClick={() => GOTOuserList("Month's Renewal")}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={`${style.pv} text-warning`}>
                        {adminRenewal.Month}
                      </p>
                    </div>
                  </div>
                  <div className={`${style.rbcol2}`}>
                    <div className={`${style.title}`}>
                      <p className={`${style.p}`}>3 Months</p>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center`}
                      onClick={() => GOTOuserList("3 Months's Renewal")}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={`${style.pv}`}>{adminRenewal.threeMonth}</p>
                    </div>
                  </div>
                  <div className={`${style.rbcol3}`}>
                    <div className={`${style.title}`}>
                      <p className={`${style.p}`}>6 Months</p>
                    </div>
                    <div
                      className={`${style.value} d-flex justify-content-center`}
                      onClick={() => GOTOuserList("6 Months's Renewal")}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={`${style.pv}`}>{adminRenewal.sixMonth}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Col ends */}

          {/* className={`${style.name}`} */}
        </div>
      </div>
    );
}

export default DistributorDash;