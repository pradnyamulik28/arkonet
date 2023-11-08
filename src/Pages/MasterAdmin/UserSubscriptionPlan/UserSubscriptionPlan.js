import { useNavigate } from "react-router-dom";
import style from "./UserSubscriptionPlan.module.css";
import { useEffect, useState } from "react";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import taxko from "../../Images/Taxko.jpg";
// import arkonet from "../../Images/Arkonet.jpg";

const UserSubscriptionPlan = () => {
  const Navigate = useNavigate();
  const [isRefferFriend, setIsRefferFriend] = useState(true);
  const [isSuggession, setIsSuggession] = useState(false);
  const [isValidMobile, setIsValidMobile] = useState(true);

  const storedToken = localStorage.getItem("jwtToken");

  const [refferFriend, setRefferFriend] = useState({
    name: "",
    contactNo: "",
    profession: ""
  })

  const [suggession, setSuggession] = useState({
    suggession: "",
  })

  const Substatus = false
  const subplanstatus = true
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
  const GOTO = () => {
    Navigate('subscriptionplan')
    // , {
    //   state: {
    //     clientId: cid,
    //     clientname: cname,
    //     clientpan: cpan,
    //     clientCategory: ccategory,
    //     clientProfession: cprofession,
    //   },
    // });

  }

  const [userInfo, setUserInfo] = useState({
    userid: localStorage.getItem("user_id"),
    userPAN: localStorage.getItem("pan"),
    days_left: "0",
    referredBy: "",//"Sonali Shyamkumar Goel",
    refferedPan: "",
    registration_date: "14 April 2024",
    end_date: "5 November 2023"
  });


  function copyReferralLink() {
    const refferalLink = `http://localhost:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
    navigator.clipboard.writeText(refferalLink);
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



  function fetchData() {
    const daysDiff = (Math.floor((new Date(userInfo.end_date) - new Date()) / (1000 * 60 * 60 * 24))) + 1;
    setUserInfo({ ...userInfo, days_left: `${daysDiff}` });
  }

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
      userid: userInfo.userid,
      pan: userInfo.userPAN,
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
      userid: userInfo.userid,
      pan: userInfo.userPAN,
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
    fetchUserSubscriptionData();
  }, [])




  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log('Start Date:', start);
    console.log('End Date:', end);
  };
  const fetchUserSubscriptionData = async () => {
    try {
      setStartDate(new Date(2023, 10, 12))
      setEndDate(new Date(2023, 10, 20))
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {

  }, []);

  const formatDate = (date) => {
    if (date) {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    return '';
  };

  return (
    <div className={`${style.workport}`}>

      <div className={`${style.maincont}`}>
        <div className={`${style.mainhair}`}>
          <h4 className={`${style.h31}`}>SUBSCRIPTION</h4>
        </div>

        <div className={`${style.mainhead}`}>
          <div className={`${style.circular}`}>
            <div className={`${style.card1}`}>

              <h3 className={userInfo.days_left >= 15 ? `${style.h31}` :
                userInfo.days_left <= 0 ? `${style.h31} ${style.subs_end}` :
                  `${style.h31} ${style.subs_about_end}`}>
                {Math.abs(userInfo.days_left)}</h3>

              <p className={`${style.p1}`}>{userInfo.days_left < 0 ? `Days ago` : `Days Left`}</p>
            </div>
          </div>
          <div className={`${style.mainheadtextual}`}>
            <p className={`${style.p1}`}>Subscription Ends on</p>
            <p className={`${style.p2}`}>{userInfo.end_date}</p>
          </div>
          <div className={`${style.mainadbominal} w-75 mb-3 `}>
            <button className={`${style.card3}`} type="button" data-toggle="modal" data-target="#myModal"
              style={{
                border: "none",
              }}>
              <p className={`${style.cardp}`} id="referfriendbtn" onClick={openPanel}>ADD DAYS</p>
            </button>

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
                            <h6><b>24/05/2023</b></h6>
                          </div>
                        </div>
                        <div className='d-flex justify-content-around w-75'>
                          <div className={`${style.inputs}`}>
                            <h6>How many days to add?</h6>
                            <input type="text" name="" id="" />
                          </div>
                          <div className={`${style.inputs}`}>
                            <h6>How many clients to add?</h6>
                            <input type="text" name="" id="" />
                          </div>
                        </div>
                        <div>
                          <h6>
                            OR
                          </h6>
                        </div>
                        <div className='d-flex'>
                          <div className={`${style.inputs} mr-5 d-flex flex-column align-items-center mt-3 `}>
                            <h6 className='mb-3 mt-4'>Select Date Range</h6>
                            <input type="date" />
                            <h5 className='mt-4 mb-4 '>to</h5>
                            <input type="date" name="" id="" />
                          </div>
                          <div>

                            <div style={{ border: "2rem solid #bfbfbfe6", borderRadius: "10px" }} className='mt-4'>

                              <DatePicker
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                                monthsShown={2}
                                className={`${style}`} // Apply your custom class here
                              />
                            </div>
                          </div>


                        </div>
                        <div className={`${style.Sub_btn} d-flex justify-content-center  mt-4 w-100`} >
                          <button>SUBMIT</button>
                        </div>
                      </div>
                    </div>



                  </div>



                </div>
              </div>
            </div>
            <button
              className={`${style.card3}`}
              style={{
                border: "none",
                backgroundColor: subplanstatus ? "#c8c8c8" : "",
              }}
              disabled={subplanstatus}
            >
              <p className={`${style.cardp}`} onClick={copyReferralLink}>
                ACTIVATE
              </p>
            </button>

            <div className={`${style.card3} bg-danger`} >
              {
                Substatus === true ? (
                  <p className={`${style.cardp}`} id="suggessionbtn" onClick={openPanel}> STOP</p>
                ) : (
                  <p className={`${style.cardp}`} id="suggessionbtn" onClick={openPanel}> START</p>
                )
              }
            </div>
          </div>
        </div>

        <div className={`${style.mainneck} mb-3`}>

          <div className={`${style.neckgraycard} mb-4`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Referred By</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>{userInfo.referredBy}</p></div>
          </div>

          <div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Registration Date</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>{userInfo.registration_date}</p></div>
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
              <div className={`${style.formvalue}`}><input name="name" className={`${style.formvalueinput}`} type="text"
                onChange={handleChange} value={refferFriend.name} autoComplete="off" /></div>
            </div>
              <div className={`${style.singleinput}`}>
                <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Contact Number</p></div>
                <div className={`${style.formvalue}`}><input name="contactNo" className={`${style.formvalueinput}`} type="text"
                  onChange={handleChange} value={refferFriend.contactNo} maxLength={10} /></div>
              </div>
              <div className={`${style.singleinput}`}>
                <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Profession</p></div>
                <div className={`${style.formvalue}`}><input name="profession" className={`${style.formvalueinput}`} type="text"
                  onChange={handleChange} value={refferFriend.profession} /></div>
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
    </div>
  );
}

export default UserSubscriptionPlan;