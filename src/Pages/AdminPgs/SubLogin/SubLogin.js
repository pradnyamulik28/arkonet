import React, { useState, useEffect } from 'react';
import style from './SubLogin.module.css'
import SubLoginRegister from './SubLoginRegister';
import { url_ } from '../../../Config';
import SubLoginUpdate from './SubLoginUpdate';
import SubLoginClientView from './SubLoginClientView';
import Swal from 'sweetalert2';
import SubLoginRenewal from './SubLoginRenewal';
import InputField from '../../../components/InputField/InputField';

const SubLogin = () => {

  const storedToken = window.localStorage.getItem('jwtToken');
  const user_id = window.localStorage.getItem('user_id');
  const End_Date = window.localStorage.getItem('End_Date');

  useEffect(() => {
    GetSUbLoginData();
    Remainingdays();
    GetClientData();
  }, []);

  const [subUSERID, setSubUSERID] = useState("");
  const [blinkStyle, setBlinkStyle] = useState(false);
  const [ClientsData, setClientsData] = useState([]);
  const [sublogins, setSublogins] = useState([]);
  const [UserRemainingDays, setUserRemainingDays] = useState();
  const [values, setValues] = useState({
    email: "",
    mobile: "",
    pan: "",
    name: "",
    SubUserId: ""
  })
  const GetSUbLoginData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/getSub_Users/${user_id}`, requestOptions);
      const result = await response.json();
      console.log(result);
      setSublogins(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const GetClientData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/getClientByUserid/${user_id}`, requestOptions);
      const result = await response.json();
      console.log(result);
      setClientsData(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const Remainingdays = () => {
    // setUserRemainingDays(CalculateRemainingDays(End_Date))
    const daysDiff = (Math.floor((new Date(End_Date) - new Date()) / (1000 * 60 * 60 * 24))) + 1;
    setUserRemainingDays(daysDiff)
    // console.log(daysDiff)
  }

  function getFormattedDate(inputDate) {
    const dateObject = new Date(inputDate);
    return dateObject.toISOString().split('T')[0];
  }

  function getFormattedTime(inputDate) {
    const dateObject = new Date(inputDate);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const period = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes}${period}`;
  }


  const handleItemClick = (clickedData) => {

    console.log("Clicked Data:", clickedData.id);
    setValues({
      email: clickedData.email || "",
      mobile: clickedData.mobile || "",
      pan: clickedData.pan || "",
      name: clickedData.name || "",
      SubUserId: clickedData.id || ""
    });
  };
  const handleSubID = (subid) => {

    console.log("Clicked Data:", subid);

  };



  const handleChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });


  }


  const handleUpdate = async () => {

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      Swal.fire('Invalid email format');
      return;
    }

    // Validate mobile format (assuming a simple check for numeric value and length here)
    const mobileRegex = /^[0-9]+$/;
    if (!mobileRegex.test(values.mobile) || values.mobile.length !== 10) {
      Swal.fire('Invalid mobile number');
      return;
    }

    // Validate PAN format (assuming a simple check for alphanumeric and length here)
    const panRegex = /^[A-Za-z0-9]+$/;
    if (!panRegex.test(values.pan) || values.pan.length !== 10) {
      Swal.fire('Invalid PAN');
      return;
    }



    if (
      !values.name ||
      !values.email ||
      !values.pan ||
      !values.mobile
    ) {
      Swal.fire("Please fill in all fields")
    } else {
      try {
        // Set up headers for the request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${storedToken}`);

        // Create a JSON string with the data to be updated
        var raw = JSON.stringify({
          "name": values.name,
          "pan": values.pan,
          "email": values.email,
          "mobile": values.mobile
        });

        // Set up the request options
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        // Make the PUT request using the Fetch API

        const response = await fetch(`${url_}/updateSub_Users/${values.SubUserId}`, requestOptions);
        // const result = await response.text();
        // console.log(result);
        if (response.status === 200) {
          await Swal.fire("Success.", "Data updated successful.", "success")
          setValues({
            pan: "",
            email: "",
            mobile: "",
            name: ""
          })
          window.location.reload();
        } else {
          Swal.fire("Failed!", "Failed to update!!", "error")
          setValues({
            pan: "",
            email: "",
            mobile: "",
            name: ""
          })
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };


  return (
    <div style={{ width: "98%" }}>



      <div >
        <div className='d-flex flex-column align-items-center mt-4 mb-3'>
          <h2 className='d-flex justify-content-center'><b>SUB LOGINS</b></h2>
          <SubLoginRegister DaysRemaining={UserRemainingDays}>
            <div className='mt-3'>
              <button className={`${style.buysublogin_btn} d-flex justify-content-center`}><b>BUY LOGIN</b></button>
            </div>
          </SubLoginRegister>
        </div>
      </div>
      <hr style={{ backgroundColor: "#d9d3d3", height: "1px", borderRadius: "5px" }} />

      {sublogins.length === 0 ? (
        <div style={{ height: "35rem" }} className='d-flex flex-column '>
          <>
            <h1 style={{
              margin: "10rem auto",
              fontFamily: "cursive"
            }}>No SUB User's</h1>
          </>

        </div>

      ) : (
        <div style={{ height: "35rem", overflowY: "scroll" }} className='d-flex flex-column '>
          <>
            {sublogins.map((item, index) => (
              <div style={{
                width: "95%",
                padding: "2rem",
                boxShadow: "1px 1px 10px gray",
                marginTop: "2rem",
                marginBottom: "2rem",
                borderBottomLeftRadius: "50px",
                borderTopRightRadius: "50px"
              }} className='container'>
                <div className='d-flex justify-content-between align-items-center'>
                  <span style={{ fontSize: "1rem" }}><b>SUB LOGIN {index + 1}</b></span>
                  {
                    item.name === null ? (
                      <div className=''>
                        <button className={`${style.buysublogin_btn}`} onClick={() => {
                          Swal.fire("Sub Login data can't be empty!!. Update the sub Login data.")
                          setBlinkStyle(true);

                          // Reset the style after 30 seconds
                          setTimeout(function () {
                            setBlinkStyle(false);
                          }, 15000);  // 30,000 milliseconds = 30 seconds

                        }}><b>Assign Clients</b></button>
                      </div>
                    ) : (
                      <div className='' onClick={() => handleSubID(item.id)}>
                        <SubLoginClientView CData={ClientsData} SubUserID={subUSERID}>
                          <button className={`${style.buysublogin_btn}`}><b>Assign Clients</b></button>
                        </SubLoginClientView>
                      </div>
                    )
                  }
                </div>
                <hr style={{ backgroundColor: "#d9d3d3", borderRadius: "5px" }} />


                <div className='row mt-4'>
                  <div className='col-md-3 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.name}</b></div>
                  <div className='col-md-2 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.pan}</b></div>
                  <div className='col-md-2 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.mobile}</b></div>
                  <div className='col-md-2 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.email}</b></div>
                  <div className='col-md-1 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }} >

                    {item.name === null ? (
                      <b className={blinkStyle ? style.blink : style.NOTblink}><i className={blinkStyle ? "bi bi-pencil-square text-danger" : "bi bi-pencil-square"} onClick={() => handleItemClick(item)} data-toggle="modal" data-target="#exampleModal1"></i></b>
                    ) : (
                      <b className={style.NOTblink}><i className="bi bi-pencil-square" onClick={() => handleItemClick(item)} data-toggle="modal" data-target="#exampleModal1"></i></b>
                    )}

                  </div>
                  <div className='col-md-2 col-sm-12 d-flex justify-content-center mb-2' style={{ height: "2rem" }}>
                    <SubLoginRenewal AmountToPay={2.7 * UserRemainingDays} SubUserId={item.id} >
                      <button className={`${style.buysublogin_btn} d-flex justify-content-center w-100`}><b>Renew</b></button>
                    </SubLoginRenewal >
                  </div>
                </div>


                <hr style={{ backgroundColor: "#d9d3d3", borderRadius: "5px" }} />



                <div className='row'>
                  <div className="col-md-4"></div>
                  <div className="col-md-8">
                    <div className="d-flex flex-md-row flex-column justify-content-between" style={{
                      boxShadow: "gray 2px 3px 10px",
                      borderRadius: "10px",
                      padding: "7px"
                    }}>
                      <div className="col-md-6 mb-md-0 mb-3">
                        <h6 className='text-center'><b>Start Date :</b>{getFormattedDate(item.startDate)}</h6>
                        <h6 className='text-center'><b>Time :</b> {getFormattedTime(item.startDate)}</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className='text-center'><b>End Date :</b> {getFormattedDate(item.endDate)}</h6>
                        <h6 className='text-center'><b>Time :</b> {getFormattedTime(item.endDate)}</h6>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            ))}
          </>

        </div>

      )
      }



      <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div className=' mt-4 mb-2 ml-3'>
                <h4><b>UPDATE SUB-LOGIN</b></h4>
              </div>
              <button className={`${style.close}`} type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <>
                <div className='d-flex flex-column justify-content-center'>

                  <InputField placeholder='Enter name...' onChange={handleChange} lblname='Name' name='name' value={values.name} />
                  <InputField placeholder='Enter PAN...' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} />
                  <InputField placeholder='Enter email...' onChange={handleChange} lblname='Email' name='email' value={values.email} />
                  <InputField placeholder='Enter mobile...' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} />

                </div>
              </>
            </div>
            <div class="modal-footer">

              <div className='mt-3 d-flex justify-content-center w-100'>
                <button className={`${style.buysublogin_btn} d-flex justify-content-center`} onClick={handleUpdate}><b>UPDATE</b></button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div >
  );
}

export default SubLogin;
