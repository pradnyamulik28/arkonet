import style from "./AdminDetails.module.css";
import SideBar from '../MasterSideBar/MasterSideBar';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { url_ } from "../../../Config";

function AdminDetails() {
    const Navigate = useNavigate();

    // const user_id = window.localStorage.getItem('user_id');
    const storedToken = window.localStorage.getItem('jwtToken');

    useEffect(() => {


        Getadmindata();
    }, []);




    const [admincounts, setadmincounts] = useState()
    const [admincountscategory, setadmincountscategory] = useState([])
    const [adminClients, setadminClients] = useState([])
    const [adminSubscription, setadminSubscription] = useState([]);
    const [adminRenewal, setadminRenewal] = useState([])


    const CurrentYear = new Date().getFullYear();


    const Getadmindata = async () => {
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
                // console.log(result)
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
        await fetch(`${url_}/master/countsubscription`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)
                const singleObject = result.reduce((acc, curr) => {
                    if (curr.subscriptionCount === '2022') {
                        acc['lastyear'] = curr.count;
                    } else if (curr.subscriptionCount === '2023') {
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
        Navigate('searchadmin', {
            state: {
                userProfession: category
            },
        });

    }
    const GOTOuserList = (category) => {
        Navigate('userlist', {
            state: {
                userProfession: category
            },
        });

    }
    const GOTOClients = (category) => {
        Navigate('clientview', {
            state: {
                ClientCategory: category
            },
        });

    }
    return (

        <div className="w-100">
            {/* <SideBar /> */}

            <div className={`${style.workport}`}>

                {/* Left col starts */}
                <div className={`${style.leftcol}`}>

                    <div className={`${style.ltop}`}>
                        <div className={`${style.ltopcontaint}`}>
                            <h5 classname={`${style.itopheadersmall}`}>ADMIN</h5>
                            <h6 classname={`${style.itoppara}`}>Total Admin</h6>
                            <h3 classname={`${style.itopheaderlarge}`}>{admincounts}</h3>
                            <small classname={`${style.itopshrink}`}>As on date</small>
                        </div>
                    </div>

                    <div className={`${style.lbottom} `}>
                        <div className={`${style.lbotcontaint} `}>
                            <div className={`${style.rt} `} ><h4 className={`${style.lboth2}`}><b>ADMIN DETAILS</b></h4></div>
                            <div className={`${style.tabular} `}>

                                <div className={`${style.sinrow}`}>
                                    <div className={`${style.title} mt-4 mb-3`}><h5>ADMIN TYPE</h5></div>
                                    {/* <div className={`${style.value}`}></div> */}
                                </div>




                                <table className="table  ">

                                    <tbody>

                                        {admincountscategory.map((item, index) => (
                                            <tr key={index}>
                                                <td ><b>{item.profession}</b></td>

                                                <td onClick={() => GOTO(item.profession)} style={{ cursor: "pointer" }}><b>{item.count}</b></td>



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
                            <h5 classname={`${style.client}`}>CLIENT</h5>
                        </div>
                        <div className={`${style.rtm}`}>
                            <div className={`${style.rtabular}`} >
                                {adminClients.map((items, index) => (

                                    <div className={`${style.rtcol1}`} key={index}>
                                        <div className={`${style.title}`}><h6 className={`${style.pb}
                                         ${items.category === "Income Tax" ? "text-success" :
                                                items.category === "GST" ? "text-primary" : null
                                            }
                                          `}>{items.category}</h6></div>
                                        <div className={`${style.value}`} style={{ cursor: "pointer" }} onClick={() => GOTOClients(items.category)}><p className={`${style.pv}`}>{items.count}</p></div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className={`${style.rtb}`}><p><b>As on Date</b></p></div>
                    </div>



                    {/* .......................... */}
                    {/* <div className={`${style.Rmiddle}`}> */}

                    <div className={`${style.Rtop}`}>
                        <div className={`${style.rtt}`}>
                            <h5 classname={`${style.client}`}>SUBSCRIPTION</h5>
                        </div>
                        <div className={`${style.rtm}`}>
                            <div className={`${style.rtabular} mt-3`} >
                                <div className={`${style.rtcol1}`}>
                                    <div className={`${style.title}`}><h6 className={`${style.pb}`}>Today</h6></div>
                                    <div className={`${style.value} d-flex justify-content-center`} onClick={() => GOTOuserList("SToday")} style={{ cursor: "pointer" }}><h6 className={`${style.pv}`}>{adminSubscription.Today}</h6></div>
                                </div>
                                <div className={`${style.rtcol1}`}>
                                    <div className={`${style.title}`}><h6 className={`${style.pb}`}>Yesterday</h6></div>
                                    <div className={`${style.value}  d-flex justify-content-center`} onClick={() => GOTOuserList("SYesterday")} style={{ cursor: "pointer" }}><h6 className={`${style.pv}`}>{adminSubscription.Yestarday}</h6></div>
                                </div>
                                <div className={`${style.rtcol1}`}>
                                    <div className={`${style.title}`}><h6 className={`${style.pb}`}>Week</h6></div>
                                    <div className={`${style.value}  d-flex justify-content-center`} onClick={() => GOTOuserList("SWeek")} style={{ cursor: "pointer" }}><h6 className={`${style.pv}`}>{adminSubscription.Weak}</h6></div>
                                </div>
                            </div>
                        </div>


                        <div className={`${style.rmb}`}>
                            <div className={`${style.rtabular}`} >
                                <div className={`${style.rmcol1}`}>
                                    <div className={`${style.title}`}><p className={`${style.p}`}>{`${CurrentYear}-${(CurrentYear + 1).toString().slice(-2)}`}</p></div>
                                    <div className={`${style.value}  d-flex justify-content-center`} onClick={() => GOTOuserList("SPresentYear")} style={{ cursor: "pointer" }}><p className={`${style.pv}`}>{adminSubscription.presentyear}</p></div>
                                </div>
                                <div className={`${style.rmcol2}`}>
                                    <div className={`${style.title}`}><p className={`${style.p}`}>{`${CurrentYear - 1}-${CurrentYear.toString().slice(-2)}`}</p></div>
                                    <div className={`${style.value}  d-flex justify-content-center`} onClick={() => GOTOuserList("SLastYear")} style={{ cursor: "pointer" }}><p className={`${style.pv}`}>{adminSubscription.lastyear}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>




                    {/* </div> */}
                    {/* .......................... */}



                    <div className={`${style.Rbottom}`}>
                        <div className={`${style.rbt}`}>
                            <h5 classname={`${style.renewal}`}>RENEWAL</h5>
                        </div>

                        <div className={`${style.rbm}`}>
                            <div className={`${style.rtabular}`} >
                                <div className={`${style.rbcol1}`}>
                                    <div className={`${style.title}`}><span className={`${style.p}`}>Today</span></div>
                                    <div className={`${style.value} d-flex justify-content-center `} onClick={() => GOTOuserList("RToday")} style={{ cursor: "pointer" }}><span className={`${style.pvr}`}>{adminRenewal.Today}</span></div>
                                </div>
                                <div className={`${style.rbcol2}`}>
                                    <div className={`${style.title}`}><span className={`${style.p}`}>Tomorrow</span></div>
                                    <div className={`${style.value} d-flex justify-content-center`} onClick={() => GOTOuserList("RTomorrow")} style={{ cursor: "pointer" }}><span className={`${style.pvdr}`}>{adminRenewal.Tomorrow}</span></div>
                                </div>
                                <div className={`${style.rbcol3}`}>
                                    <div className={`${style.title}`}><span className={`${style.p}`}>Week</span></div>
                                    <div className={`${style.value} d-flex justify-content-center`} onClick={() => GOTOuserList("RWeek")} style={{ cursor: "pointer" }}><span className={`${style.pvy}`}>{adminRenewal.Weak}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className={`${style.rbb}`}>
                            <div className={`${style.rtabular}`} >
                                <div className={`${style.rbcol1}`}>
                                    <div className={`${style.title}`}><p className={`${style.p}`}>Month</p></div>
                                    <div className={`${style.value} d-flex justify-content-center`} onClick={() => GOTOuserList("RMonth")} style={{ cursor: "pointer" }}><p className={`${style.pv} text-warning`}>{adminRenewal.Month}</p></div>
                                </div>
                                <div className={`${style.rbcol2}`}>
                                    <div className={`${style.title}`}><p className={`${style.p}`}>3 Months</p></div>
                                    <div className={`${style.value} d-flex justify-content-center`} onClick={() => GOTOuserList("R3Months")} style={{ cursor: "pointer" }}><p className={`${style.pv}`}>{adminRenewal.threeMonth}</p></div>
                                </div>
                                <div className={`${style.rbcol3}`}>
                                    <div className={`${style.title}`}><p className={`${style.p}`}>6 Months</p></div>
                                    <div className={`${style.value} d-flex justify-content-center`} onClick={() => GOTOuserList("R6Months")} style={{ cursor: "pointer" }}><p className={`${style.pv}`}>{adminRenewal.sixMonth}</p></div>
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

export default AdminDetails;