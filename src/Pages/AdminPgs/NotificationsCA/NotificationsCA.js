import React, { useState, useEffect } from 'react';
import style from './NotificationCA.module.css'
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';

const NotificationsCA = () => {
  const [filename, setFilename] = useState("No file selected.");
  const [formdata, setFormdata] = useState({
    details: "",
    noti_img: ``
  });

  const [emailData, setEmailData] = useState({
    To: "",
    DateTime: "",
    Message: "",
    Img: ""
  })

  const wordLimit = 300;

  function handleChange(e) {
    const { name, value } = e.target;
    const file = e.target.files && e.target.files[0]; // Check if files array is defined

    switch (name) {
      case "details":
        const inputText = e.target.value;
        // Split the text into words and filter out empty strings
        const words = inputText.split(' ').filter(word => word.length > 0);

        if (words.length <= wordLimit) {
          setFormdata({ ...formdata, [name]: value });
        }
        break;

      case "noti_img":
        if (file) {
          setFormdata({ ...formdata, [name]: file });
        } else {
          setFormdata({ ...formdata, [name]: value });
        }
        setFilename(file.name)
        break;
      default:
    }
  }



  const [tcdata, setTcdata] = useState([]);
  const [clientCategory, setclientCategory] = useState("");
  const storedToken = window.localStorage.getItem('jwtToken');
  const user_id = window.localStorage.getItem('user_id');
  const user_name = window.localStorage.getItem('user_name');

  const handleClients = async (data) => {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      if (data === "Income_Tax") {

        const response1 = await fetch(`${url_}/getClientByIncomeTax/${user_id}`, requestOptions);
        const result1 = await response1.json();
        // console.log(result)
        setTcdata(result1)
        setclientCategory(data)
      } else if (data === "GST") {
        const response2 = await fetch(`${url_}/getClientByGst/${user_id}`, requestOptions);
        const result2 = await response2.json();
        // console.log(result)
        setTcdata(result2)
        setclientCategory(data)
      } else {
        const response3 = await fetch(`${url_}/getClientByUserid/${user_id}`, requestOptions);
        const result3 = await response3.json();
        // console.log(result3)
        setTcdata(result3)
        setclientCategory(data)
      }


      // if (Sub_category !== "Sub User") {
      // setTcdata(data);
      // } else {
      //   const filteredResult = data.filter(item => item.subUserId == sub_userid);
      //   setTcdata(filteredResult);

      // }

    } catch (error) {
      console.warn("Error on function calling...");
    }
  }
  // const [clientName, setClientName] = useState("");
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllIncome_Tax, setSelectAllIncomeTax] = useState(false);
  const [selectAllGST, setSelectAllGST] = useState(false);
  const [notiCategory, setNotiCategory] = useState("");
  const [notiClienName, setNotiClienName] = useState("");

  const handleCheckboxChange = (checkboxName) => {
    // Toggle checkbox state
    const isChecked = checkedCheckboxes.includes(checkboxName);
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes.filter((name) => name !== checkboxName)
      : [...checkedCheckboxes, checkboxName];
    setCheckedCheckboxes(updatedCheckboxes);
  };



  const handleSelectAll = () => {
    if (selectAll) {
      // If all are selected, unselect all
      setCheckedCheckboxes([]);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(false);
    } else {
      // Otherwise, select all checkboxes
      const allClientIds = tcdata.map(item => item.clientId);
      setCheckedCheckboxes(allClientIds);
      setSelectAll(true);
      setSelectAllIncomeTax(true);
      setSelectAllGST(true);
    }
  };

  const handleSelectAllIncomeTax = () => {



    if (selectAllIncome_Tax) {
      // If all are selected, unselect all
      setCheckedCheckboxes([]);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(false);
    } else {
      // Otherwise, select all checkboxes
      const allClientIds = tcdata.map(item => item.clientId);
      setCheckedCheckboxes(allClientIds);
      setSelectAll(false);
      setSelectAllIncomeTax(true);
      setSelectAllGST(false);
    }
  };

  const handleSelectAllGST = () => {
    if (selectAllGST) {
      // If all are selected, unselect all
      setCheckedCheckboxes([]);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(false);
    } else {
      // Otherwise, select all checkboxes
      const allClientIds = tcdata.map(item => item.clientId);
      setCheckedCheckboxes(allClientIds);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(true);
    }
  };




  const [singlesNoti, setSinglesNoti] = useState([]);
  const [multiplesNoti, setMultiplesNoti] = useState([]);
  const [multiNoti, setMultiNoti] = useState([]);
  const GetSentNotifications = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response1 = await fetch(`${url_}/GetSingleCategoey/${user_id}`, requestOptions);
      const result1 = await response1.json();

      // Filter notifications starting with "TT"
      const ttNotifications = result1.filter(
        (item) => item.notificationTo.startsWith("TT")
      );

      // Filter and group notifications excluding those starting with "TT"
      const filteredData = result1.filter(
        (item) => !item.notificationTo.startsWith("TT")
      );
      const groupedNotifications = filteredData.reduce((acc, notification) => {
        const existingGroup = acc.find(group => group.notificationTo === notification.notificationTo);
        if (existingGroup) {
          existingGroup.data.push(notification);
        } else {
          acc.push({
            notificationTo: notification.notificationTo,
            data: [notification]
          });
        }
        return acc;
      }, []);
      // Combine "TT" notifications with grouped notifications
      const combinedArray = {
        "A": ttNotifications,
        "B": groupedNotifications
      };
      // console.log("GetSingleCategoey", combinedArray);
      setSinglesNoti(combinedArray.A)
      setMultiplesNoti(combinedArray.B)

      const response2 = await fetch(`${url_}/GetMultipleCategory/${user_id}`, requestOptions);
      const result2 = await response2.json();
      // console.log("GetMultipleCategory", result2);

      const groupedData = {};

      for (const item of result2) {
        const category = item.category;
        if (!groupedData[category]) {
          groupedData[category] = [];
        }
        groupedData[category].push(item);
      }

      const groupedArray = Object.keys(groupedData).map(key => ({
        category: key,
        notifications: groupedData[key]
      }));

      console.log(groupedArray)
      setMultiNoti(groupedArray)


    } catch (error) {
      console.log(error)
    }
  }



  const handleNotification = async () => {



    let currentDate = new Date();

    // Format the date
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    let todate = currentDate.toLocaleString('en-US', options);

    // const formattedString = data.join(',');
    //
    if (checkedCheckboxes.length === 0) {
      Swal.fire("Select atleast one client!!!");
    } else {
      // console.log(formdata.noti_img)
      // console.log(formdata.details)
      // console.log(checkedCheckboxes.join(','))
      // console.log(todate)
      // console.log(user_name)
      // console.log(`${checkedCheckboxes.length === 1 ? `${notiClienName}` :
      //   selectAll ? 'All Clients' :
      //     selectAllIncome_Tax ? 'All Income Tax Clients' :
      //       selectAllGST ? 'All GST Clients' :
      //         'Multiple Clients'
      //   }`)
      // console.log(user_id)
      // console.log(`${selectAll ? `ALL${multiNoti.length + 1}` : "Single"}`)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var APIformdata = new FormData();
        APIformdata.append("file", formdata.noti_img);
        APIformdata.append("text", formdata.details);
        APIformdata.append("clientIds", checkedCheckboxes.join(','));
        APIformdata.append("sendDate", todate);
        APIformdata.append("from", user_name);
        APIformdata.append("to", (`${checkedCheckboxes.length === 1 ? `TT${notiClienName}` :
          selectAll ? 'All Clients' :
            selectAllIncome_Tax ? 'All Income Tax Clients' :
              selectAllGST ? 'All GST Clients' :
                'Multiple Clients'
          }`));
        APIformdata.append("userid", user_id);
        APIformdata.append("category", `${selectAll ? `ALL${multiNoti.length + 1}` : "Single"}`);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: APIformdata,
          redirect: 'follow'
        };

        const Response = await fetch(`${url_}/SaveNotification`, requestOptions)
        const Result = await Response.text();
        console.log(Result)
        if (Response.ok) {
          await Swal.fire("Success.", "Notification sent successfully.", "success");
          window.location.reload();
        } else {
          await Swal.fire("Failed.", "Failed to send notification!!!", "error");
          window.location.reload();
        }
      } catch (error) {
        console.log(error)
      }
    }

  }


  const handlePreview = (pdata, pCategory) => {
    console.log(pdata, pCategory)
    if (pCategory === "Singles") {
      setEmailData({
        To: pdata.notificationTo,
        DateTime: pdata.sendDate,
        Message: pdata.text === "undefined" ? "" : pdata.text,
        Img: ""
      })
    } else if (pCategory === "Multiples") {
      setEmailData({
        To: pdata.notificationTo,
        DateTime: pdata.data[0].sendDate,
        Message: pdata.data[0].text === "undefined" ? "" : pdata.data[0].text,
        Img: ""
      })
    } else if (pCategory === "All") {
      setEmailData({
        To: (pdata.category).slice(0, 3),
        DateTime: pdata.notifications[0].sendDate,
        Message: pdata.notifications[0].text,
        Img: ""
      })


    } else {
      setEmailData({
        To: "",
        DateTime: "",
        Message: "",
        Img: ""
      })
    }
  }


  useEffect(() => {
    handleClients("ALL");
    GetSentNotifications();
  }, []);
  return (
    <>

      <div className={style.noti_Titile}>
        <h3>
          <b>
            Notify your clients
          </b>
        </h3>
      </div>
      <div className={style.noti_TextareaAndIMGarea}>
        <div className={style.noti_First_Section}>
          <div className={style.noti_input_area}>
            <h5 className='text-center'><b>Add Text</b></h5>
            <div className={style.TEXT_area}>
              <textarea name="details" className={`${style.text2}`} defaultValue={formdata.details}
                onChange={handleChange} placeholder={`Max. ${wordLimit} Words..`} />

              <div className={`${style.p2}`}>
                <p className={`${style.wordcount}`}>Word Count: {formdata.details.split(' ').filter(word => word.length > 0).length}/{wordLimit}</p>
              </div>
            </div>
          </div>
          <div className={style.noti_img_area}>
            <label htmlFor="noti_img_upload"><b>Upload file</b></label>
            <div className={style.upload_btn_wrapper}>
              <div>
                <button className={style.btn}>Upload a file</button>
                <input type="file" name="noti_img" id='noti_img_upload' onChange={handleChange} />
                <div className='w-100 text-center mt-2'>{filename}</div>
              </div>

            </div>
          </div>
        </div>
        <div className={style.noti_Second_Section}>
          {/* {formdata.details === "" || formdata.noti_img === null ? <>
          </> : <>
            <button data-toggle="modal" data-target=".bd-example-modal-xl" >SEND</button>
          </>} */}
          <button data-toggle="modal" data-target=".bd-example-modal-xl" >SEND</button>

        </div>
      </div>
      <div className={style.noti_Lists}>
        <h4 className='mt-3 mb-2'><b>Notifications</b></h4>
        <div className={style.noti_lists} >

          {singlesNoti.map((item, index) => (
            <div className={`${style.noti_list} row`} key={index}>
              <span className="col-3">{index + 1}</span>
              <span className="col-3">{(item.notificationTo).slice(2)}</span>
              <span className="col-3">{(item.sendDate).slice(0, 16)}</span>
              <span className="col-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handlePreview(item, "Singles")}>Preview...</span>
            </div>
          ))}

          {multiplesNoti.map((item, index) => (
            <div className={`${style.noti_list} row`} key={index}>
              <span className="col-3">{singlesNoti.length + index + 1}</span>
              <span className="col-3">{item.notificationTo}</span>
              <span className="col-3">{item.data[0].sendDate}</span>
              <span className="col-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handlePreview(item, "Multiples")}>Preview...</span>
            </div>
          ))}


          {multiNoti.map((item, index) => (
            <div className={`${style.noti_list} row`} key={index}>
              <span className="col-3">{singlesNoti.length + multiplesNoti.length + index + 1}</span>
              <span className="col-3">{(item.category).slice(0, 3)}</span>
              <span className="col-3">{item.notifications[0].sendDate}</span>
              <span className="col-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handlePreview(item, "All")}>Preview...</span>
            </div>
          ))}



        </div>
      </div>


      <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Send To...</h5>
            </div>
            <div className="modal-body">
              <div className={style.noti_Clients_Option}>
                <button className='col-4' onClick={() => handleClients("Income_Tax")}><span>Income Tax Clients</span></button>
                <button className='col-4' onClick={() => handleClients("GST")}><span>GST Clients</span></button>
                <button className='col-4' onClick={() => handleClients("ALL")}><span>ALL</span></button>
              </div>
              <div className={style.Select_All}>
                <div className={`col ${style.Select_All_Option}`}>
                  {clientCategory === "ALL" ? <>
                    <input
                      type="checkbox"
                      id="SelectAll"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="SelectAll"> Select All</label>
                  </> :
                    clientCategory === "Income_Tax" ? <>
                      <input
                        type="checkbox"
                        id="SelectAll"
                        checked={selectAllIncome_Tax}
                        onChange={handleSelectAllIncomeTax}
                      />
                      <label htmlFor="SelectAll"> Select all income tax</label>
                    </> :
                      clientCategory === "GST" ? <>
                        <input
                          type="checkbox"
                          id="SelectAll"
                          checked={selectAllGST}
                          onChange={handleSelectAllGST}
                        />
                        <label htmlFor="SelectAll"> Select all GST</label>
                      </> :
                        <></>}

                </div>

              </div>
              <div className={style.noti_Client_lists}>
                <>
                  <div className='d-flex flex-column justify-content-center'>
                    <table className="table table-striped ">
                      <thead>
                        <tr style={{ backgroundColor: "#ffd401e6" }}>
                          <th scope="col" className="text-center">#</th>
                          <th scope="col" className="text-center">NAME</th>
                          <th scope="col" className={`text-center ${style.table_tr}`}>PAN</th>
                          <th scope="col" className={`text-center ${style.table_tr}`}>Mobile</th>
                        </tr>
                      </thead>
                      <tbody>

                        {tcdata.map((item, index) => (
                          <tr key={index} >
                            <td className="text-center">
                              <input
                                type="checkbox"
                                id={item.clientId}
                                checked={checkedCheckboxes.includes(item.clientId)}
                                onChange={() => {
                                  handleCheckboxChange(item.clientId);
                                  setNotiClienName(item.name);
                                }
                                }
                              />
                            </td>
                            <td className='text-center'>{item.name}</td>
                            <td className={`text-center ${style.table_tr}`}>{item.pan}</td>
                            <td className={`text-center ${style.table_tr}`}>{item.mobile}</td>

                          </tr>
                        ))}



                      </tbody>
                    </table>
                  </div>
                </>
              </div>

            </div>
            <div className={`${style.noti_Modal_footer_btn} modal-footer d-flex justify-content-center `}>
              <button onClick={handleNotification}>Send Notification</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Sent to....</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="email-container">

                <div class="email-content">
                  <p><strong>To:</strong> {(emailData.To).replace("TT", " ")}</p>
                  <p><strong>Date Time:</strong> {emailData.DateTime}</p>
                  <p><strong>Message:</strong></p>
                  <p>
                    {emailData.Message}
                  </p>

                  <div class={style.image_container}>
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

export default NotificationsCA;



