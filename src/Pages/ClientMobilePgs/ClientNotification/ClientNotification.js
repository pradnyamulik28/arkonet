import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./ClientNotification.module.css";
import { url_ } from "../../../Config";
import taxko_logo from "../../../Images/taxko_logo1.png";

function ClientNotification() {

  const storedToken = window.localStorage.getItem("jwtToken");
  const clientID = window.localStorage.getItem("clientId");
  const [client_notification, setClient_notification] = useState([])
  const [emailData, setEmailData] = useState({
    From: "",
    DateTime: "",
    Message: "",
    Img: ""
  })
  const handlePreview = (pdata, notiID) => {
    // console.log(notiID)

    setEmailData({
      From: pdata.notificationFrom,
      DateTime: pdata.sendDate,
      Message: pdata.text === "undefined" ? "" : pdata.text,
      Img: ""
    })
    handleViewedNoti(notiID);
  }

  const handleViewedNoti = async (noti_ID) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/changeNotificationView/${noti_ID}`, requestOptions);
      const result = await response.text();

    } catch (error) {
      console.log(error)
    }
  }



  const GetClientNotifications = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const Response = await fetch(`${url_}/getListByClientid/${clientID}`, requestOptions);
      const Result = await Response.json();
      // console.log(Result)
      setClient_notification(Result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    GetClientNotifications();
  }, []);
  return (

    <>
      <div className={` ${style.backlink}`}>
        <Link to="/client/clientpasscheck/clienthome">
          <i className="fa-solid fa-angle-left"></i> &nbsp;Notifications
        </Link>
      </div>
      <hr />
      <div className={style.ClientNoti_Main_body}>
        {client_notification.map((item, index) => (
          <div key={index} className={`${style.ClientNoti_N_Lists}`} data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handlePreview(item, item.id)} style={item.notificationView === false ? { backgroundColor: "#ffe35c" } : { backgroundColor: "#e2e2e2" }}>
            <div className={`${style.ClientNoti_N_Lists_A}`}>
              <img src={taxko_logo} alt="TAXKO" />
            </div>
            <div className={`${style.ClientNoti_N_Lists_B}`}>
              <span>{item.notificationFrom}</span>
              <hr />
              <div>{item.text === "undefined" ? '' : item.text.length > 40 ? item.text.slice(0, 40) + " . . . ." : item.text + "."}&nbsp;</div>
              <small>{item.sendDate}</small></div>
          </div>

        ))}


      </div >


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Notification</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="email-container">

                <div class="email-content">
                  <p><strong>From:</strong> {emailData.From}</p>
                  <p><strong>Date Time:</strong> {emailData.DateTime}</p>
                  <p><strong>Message:</strong></p>
                  <p>
                    {emailData.Message}
                  </p>

                  <div class={style.Client_image_container}>
                    <img src="https://via.placeholder.com/400" alt="Placeholder Image" />
                  </div>
                </div>
                <hr />
                <div class="email-footer">

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>


  );
}

export default ClientNotification;
