import React, { useEffect, useState } from "react";
import style from "./ClientDashboard.module.css";
import profile from "../../../Images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSidebar } from "../ClientSideBar/SidebarContext";
import { url_ } from "../../../Config";
import NotificationBell from "../../../components/NotificationBell/NotificationBell"
import Swal from "sweetalert2";
import OtherUser from "../../../components/OtherUser/OtherUser";
import GSTFolder from "./GSTFolder";
import IncomeTaxFolder from "./IncomeTaxFolder";
import KYCFolder from "./KYCFolder";
import DocsFolder from "./DocsFolder";
import TallyBackup from "./TallyBackup";
import RecentUploadFile from "./RecentUploadsFile";

function ClientDashboard() {

  const { toggleSidebar, no_of_notifications, handleNotification } = useSidebar();

  const navigate = useNavigate();

  const gst_subs_status = localStorage.getItem("gst_subs_status");
  const it_subs_status = localStorage.getItem("it_subs_status");

  const Tablename = window.localStorage.getItem("Tablename");

  const [UserData, setUserData] = useState([])
  const [clientInfo, setClientInfo] = useState({
    storedToken: window.localStorage.getItem("jwtToken"),
    //clientid:localStorage.getItem("client_id"),
    client_id_it: localStorage.getItem("client_id_it"),
    client_id_gst: localStorage.getItem("client_id_gst"),
    name: localStorage.getItem("name").split(" ")[0],
    PAN: localStorage.getItem("pan"),
    profession: localStorage.getItem("profession"),
    imgsrc: profile,
  });
  const [lastUpdateDate, setLastUpdateDate] = useState({
    ITLastUpdate: "January 01.2023",
    GstLastUpdate: "January 01.2023",
    KYCLastUpdate: "January 01.2023",
    DocsLastUpdate: "January 01.2023",
    TallyLastUpdate: "January 01.2023"
  });
  const [lastUploadedPdf, setLastUploadedPdf] = useState({
    file: null,
    fileType: "",
    fileName: "Intimation u/s 139(9)",
    Date: "January 01.2023",
    size: "0",

  })


  const [dashboardFolders, setDashboardFolders] = useState([
    {
      name: "income_tax",
      id: "income_tax",
      title: "Income Tax",
      lastUpdateDate: "",
      linkTo: "clientincometax",
    },
    {
      name: "gst",
      id: "gst",
      title: "GST",
      lastUpdateDate: "",
      linkTo: "gstfolder",
    },
    {
      name: "kyc",
      id: "kyc",
      title: "KYC",
      lastUpdateDate: "",
      linkTo: "kyc",
    },
    {
      name: "gst",
      id: "gst",
      title: "GST",
      lastUpdateDate: "",
      linkTo: "",
    }
  ])


  //const [no_of_notifications,setNo_of_notifications]=useState(0);
  useEffect(() => {


    GetData();

    // getAllData()
    getClientImage();
    fetchLastUpdateDates();


  }, []);

  const GetData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/by-profession/all`, requestOptions);
      const result = await response.json();
      setUserData(result)
      console.log(result)
    } catch (error) {
      console.error('Error:', error.message);
    }


  };
  async function getClientImage() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/getclientimage/${clientInfo.PAN}`, requestOptions)
      .then(response => response.json())
      .then(result => {//console.log(result)
        setClientInfo({ ...clientInfo, imgsrc: `data:image/png;base64,${result.content}` })
      })
      .catch(error => console.log('error', error));
  }

  async function viewLastUploadedFile() {
    let fetchurl = ``;
    if (clientInfo.client_id_it && clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_gst}`;
    }
    else if (clientInfo.client_id_it) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_it}`;
    }
    else if (clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_gst}/${clientInfo.client_id_gst}`;
    }
    console.log(fetchurl)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    console.log(fetchurl)

    await fetch(`${url_}/getlastUpdateallonefile/${fetchurl}/${clientInfo.PAN}`, requestOptions)
      .then((response) => response.arrayBuffer())
      .then((result) => {
        const fileBlob = new Blob([result], {
          type: `application/pdf`,
        });

        const blobUrl = URL.createObjectURL(fileBlob);
        console.log(blobUrl)

        // setPdfBlobUrl(blobUrl);
        const pdfWindow = window.open(blobUrl, "_blank");
        pdfWindow.addEventListener("beforeunload", () => {
          URL.revokeObjectURL(blobUrl);
        });

      }).catch((error) => console.log(error));
  }



  async function viewLastUploadedImage() {
    let fetchurl = ``;
    if (clientInfo.client_id_it && clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_gst}`;
    }
    else if (clientInfo.client_id_it) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_it}`;
    }
    else if (clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_gst}/${clientInfo.client_id_gst}`;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`${url_}/getlastUpdateallonefile/${fetchurl}/${clientInfo.PAN}`, requestOptions)
      .then((response) => response.arrayBuffer())
      .then((result) => {
        const fileBlob = new Blob([result], {
          type: `image/jpeg`,
        });

        const blobUrl = URL.createObjectURL(fileBlob);
        console.log(blobUrl)

        // setPdfBlobUrl(blobUrl);
        const pdfWindow = window.open(blobUrl, "_blank");
        pdfWindow.addEventListener("beforeunload", () => {
          URL.revokeObjectURL(blobUrl);
        });

      }).catch((error) => console.log(error));
  }

  function numberToMonth(number) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    if (number >= 1 && number <= 12) {
      return months[number - 1];
    } else {
      return "Invalid month number";
    }
  }

  async function fetchLastUpdateDates() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    const lastUpdateCopy = { ...lastUpdateDate };


    if (clientInfo.client_id_it) {
      await fetch(`${url_}/maxLastUpdateDatefileandfilednotfiled/${clientInfo.client_id_it}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("IT ",result);
          const retrivedDate = result.lastUpdateDate.split("-");
          lastUpdateCopy["ITLastUpdate"] = `${numberToMonth(retrivedDate[1])} ${retrivedDate[2]}.${retrivedDate[0]}`;
        })
        .catch((error) => {
          console.log(error);
        })
    }

    if (clientInfo.client_id_gst) {
      await fetch(`${url_}/maxLastUpdateDateGSTfileandGSTfilednotfiled/${clientInfo.client_id_gst}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("GST",result);
          const retrivedDate = result.lastUpdateDate.split("-");
          lastUpdateCopy["GstLastUpdate"] = `${numberToMonth(retrivedDate[1])} ${retrivedDate[2]}.${retrivedDate[0]}`;
        })
        .catch((error) => {
          console.log(error);
        })
    }

    await fetch(`${url_}/maxLastUpdateDateforkycdoc/${clientInfo.PAN}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("KYC  ",result);
        const retrivedDate = result.split("-");
        lastUpdateCopy["KYCLastUpdate"] = `${numberToMonth(retrivedDate[1])} ${retrivedDate[2]}.${retrivedDate[0]}`;
      })
      .catch((error) => {
        console.log(error);
      })


    await fetch(`${url_}/maxLastUpdateDateforDocument/${clientInfo.PAN}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("doc",result);
        const retrivedDate = result.lastUpdateDate1.split("-");
        lastUpdateCopy["DocsLastUpdate"] = `${numberToMonth(retrivedDate[1])} ${retrivedDate[2]}.${retrivedDate[0]}`;
      })
      .catch((error) => {
        console.log(error);
      })


    // console.log(lastUpdateCopy)

    setLastUpdateDate(lastUpdateCopy)
    getLastFileInf();
  }



  async function fileSize() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let fetchurl = ``;
    if (clientInfo.client_id_it && clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_gst}`;
    }
    else if (clientInfo.client_id_it) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_it}`;
    }
    else if (clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_gst}/${clientInfo.client_id_gst}`;
    }

    try {
      const response = await fetch(
        `${url_}/getlastUpdateallonefile/${fetchurl}/${clientInfo.PAN}`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const sizeInBytes = result.size;
        const fileSize = Math.floor(sizeInBytes / 1024);
        //console.log(fileSize)
        return fileSize;
      }
    } catch (error) {
      console.log(error);
    }
  }




  async function getLastFileInf() {

    const filesize = await fileSize();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${clientInfo.storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let fetchurl = ``;
    if (clientInfo.client_id_it && clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_gst}`;
    }
    else if (clientInfo.client_id_it) {
      fetchurl = `${clientInfo.client_id_it}/${clientInfo.client_id_it}`;
    }
    else if (clientInfo.client_id_gst) {
      fetchurl = `${clientInfo.client_id_gst}/${clientInfo.client_id_gst}`;
    }
    // console.log(fetchurl)

    fetch(`${url_}/getlastUpdateallinformation/${fetchurl}/${clientInfo.PAN}`, requestOptions)
      .then(response => response.json())
      .then(result => {

        const updateDate = new Date(result.lastUpdateDate1);
        setLastUploadedPdf({
          ...lastUploadedPdf,
          file: null,
          fileType: result.imagePath.split(".")[1],
          fileName: result.imageName,
          Date: `${numberToMonth(updateDate.getMonth())} ${updateDate.getDate()}.${updateDate.getFullYear()}`,
          size: filesize >= 1024 ? `${Math.floor(filesize / 1024)}MB` : `${filesize}KB`
        })
        // fileSize();

      })
      .catch(error => console.log('error', error));
  }

  function handleCardClick(e) {
    const card_name = e.currentTarget.id;
    switch (card_name) {
      case "clientincometax":
        e.preventDefault();
        if (it_subs_status === "off") {
          Swal.fire({
            icon: "error",
            text: `This service has stopped.Kindly Contact your IT Tax Professional to resume your services.`
          })
        }
        else {
          navigate("clientincometax");
        }
        break;

      case "gstfolder":
        e.preventDefault();
        if (gst_subs_status === "off") {
          Swal.fire({
            icon: "error",
            text: `This service has stopped.Kindly Contact your GST Tax Professional to resume your services.`
          })
        }
        else {
          navigate("gstfolder")
        }
        break;


      case "tallybackup":
        e.preventDefault();

        navigate("tallybackup")

        break;

      default: break;
    }
  }


  return (
    <div className={` ${style.row1}`}>
      <div className={`${style.allport}`}>

        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          <div className={`${style.leftear}`}>

            <Link to="/client/clientpasscheck/clienthome" style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}>
              <i className="fa-solid fa-angle-left"></i>  &nbsp;&nbsp;Dashboard
            </Link>
            <NotificationBell onClick={handleNotification} no_of_notifications={no_of_notifications} />
          </div>
          <div className={`${style.rightear}`}>
            <h4>
              <i className="fa-solid fa-ellipsis" onClick={toggleSidebar}></i>
            </h4>
          </div>
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* Profile Starts*/}
        <div className={`${style.profileport}`}>
          <div className={`${style.card}`}>
            <img src={clientInfo.imgsrc} alt="profile_picture" className={`${style.img1}`} />
            <div className={`${style.cardbody}`}>
              <h5 className={`${style.h51}`}>{clientInfo.name}</h5>
              <p className={`${style.p1}`}>{clientInfo.PAN}</p>
              <p className={`${style.p2}`}>{clientInfo.profession}</p>
            </div></div></div>
        {/* Profile Ends......................................................................................................... */}

        {/* ABD Starts*/}
        <div className={`${style.abd}`}>
          <div className={`${style.leftbear}`}>
            <p className={`${style.p3}`}>My Folders</p>
          </div>
          <div className={`${style.rightbear}`}>
            <div className={`${style.licon}`}>
              <h5><i className="fa-solid fa-plus"></i></h5>
            </div>
            <div className={`${style.micon}`}>
              <h5><i className="fa-solid fa-sliders"></i></h5>
            </div>
            <div className={`${style.ricon}`}>
              <h5><i className="fa-solid fa-angle-right"></i></h5>
            </div>
          </div>
        </div>
        {/* ABD Ends ....................................................................................................... */}


        {/* Cards Starts*/}
        <div className={`row ${style.row2}`}>

          {clientInfo.client_id_it && <>

            {Tablename === "Temp" ? (
              <OtherUser USERSDATA={UserData}>
                <IncomeTaxFolder lastUpdateDate={lastUpdateDate.ITLastUpdate} />
              </OtherUser>
            ) : (
              <IncomeTaxFolder handleCardClick={handleCardClick} lastUpdateDate={lastUpdateDate.ITLastUpdate} />
            )}
          </>
            // <div className='col-6' id="clientincometax" onClick={handleCardClick}>
            //   <Link  >
            //     <div className={`${style.uniclass} ${style.card1}`}>
            //       <div className={`${style.icons} `}>
            //         <div className={`${style.lefticons} `}>
            //           <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#22b0b2" }}></i></h1>
            //         </div>
            //         <div className={`${style.righticons} `}>
            //           <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "#36dce2" }} ></i></h4>
            //         </div>
            //       </div>
            //       <div className={`${style.textual} `}>
            //         <div className={`${style.uptext} `}>
            //           <h5 style={{ color: "#54a280", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Income Tax</h5>
            //         </div>
            //         <div className={`${style.lowtext} `}>
            //           <p style={{ color: "#36dce2", fontSize: "0.9em" }}>{lastUpdateDate.ITLastUpdate}</p>
            //         </div>
            //       </div>
            //     </div>
            //   </Link>
            // </div>
          }


          {clientInfo.client_id_gst && <>

            {/* 
              // <div className='col-6' id="gstfolder" onClick={handleCardClick}>
              //   <Link >
              //     <div className={`${style.uniclass} ${style.card2}`}>
              //       <div className={`${style.icons} `}>
              //         <div className={`${style.lefticons} `}>
              //           <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#567cf2" }}></i></h1>
              //         </div>
              //         <div className={`${style.righticons} `}>
              //           <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "#567cf2" }} ></i></h4>
              //         </div>
              //       </div>
              //       <div className={`${style.textual} `}>
              //         <div className={`${style.uptext} `}>
              //           <h5 style={{ color: "#596fa4", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>GST</h5>
              //         </div>
              //         <div className={`${style.lowtext} `}>
              //           <p style={{ color: "#8c9ab4", fontSize: "0.9em" }}>{lastUpdateDate.GstLastUpdate}</p>
              //         </div>
              //       </div>
              //     </div>
              //   </Link>
              // </div> */}
            {Tablename === "Temp" ? (
              <OtherUser USERSDATA={UserData}>
                <GSTFolder lastUpdateDate={lastUpdateDate.GstLastUpdate}></GSTFolder>
              </OtherUser>
            ) : (
              <GSTFolder handleCardClick={handleCardClick} lastUpdateDate={lastUpdateDate.GstLastUpdate} />
            )}
          </>}

          {/* <div className='col-6' id="kyc" onClick={handleCardClick}>
            <Link to="kyc">
              <div className={`${style.uniclass} ${style.card3}`}>
                <div className={`${style.icons} `}>
                  <div className={`${style.lefticons} `}>
                    <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#f35554" }}></i></h1>
                  </div>
                  <div className={`${style.righticons} `}>
                    <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "#f35554" }} ></i></h4>
                  </div>
                </div>
                <div className={`${style.textual} `}>
                  <div className={`${style.uptext} `}>
                    <h5 style={{ color: "#9e6273", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>KYC</h5>
                  </div>
                  <div className={`${style.lowtext} `}>
                    <p style={{ color: "#f35554", fontSize: "0.9em" }}>{lastUpdateDate.KYCLastUpdate}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div> */}

          {Tablename === "Temp" ? (
            <OtherUser USERSDATA={UserData}>
              <KYCFolder lastUpdateDate={lastUpdateDate.KYCLastUpdate}></KYCFolder>
            </OtherUser>
          ) : (
            <KYCFolder handleCardClick={handleCardClick} lastUpdateDate={lastUpdateDate.KYCLastUpdate} />
          )}

          {/* ///////////////////////////////////////////////////////////////////////////////////// */}

          {/* <div className='col-6' id="docs" onClick={handleCardClick}>
            <Link to="docs" >
              <div className={`${style.uniclass} ${style.card4}`}>
                <div className={`${style.icons} `}>
                  <div className={`${style.lefticons} `}>
                    <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "#f4b51c" }}></i></h1>
                  </div>
                  <div className={`${style.righticons} `}>
                    <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "#f4b51c" }} ></i></h4>
                  </div>
                </div>
                <div className={`${style.textual} `}>
                  <div className={`${style.uptext} `}>
                    <h5 style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Docs</h5>
                  </div>
                  <div className={`${style.lowtext} `}>
                    <p style={{ color: "#f4b51c", fontSize: "0.9em" }}>{lastUpdateDate.DocsLastUpdate}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div> */}

          {Tablename === "Temp" ? (
            <OtherUser USERSDATA={UserData}>
              <DocsFolder lastUpdateDate={lastUpdateDate.DocsLastUpdate}></DocsFolder>
            </OtherUser>
          ) : (
            <DocsFolder handleCardClick={handleCardClick} lastUpdateDate={lastUpdateDate.DocsLastUpdate} />
          )}

          {/* ////////////////////////////////////////////////////////////////////////////////////// */}


          {/* <div className='col-6' id="tallybackup" onClick={handleCardClick}>
            <Link to="tallybackup" >
              <div className={`${style.uniclass} ${style.card5}`}>
                <div className={`${style.icons} `}>
                  <div className={`${style.lefticons} `}>
                    <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: "rgb(85 216 173)" }}></i></h1>
                  </div>
                  <div className={`${style.righticons} `}>
                    <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: "rgb(85 216 173)" }} ></i></h4>
                  </div>
                </div>
                <div className={`${style.textual} `}>
                  <div className={`${style.uptext} `}>
                    <h5 style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)" }}>Tally Backup</h5>
                  </div>
                  <div className={`${style.lowtext} `}>
                    <p style={{ color: "rgb(85 216 173)", fontSize: "0.9em" }}>{lastUpdateDate.TallyLastUpdate}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div> */}
          {Tablename === "Temp" ? (
            <OtherUser USERSDATA={UserData}>
              <TallyBackup lastUpdateDate={lastUpdateDate.TallyLastUpdate}></TallyBackup>
            </OtherUser>
          ) : (
            <TallyBackup handleCardClick={handleCardClick} lastUpdateDate={lastUpdateDate.TallyLastUpdate} />
          )}
        </div>
        {/* Cards Ends ....................................................................................................... */}

        {/* Recent Bar Starts*/}
        <div className={`${style.rb}`}>
          <div className={`${style.leftcear}`}>
            <p className={`${style.p3}`}>Recent Uploads</p>
          </div>
          <div className={`${style.rightcear}`}>
            <div className={`${style.micon}`}>
              <h4><i className="fa-solid fa-upload"></i></h4>
            </div>
          </div>
        </div>
        {/* Recent Bar Ends ....................................................................................................... */}


        {/* Uploadation Starts*/}
        {/* <div className={`${style.uploadation}`}>
          <div className={`${style.leftdear}`}>
            <div className={`${style.licon}`}>
              <h1>{lastUploadedPdf.fileType === "pdf" ? <i className="fa-solid fa-file-pdf" style={{ color: "#ff0000" }} onClick={viewLastUploadedFile}></i>
                : <i className="fa-solid fa-image" style={{ color: '#ff1100' }} onClick={viewLastUploadedImage}></i>}

              </h1>
            </div>
            <div className={`${style.ricon}`}>
              <div className={`${style.uptext} `}>
                <p style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)", fontWeight: "bold", marginBottom: "0.4rem" }}>{lastUploadedPdf.fileName}</p>
              </div>
              <div className={`${style.lowtext} `}>
                <p style={{ color: "grey", fontSize: "0.9em" }}>{lastUploadedPdf.Date}</p>
              </div>
            </div>
          </div>
          <div className={`${style.rightdear}`}>
            <p className={`${style.p4}`} style={{ color: "grey" }}>{lastUploadedPdf.size}</p>
          </div>
        </div> */}



        {Tablename === "Temp" ? (
          <OtherUser USERSDATA={UserData}>
            <RecentUploadFile

              lastUploadedPdffileType={lastUploadedPdf.fileType}
              viewLastUploadedFile={viewLastUploadedFile}
              viewLastUploadedImage={viewLastUploadedImage}
              lastUploadedPdffileName={lastUploadedPdf.fileName}
              lastUploadedPdfDate={lastUploadedPdf.Date}
              lastUploadedPdfsize={lastUploadedPdf.size}

            ></RecentUploadFile>
          </OtherUser>
        ) : (
          <RecentUploadFile

            lastUploadedPdffileType={lastUploadedPdf.fileType}
            viewLastUploadedFile={viewLastUploadedFile}
            viewLastUploadedImage={viewLastUploadedImage}
            lastUploadedPdffileName={lastUploadedPdf.fileName}
            lastUploadedPdfDate={lastUploadedPdf.Date}
            lastUploadedPdfsize={lastUploadedPdf.size}
          />
        )}

        {/* Uploadation Ends ....................................................................................................... */}

      </div>
    </div>

  );
}

export default ClientDashboard;
