import { useNavigate } from "react-router-dom";
import style from "./UserSubscriptionPlan.module.css";
import { useEffect, useState } from "react";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
import { useLocation } from 'react-router-dom';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
// import taxko from "../../Images/Taxko.jpg";
// import arkonet from "../../Images/Arkonet.jpg";

const UserSubscriptionPage = () => {

  const [isRefferFriend, setIsRefferFriend] = useState(true);
  const [isSuggession, setIsSuggession] = useState(false);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [USERSUBSCRIPTIONDATA, setUSERSUBSCRIPTIONDATA] = useState({
    PAIDSTATUS: "",
    FORCESTOPSTATUS: "",
    USER_REFERED_BY: "",
    USERNAME: "",
    USERMOBILE: "",
    USERREG_DATE: "",
    USERSUBSTARTDATE: "",
    USERSUBSTARTDATEBYUSER: "",
    USERSUBSTARTDATEBYADMIN: null,
    USERSUBENDDATE: null,
    USERSUBSCRIPTIONTYPE: "",
    USERACESSCLIENT: "",
    USERIMAGENAME: "",
    USERIMAGEPATH: "",
    USERSUBSCRIPTIONPRICE: "",
    USERREFRENCEID: "",
    USERREMAININGDAYS: "",
    USERSUBENDIME: "",
    USERSUBTIMELEFT: "",
    USERID: useLocation().state.USERSUBID,
    USERPAN: useLocation().state.USERSUBPAN

  });
  // console.log(USERSUBSCRIPTIONDATA.USERID, USERSUBSCRIPTIONDATA.USERPAN)

  const storedToken = localStorage.getItem("jwtToken");

  const [refferFriend, setRefferFriend] = useState({
    name: "",
    contactNo: "",
    profession: ""
  })

  const [suggession, setSuggession] = useState({
    suggession: "",
  })


  function handleChange(e) {
    const { name, value } = e.target;
    if (isRefferFriend) {
      switch (name) {
        case "contactNo":
          setRefferFriend({ ...refferFriend, [name]: value.replace(/\D/g, "") });
          e.target.value = value.replace(/\D/g, "");
          const mobilePattern = /^[789]\d{9}$/;
          setIsValidMobile(mobilePattern.test(e.target.value));
          break;
        default:
          setRefferFriend({ ...refferFriend, [name]: value })
          break;
      }



    }
    if (isSuggession) {
      setSuggession({ ...suggession, [name]: value })
    }
  }




  // const [userInfo, setUserInfo] = useState({
  //   userid: useLocation().state.USERSUBID,
  //   userPAN: useLocation().state.USERSUBPAN,
  //   days_left: null,
  //   referredBy: "No Refrence",
  //   refferedPan: "",
  //   registration_date: "",
  //   end_date: "",
  //   paid: ""
  // });


  function copyReferralLink() {
    const refferalLink = `http://3.109.212.58:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${USERSUBSCRIPTIONDATA.USERPAN}`;
    const copy = require('clipboard-copy')
    copy(refferalLink);

    swal.fire('Refferal link has been copied to clipboard');
  }


  function openPanel(e) {
    if (e.target.id === "referfriendbtn") {
      setIsSuggession(false);
      setIsRefferFriend(true);
    }
    if (e.target.id === "suggessionbtn") {
      setIsSuggession(true);
      setIsRefferFriend(false);
    }
  }



  async function fetchData() {


    function DateConvert(ConvertingDate) {

      if (ConvertingDate === null) {
        return null;
      } else {



        const date = new Date(ConvertingDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;

      }



    }

    function CalculateRemainingDays(endingdate) {

      if (endingdate === null) {
        return null;
      } else {



        const endDate = new Date(endingdate);
        const currentDate = new Date();

        // Calculate the difference in milliseconds
        const timeDifference = endDate.getTime() - currentDate.getTime();

        // Convert milliseconds to days
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysRemaining;

      }
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

    function getTimeDifference(startDate, endDate) {
      const startDateTime = new Date();
      const endDateTime = new Date(endDate);
      const timeDiff = ((endDateTime.getHours() * 60) + endDateTime.getMinutes()) -
        ((startDateTime.getHours() * 60) + startDateTime.getMinutes())

      const hours = parseInt(timeDiff / 60);
      const minutes = timeDiff % 60;



      return { hours, minutes };
    }








    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/subscriptionpackuserdata/${USERSUBSCRIPTIONDATA.USERPAN}`, requestOptions);
      const result = await response.json();
      console.log(result)


      setUSERSUBSCRIPTIONDATA({
        PAIDSTATUS: result.subscriptionData.paid,
        FORCESTOPSTATUS: result.subscriptionData.forcestop,
        USER_REFERED_BY: result.Refered_by_name,
        USERNAME: result.subscriptionData.name,
        USERMOBILE: result.subscriptionData.mobile,
        USERREG_DATE: DateConvert(result.subscriptionData.registrationdate),
        USERSUBSTARTDATE: result.subscriptionData.substartdate,
        USERSUBSTARTDATEBYUSER: result.subscriptionData.substartdatebyuser,
        USERSUBSTARTDATEBYADMIN: result.subscriptionData.substartdatebyadmin,
        USERSUBENDDATE: DateConvert(result.subscriptionData.subendtdate),
        USERSUBSCRIPTIONTYPE: result.subscriptionData.subscriptiontype,
        USERACESSCLIENT: result.subscriptionData.acessclient,
        USERIMAGENAME: result.subscriptionData.imageName,
        USERIMAGEPATH: result.subscriptionData.imagePath,
        USERSUBSCRIPTIONPRICE: result.subscriptionData.subscriptionprice,
        USERREFRENCEID: result.subscriptionData.refrenceId,
        USERREMAININGDAYS: CalculateRemainingDays(result.subscriptionData.subendtdate),
        USERSUBENDIME: TimeConvert(result.getSubendtdate),
        USERSUBTIMELEFT: getTimeDifference(result.getSubendtdate, result.getSubendtdate),
        USERID: result.subscriptionData.userid,
        USERPAN: result.subscriptionData.pan,


      })


      if (result.subscriptionData.substartdatebyadmin === null) {

        setStartDate(new Date())
        setEndDate(new Date())
      } else {

        setStartDate(new Date(`${result.subscriptionData.substartdatebyadmin}`))
        setEndDate(new Date(`${result.subscriptionData.subendtdate}`))
      }






    } catch (error) {
      console.log(error)
    }



  }
  // console.log(USERSUBSCRIPTIONDATA)
  function handleSubmit() {
    if (isRefferFriend) {

      if (!isValidMobile || refferFriend.contactNo === "" ||
        refferFriend.name === ""
        || refferFriend.profession === "") {
        console.log(isValidMobile)
        swal.fire({
          icon: "warning",
          text: (!isValidMobile || refferFriend.contactNo === "") ? `Invalid Mobile no` :
            refferFriend.name === "" ? `Please enter a name.` :
              refferFriend.profession === "" && `Please enter profession`
        })
      }
      else {
        console.log(isValidMobile, refferFriend.name, refferFriend.contactNo, refferFriend.profession)
        saveRefferFriend();
        setRefferFriend({
          name: "",
          contactNo: "",
          profession: ""
        })
      }

    }
    if (isSuggession) {
      if (suggession.suggession === "") {
        swal.fire({
          icon: "warning",
          text: "Please fill in some suggession."
        })
      }
      else {
        saveSuggession();
        setSuggession({
          suggession: ""
        })
      }

    }
  }

  async function saveRefferFriend() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      userid: USERSUBSCRIPTIONDATA.USERID,
      pan: USERSUBSCRIPTIONDATA.USERPAN,
      name: refferFriend.name,
      contactno: refferFriend.contactNo,
      profession: refferFriend.profession,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/save/Refear_a_friend`,
        requestOptions
      );
      const result = await response.text();

      if (response.status === 200) {
        swal.fire({
          icon: "success",
          text: "Thank you for refference.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function saveSuggession() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      userid: USERSUBSCRIPTIONDATA.USERID,
      pan: USERSUBSCRIPTIONDATA.USERPAN,
      seggesion: suggession.suggession,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/save/User_seggesion`,
        requestOptions
      );
      const result = await response.text();

      if (response.status === 200) {
        swal.fire({
          icon: "success",
          text: "Thank you for your suggession..",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    fetchData();
    GetCurrentDate();
  }, [])

  const ApproveUserSubscription = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/Approve/Subscription/${USERSUBSCRIPTIONDATA.USERPAN}`, requestOptions);

      const result = await response.text();
      console.log(result);
      if (response.status === 200) {
        await swal.fire("Success.", `${result}`, "success")
        // console.log(result);
        window.location.reload();


      } else {
        swal.fire("Failed.", "Failed to approved user. Please try again!!", "error")
        // console.log(result);
        window.location.reload();
      }
    } catch (error) {
      console.log('error', error);
    }

  };

  const ForceStopUpdate = async (forceStopStartStatus) => {


    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/changestatus/Subscription/${USERSUBSCRIPTIONDATA.USERPAN}/${forceStopStartStatus}`, requestOptions);
      const result = await response.text();
      if (response.status === 200) {
        await swal.fire("Success.", `${result}`, "success");
        window.location.reload();


      }
      else {
        await swal.fire("Failed.", `Failed to update status!!!`, "error")
        window.location.reload();
      }
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  };




  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [addedDays, setAddedDays] = useState(null);
  const [finalenddate, setfinalenddate] = useState();
  const [CurreantDATE, setCurreantDATE] = useState();

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDaysChange = (e) => {


    // console.log(dayss)

    const dayss = e.target.value;
    const days = parseInt(dayss);



    if (dayss < 0 && dayss === null) {
      swal.fire("Error", "Value should be greater than 0", "error");
    } else if (dayss > 30) {
      swal.fire("Error", "Value should be less than or equal to 30", "error");
    } else {
      setAddedDays(days);
      if (addedDays !== '') {
        if (endDate instanceof Date) {
          const newEndDate = new Date(endDate);
          newEndDate.setDate(endDate.getDate() + days - addedDays);
          setEndDate(newEndDate);

          const date = new Date(newEndDate);
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          const formattedDate = `${year}-${month}-${day}`;
          console.log(formattedDate); // Output: 2023-11-27

          setfinalenddate(formattedDate)
          // Output the result
          console.log(formattedDate);

        }
      } else {
        const newEndDate = new Date(startDate);
        newEndDate.setDate(startDate.getDate() + days);
        setEndDate(newEndDate);

        const date = new Date(newEndDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate); // Output: 2023-11-27

        setfinalenddate(formattedDate)
      }
    }

  };
  const submitdateandclient = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/adddays/Subscription/${USERSUBSCRIPTIONDATA.USERPAN}/${finalenddate}T11:59:00.000Z`, requestOptions);
      const result = await response.text();
      console.log(result)
      if (response.status === 200) {
        await swal.fire("Success.", "Days added successfully.", "success");
        window.location.reload();
      } else {
        await swal.fire("Failed.", ` Failed to add days!!!`, "error")
        window.location.reload();
      }


      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
    // console.log(`${finalenddate}T11:59:00.000Z`)

  };


  const GetCurrentDate = () => {
    // Get current date
    var today = new Date();

    // Extract date, month, and year
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var year = today.getFullYear();

    // Format the date as "dd / mm / yyyy"
    var formattedDate = day + ' / ' + month + ' / ' + year;

    // Print the formatted date
    // console.log(formattedDate);
    setCurreantDATE(formattedDate)
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////




  return (
    <div className={`${style.workport}`}>

      <div className={`${style.maincont} `}>
        <div className={`${style.mainhair}`}>
          <h4 className={`${style.h31}`}>SUBSCRIPTION</h4>
        </div>

        <div className={`${style.mainhead}`}>
          <div className={`${style.circular}`}>
            <div className={`${style.card1}`}>

              <h3 className={USERSUBSCRIPTIONDATA.USERREMAININGDAYS >= 15 ? `${style.h31}` :
                USERSUBSCRIPTIONDATA.USERREMAININGDAYS <= 0 ? `${style.h31} ${style.subs_end}` :
                  `${style.h31} ${style.subs_about_end}`}
              >
                {/* {USERSUBSCRIPTIONDATA.USERREMAININGDAYS}</h3> */}
                {USERSUBSCRIPTIONDATA.USERSUBENDDATE === null ? `` :
                  USERSUBSCRIPTIONDATA.USERREMAININGDAYS === 0 ? `${Math.abs(USERSUBSCRIPTIONDATA.USERSUBTIMELEFT.hours)}h : ${Math.abs(USERSUBSCRIPTIONDATA.USERSUBTIMELEFT.minutes)}m` :
                    Math.abs(USERSUBSCRIPTIONDATA.USERREMAININGDAYS)}</h3>
              <p className={`${style.p1}`}>{
                USERSUBSCRIPTIONDATA.USERSUBENDDATE === null ? `Not Subscribed` :
                  USERSUBSCRIPTIONDATA.USERREMAININGDAYS < 0 ? `Days ago` :
                    USERSUBSCRIPTIONDATA.USERREMAININGDAYS === 0 ?
                      (USERSUBSCRIPTIONDATA.USERSUBTIMELEFT.hours <= 0 && USERSUBSCRIPTIONDATA.USERSUBTIMELEFT.minutes <= 0) ? `Time Ago` :
                        `Time Left` : `Days Left`}



                {/* USERSUBSCRIPTIONDATA.USERSUBENDDATE === null ? `` : USERSUBSCRIPTIONDATA.USERREMAININGDAYS < 0 ? `Days ago` : `Days Left`} */}
              </p>
            </div>
          </div>




          {USERSUBSCRIPTIONDATA.USERSUBSTARTDATEBYUSER === null ?
            (
              <div className={`w-100 mt-3 d-flex justify-content-center`}>
                <h5><b>User not subscribed...</b></h5>
              </div>
            ) : (
              <div className={`w-100 `}>
                <div className={`${style.mainheadtextual}`}>
                  {USERSUBSCRIPTIONDATA.USERSUBSTARTDATEBYADMIN === null ?
                    (
                      <h5><b>User not approved!</b></h5>
                    ) : (
                      <>
                        {/* <p className={`${style.p2}`}>{userInfo.end_date}&nbsp;&nbsp; {userInfo.end_time}</p>
                        <p className={`${style.sub_details}`}>Selected Pack:&nbsp;&nbsp;{userInfo.pack_type}
                          &nbsp;&nbsp;&nbsp;&nbsp; Amount : &#8377;&nbsp;{userInfo.pack_amount}&nbsp;/- </p> */}
                        <p className={`${style.p1}`}>Subscription Ends on</p>
                        <p className={`${style.p2}`}>{USERSUBSCRIPTIONDATA.USERSUBENDDATE} &nbsp;&nbsp;{USERSUBSCRIPTIONDATA.USERSUBENDIME}</p>
                        <p className={`${style.sub_details} font-weight-bold`}><h6>Selected Pack:&nbsp;&nbsp; {USERSUBSCRIPTIONDATA.USERSUBSCRIPTIONTYPE}
                          &nbsp;&nbsp;&nbsp;&nbsp; Amount : &#8377;&nbsp;{USERSUBSCRIPTIONDATA.USERSUBSCRIPTIONPRICE}&nbsp;/- </h6></p>

                        {/* <p className={`${style.p1}`}>Subscription Ends on</p>
                        <p className={`${style.p2}`}>{USERSUBSCRIPTIONDATA.USERSUBENDDATE}</p> */}
                      </>
                    )}
                </div>
                {USERSUBSCRIPTIONDATA.USERSUBENDDATE === null ?
                  (
                    // <div className={`${style.mainadbominal} w-75 mb-3 `}>
                    <div className="d-flex justify-content-center ">
                      <button
                        className={`${style.card3}`}
                        style={{
                          border: "none",
                          backgroundColor: "##ffd401",
                        }}

                      >
                        <p className={`${style.cardp}`} onClick={() => ApproveUserSubscription()}>
                          ACTIVATE
                        </p>
                      </button>
                    </div>
                    // </div>
                  ) : (
                    <div className="d-flex justify-content-center w-100">
                      <div className={`${style.mainadbominal} w-75 mb-3 `}>
                        {
                          USERSUBSCRIPTIONDATA.USERSUBTIMELEFT.hours <= 0 && USERSUBSCRIPTIONDATA.USERSUBTIMELEFT.minutes <= 0 ? (
                            <button className={`${style.card3}`}
                              style={{
                                border: "none",
                              }}>
                              <p className={`${style.cardp}`} id="referfriendbtn" onClick={() => { swal.fire("User's plan has expired!!") }}>ADD DAYS</p>
                            </button>
                          ) : (
                            <button className={`${style.card3}`} type="button" data-toggle="modal" data-target="#myModal"
                              style={{
                                border: "none",
                              }}>
                              <p className={`${style.cardp}`} id="referfriendbtn" onClick={openPanel}>ADD DAYS</p>
                            </button>
                          )
                        }


                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                        <div class="modal fade" id="myModal">
                          <div class="modal-dialog modal-xl">
                            <div class="modal-content">

                              {/* <!-- Modal Header --> */}
                              {/* <div class="modal-header">
                                  <small type="button" class="close" data-dismiss="modal">&times;</small>
                                </div> */}

                              {/* <!-- Moda body --> */}

                              <div class="modal-body">




                                <div >
                                  <div className='d-flex flex-column align-items-center'>
                                    <div>
                                      <div className='d-flex flex-column align-items-center '>
                                        <h2> <b>ADD DAYS</b></h2>
                                        <h6 className='mt-2'>Today</h6>
                                        <h6><b>{CurreantDATE}</b></h6>
                                      </div>
                                    </div>
                                    <div className='d-flex justify-content-center w-75'>
                                      <div className={`${style.inputs} d-flex flex-column align-items-center`}>
                                        <h6>How many days to add?</h6>
                                        <input
                                          type="text"
                                          value={addedDays}
                                          onChange={handleDaysChange}
                                          placeholder="Add days"
                                          min={0}
                                          max={30}
                                        />
                                      </div>
                                      {/* <div className={`${style.inputs}`}>
      <h6>How many clients to add?</h6>
      <input type="text" name="" id="" />
    </div> */}
                                    </div>
                                    <div className="mt-2">
                                      <h6>
                                        OR
                                      </h6>
                                    </div>
                                    <div className='d-flex'>
                                      <div className={`${style.inputs} mr-5 d-flex flex-column align-items-center mt-3 `}>
                                        <h6 className='mb-3 mt-4'>Select Date Range</h6>
                                        <input type="date" disabled value={startDate === null ? 0 : startDate.toISOString().split('T')[0]} />
                                        <h5 className='mt-4 mb-4 '>to</h5>
                                        <input type="date" disabled value={endDate === null ? 0 : endDate.toISOString().split('T')[0]} />
                                      </div>
                                      <div>

                                        <div style={{ border: "2rem solid #bfbfbfe6", borderRadius: "10px" }} className='mt-4'>



                                          <DatePicker
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            inline
                                            monthsShown={2}
                                            disabled={true}
                                            className={style.datePicker} // Apply your custom class here
                                          />

                                        </div>
                                      </div>


                                    </div>
                                    <div className={`${style.Sub_btn} d-flex justify-content-center  mt-4 w-100`} >
                                      <button onClick={() => submitdateandclient()}>SUBMIT</button>
                                    </div>
                                  </div>
                                </div>



                              </div>



                            </div>
                          </div>
                        </div>
                        {/* </>
                      <> */}
                        <span
                          className={`${style.card3}`}
                          style={{
                            border: "none",
                            backgroundColor: "#c8c8c8",
                          }}

                        >
                          <p className={`${style.cardp}`} onClick={() => { Swal.fire("User is already approved.") }}>
                            ACTIVATED
                          </p>
                        </span>
                        {/* </> */}
                        <div className={`${style.card3} bg-danger`} >
                          {
                            USERSUBSCRIPTIONDATA.FORCESTOPSTATUS ? (
                              <p className={`${style.cardp}`} id="suggessionbtn" onClick={() => ForceStopUpdate(false)}> RESUME</p>
                            ) : (
                              <p className={`${style.cardp}`} id="suggessionbtn" onClick={() => ForceStopUpdate(true)}> STOP</p>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  )}
              </div>




            )}


        </div>


        <div className={`${style.mainneck}`}>
          <div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Referred By</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>{USERSUBSCRIPTIONDATA.USER_REFERED_BY}</p></div>
          </div>
          <div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Registration Date</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>{USERSUBSCRIPTIONDATA.USERREG_DATE}</p></div>
          </div>
        </div>

        <div className={`${style.mainadbominal}`}>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} id="referfriendbtn" onClick={openPanel}> REFER A FRIEND</p>
            {isRefferFriend && <h1><i class="fa-solid fa-caret-down" style={{ color: "#707070" }}></i></h1>}
          </div>
          <div className={`${style.card3}`} >
            <p className={`${style.cardp}`} onClick={copyReferralLink}> COPY REFERAL LINK</p>
          </div>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} id="suggessionbtn" onClick={openPanel}> SUGGESSION</p>
            {isSuggession && <h1><i class="fa-solid fa-caret-down" style={{ color: "#707070" }}></i></h1>}
          </div>
        </div>

        <div className={`${style.mainlow}`}>
          <div className={`${style.card4}`}>

            {isRefferFriend && <><div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Name</p></div>
              <div className={`${style.formvalue}`}>
                <input name="name" className={`${style.formvalueinput}`} type="text"
                  onChange={handleChange} value={refferFriend.name} autocomplete="off" /></div>
            </div>
              <div className={`${style.singleinput}`}>
                <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Contact Number</p></div>
                <div className={`${style.formvalue}`}>
                  <input name="contactNo" className={`${style.formvalueinput}`} type="text"
                    onChange={handleChange} value={refferFriend.contactNo} maxLength={10} autocomplete="off" /></div>
              </div>
              <div className={`${style.singleinput}`}>
                <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Profession</p></div>
                <div className={`${style.formvalue}`}>
                  <input name="profession" className={`${style.formvalueinput}`} type="text"
                    onChange={handleChange} value={refferFriend.profession} autocomplete="off" /></div>
              </div></>}



            {isSuggession && <>
              <div className={`${style.singleinput}`} style={{ "height": "300px" }}>
                <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Suggession</p></div>
                <div className={`${style.formvalue}`}><textarea name="suggession" className={`${style.formvalueinput}`}
                  placeholder="Leave your suggession here" onChange={handleChange} value={suggession.suggession} /></div>
              </div>

            </>}

            <div className={`${style.bottomdown}`}>
              <button className={`${style.bottombtn}`} onClick={handleSubmit}>SUMBIT</button>
            </div>

          </div>

        </div>

      </div>
    </div >
  );
}

export default UserSubscriptionPage;
