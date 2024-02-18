import React from 'react';
import style from './ClientsFamilyDropdown.module.css'
import { useState, useEffect } from 'react';
import { url_ } from '../../../Config';
import swal from "sweetalert2";

const ClientsFamilyDropdown = (props) => {
  const [isActive1, setIsActive1] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [clientName, setClinentName] = useState(props.clientDefaultName);
  const storedToken = window.localStorage.getItem("jwtToken");




  const user_id_gst = localStorage.getItem("user_id_gst");
  const user_id_it = localStorage.getItem("user_id_it");

  const grace_period_days = 30;

  const [itSubStatus, setITSubStatus] = useState();
  const [gstSubStatus, setGSTSubStatus] = useState();

  const Tablename = window.localStorage.getItem("Tablename");


  const GetData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/getClientByFamilyId/${localStorage.getItem("familyId")}`, requestOptions)
      const result = await response.json();

      setFamilyData(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    GetData();
  }, [fetch]);




  const updateName = async (name, cpan) => {

    setClinentName(name.split(" ")[0])



    const keysToRemove = Object.keys(localStorage);
    const keysToKeep = ['jwtToken', 'Login_fRelation', "Tablename"];
    keysToRemove.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    setIsActive1(!isActive1)

    await GetClientData(cpan);
    window.location.reload();

  };



  const GetClientData = async (ClientPAN) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/pan?pan=${ClientPAN}`, requestOptions)
      const result = await response.json();
      console.log(result);
      // console.log(result.users[0].clientId)
      // console.log(result.users[0].fRelation)
      // console.log(result.users[0].familyId)
      // localStorage.setItem("fRelation", result.users[0].fRelation);
      // localStorage.setItem("familyId", result.users[0].familyId);
      // if (data.users.length > 0)
      result.users.map((item) => {
        localStorage.setItem("fRelation", item.fRelation);
        localStorage.setItem("familyId", item.familyId);
        // console.log(item.category);
        switch (item.category) {
          case "Income_Tax":
            localStorage.setItem("client_id_it", item.clientId);
            localStorage.setItem("user_id_it", item.userid);

            break;
          case "GST":
            localStorage.setItem("client_id_gst", item.clientId);
            localStorage.setItem("user_id_gst", item.userid);

            break;
          case "Both":
            console.log("both")
            localStorage.setItem("client_id_it", item.clientId);
            localStorage.setItem("client_id_gst", item.clientId);

            localStorage.setItem("user_id_it", item.userid);
            localStorage.setItem("user_id_gst", item.userid);

            break;
          default:
        }
      })
      //const client_id = data.client.clientId;            
      //localStorage.setItem("client_id", client_id);
      storeJwtData(result.users[0]);
      checkSubscriptionStatus();



    } catch (error) {
      console.log(error)
    }
  }
  function storeJwtData(jwtData) {
    Object.keys(jwtData).forEach((key) => {
      localStorage.setItem(key, jwtData[key]);
    });

  }
  async function checkSubscriptionStatus() {


    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${storedToken})}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    if (user_id_it) {
      const response = await fetch(
        `${url_}/subscriptionpackuserdata/userid/${user_id_it}`,
        requestOptions
      );
      const result1 = await response.json();
      const result = result1.subscriptionData//await response.json();
      // console.log(result)
      const daysDiff = (Math.floor((new Date(result.subendtdate) - new Date()) / (1000 * 60 * 60 * 24))) + 1;
      if (result.forcestop) {
        setITSubStatus("off")
        localStorage.setItem("it_subs_status", 'off');
      }
      else if (!result.paid && daysDiff < 0 && daysDiff > (-grace_period_days)) {
        setITSubStatus("grace_period")
        localStorage.setItem("it_subs_status", 'grace_period');
      }
      else if (result.paid && daysDiff >= 0) {
        setITSubStatus("on")
        localStorage.setItem("it_subs_status", 'on');
      }
      else {
        setITSubStatus("off")
        localStorage.setItem("it_subs_status", 'off');
      }
    }
    else if (user_id_gst) {

      const response = await fetch(
        `${url_}/subscriptionpackuserdata/userid/${user_id_gst}`,
        requestOptions
      );
      const result1 = await response.json();
      const result = result1.subscriptionData//await response.json();
      const daysDiff = (Math.floor((new Date(result.subendtdate) - new Date()) / (1000 * 60 * 60 * 24))) + 1;
      if (result.forcestop) {
        setITSubStatus("off")
        localStorage.setItem("gst_subs_status", 'off');
      }
      else if (!result.paid && (daysDiff < 0 && daysDiff > (-grace_period_days))) {
        setGSTSubStatus("grace_period")
        localStorage.setItem("gst_subs_status", 'grace_period');
      }
      else if (result.paid && daysDiff >= 0) {
        setGSTSubStatus("on")
        localStorage.setItem("gst_subs_status", 'on');
      }
      else {
        setGSTSubStatus("off")
        localStorage.setItem("gst_subs_status", 'off');
      }
    }
    else {
      setGSTSubStatus("off")
      // localStorage.setItem("gst_subs_status",'off');
    }


    if (Tablename === "Temp") {

    } else {
      if ((itSubStatus === "off" || itSubStatus === null) && (gstSubStatus === "off" || gstSubStatus === null)) {
        swal.fire({
          icon: "error",
          title: "Service Stopped.!",
          text: `Kindly Contact your Tax Professional to resume your services.`
        })

      }
    }

  }
  return (
    <>

      {/* First dropdown */}
      <div className={`${style.wrapper} ${isActive1 ? 'active' : ''} `}>
        <div className={style.select_btn} onClick={() => setIsActive1(!isActive1)}>
          <span>{clientName} </span>
          {isActive1 ?
            <i className="uil uil-angle-down"></i>
            :
            <i className="uil uil-angle-up"></i>}
        </div>
        {isActive1 && <>
          <span className={style.dropdown_square}></span>
          <div className={style.content}>
            <ul className={style.options}>


              {familyData.map((items, index) => (
                <li onClick={() => updateName(items.name, items.pan)}>{items.name.split(" ")[0]}</li>
              ))}




            </ul>
          </div>
        </>}
      </div>
    </>
  );
}

export default ClientsFamilyDropdown;
