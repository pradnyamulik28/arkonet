import React, { useEffect, useState } from 'react';
import styles from './MyFolder.module.css';
import imgprofile from '../../../Images/profile.png'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';


const MyFolder = () => {
  const Navigate = useNavigate();
  const clientid = useLocation().state.clientId;
  const clientname = useLocation().state.clientname;
  const clientpan = useLocation().state.clientpan;
  const clientCategory = useLocation().state.clientCategory;
  const clientPro = useLocation().state.clientProfession;

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [imgcontent, setImgContent] = useState();
  const [kyclastdate, setkyclastdate] = useState();
  const [doclastdate, setdoclastdate] = useState();
  const [incometaxlastdate, setincometaxlastdate] = useState();
  const [gstlastdate, setgstlastdate] = useState();
  const [incometaxlastestfile, setincometaxlastestfile] = useState();
  const [gstlastestfile, setgstlastestfile] = useState();
  // const GstlatestfileArray = [gstlastestfile]
  useEffect(() => {
    GetClientImage();
    lastupdateddatesClient();
    fetchapi();
  }, []);

  function fetchapi() {
    fetchlatestfile();

  }
  const GetClientImage = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/getclientimage/${clientpan}`, requestOptions)
      .then(response => response.json())
      .then(res => {
        // console.log(res.content);
        setImgContent(res.content)
      })
      .catch(error => console.log('error', error));
  }

  const lastupdateddatesClient = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    await fetch(`${url_}/maxLastUpdateDateforkycdoc/${clientpan}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const date = new Date(result);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        setkyclastdate(formattedDate)
      })
      .catch((error) => {
        console.log(error);
      })


    await fetch(`${url_}/maxLastUpdateDateforDocument/${clientpan}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("doc", result);
        const date = new Date(result.lastUpdateDate1);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        // console.log(result)
        setdoclastdate(formattedDate)
        // const retrivedDate = result.lastUpdateDate1.split("-");
        // lastUpdateCopy["DocsLastUpdate"] = `${numberToMonth(retrivedDate[1])} ${retrivedDate[2]}.${retrivedDate[0]}`;
      })
      .catch((error) => {
        console.log(error);
      })


    await fetch(`${url_}/maxLastUpdateDatefile/${clientid}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const date = new Date(result.lastUpdateDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        // console.log("ggg", result)
        setincometaxlastdate(formattedDate)
      })
      .catch(error => console.log('error', error));

    await fetch(`${url_}/maxLastUpdateDateGSTfile/${clientid}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const date = new Date(result.lastUpdateDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        // console.log(formattedDate)
        setgstlastdate(formattedDate)
      })
      .catch(error => console.log('error', error));

  }


  const fetchlatestfile = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    await fetch(`${url_}/getlastUpdateallGSTonefileinfo/${clientid}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setgstlastestfile(result)
        // console.log(result)


      })
      .catch(error => console.log('error', error));

    await fetch(`${url_}/getlastUpdateallIncome_Taxonefileinfo/${clientid}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setincometaxlastestfile(result)
        console.log(result)

      })
      .catch(error => console.log('error', error));
  }
  //////////////////////////////////////////////////////////////////////////////////////
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const openFileAndDownload = async (contentType, fileName) => {
    try {
      const response = await fetch(`${url_}/getlastUpdateallGSTactualonefile/${clientid}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const arrayBuffer = await response.arrayBuffer();
      const fileBlob = new Blob([arrayBuffer], { type: `application/${contentType}` });
      const blobUrl = URL.createObjectURL(fileBlob);

      if (contentType === 'pdf') {
        setPdfBlobUrl(blobUrl);
        const pdfWindow = window.open(blobUrl, '_blank');
        pdfWindow.addEventListener('beforeunload', () => {
          URL.revokeObjectURL(blobUrl);
        });
      } else if (contentType === 'xlsx') {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error(`Error fetching or downloading ${contentType.toUpperCase()} file:`, error);
    }
  };


  ///////////////////////////////////////////////////
  const GoToincome = () => {
    Navigate('incomefolder', {
      state: {
        clientId: clientid
      },
    })
  }

  const GoToGST = () => {
    Navigate('gstfolder', {
      state: {
        clientId: clientid
      },
    })
  }
  const GoToKYC = () => {
    Navigate('kycfile', {
      state: {
        clientId: clientid,
        ClientPan: clientpan
      },
    })
  }
  const GoToDoc = () => {
    Navigate('docfile', {
      state: {
        clientId: clientid,
        ClientPan: clientpan
      },
    })
  }


  const GoToTallyBackup = () => {
    Navigate('tallyclient', {
      state: {
        clientId: clientid,
        ClientPan: clientpan
      },
    })
  }

  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : imgprofile;

  return (
    <div>
      <div className='container'>
      <div className={`${styles.myfolder_btn} mb-2 mt-3 w-100 text-center`}>
              <span className='font-weight-bold h4'>Client Folders</span>
            </div>
        <div className="row d-flex flex-column justify-content-center">
          <div className={`${styles.profileimg}`}>
            <img src={imageSrc} alt="" className='mt-4 mb-4' />
            <h3>{clientname}</h3>
            <h5>{clientpan}</h5>
            <h6>{clientPro}</h6>
          </div>
          <div className={`${styles.myfolder}`}>            
            <div className={`${styles.myfolder_folder}`}>
              {clientCategory === "Income_Tax" && (
                <div onClick={GoToincome}>
                  <div className={`${styles.folder} text-info`} style={{ backgroundColor: "rgba(0, 255, 255, 0.1)" }}>
                    <div className={`${styles.icons}`}>
                      <span className="mt-2">
                        <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                      </span>
                      <span className="mt-3">
                        <i className="bi bi-three-dots-vertical h4"></i>
                      </span>
                    </div>
                    <h5 className={`ml-2`}>Income Tax</h5>
                    <div className={`${styles.folder_date} ml-2`}>{incometaxlastdate}</div>
                  </div>
                </div>
              )}

              {clientCategory === "GST" && (
                <div onClick={GoToGST}>
                  <div className={`${styles.folder} text-primary`} style={{ backgroundColor: "rgba(0, 55, 255, 0.1)" }}>
                    <div className={`${styles.icons}`}>
                      <span className="mt-2">
                        <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                      </span>
                      <span className="mt-3">
                        <i className="bi bi-three-dots-vertical h4"></i>
                      </span>
                    </div>
                    <h5 className={`ml-2`}>GST</h5>
                    <div className={`${styles.folder_date} ml-2`}>{gstlastdate}</div>
                  </div>
                </div>
              )}

              {clientCategory === "Both" && (
                <>
                  <div onClick={GoToincome}>
                    <div className={`${styles.folder} text-info`} style={{ backgroundColor: "rgba(0, 255, 255, 0.1)" }}>
                      <div className={`${styles.icons}`}>
                        <span className="mt-2">
                          <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                        </span>
                        <span className="mt-3">
                          <i className="bi bi-three-dots-vertical h4"></i>
                        </span>
                      </div>
                      <h5 className={`ml-2`}>Income Tax</h5>
                      <div className={`${styles.folder_date} ml-2`}>{incometaxlastdate}</div>
                    </div>
                  </div>

                  <div onClick={GoToGST}>
                    <div className={`${styles.folder} text-primary`} style={{ backgroundColor: "rgba(0, 55, 255, 0.1)" }}>
                      <div className={`${styles.icons}`}>
                        <span className="mt-2">
                          <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                        </span>
                        <span className="mt-3">
                          <i className="bi bi-three-dots-vertical h4"></i>
                        </span>
                      </div>
                      <h5 className={`ml-2`}>GST</h5>
                      <div className={`${styles.folder_date} ml-2`}>{gstlastdate}</div>
                    </div>
                  </div>
                </>
              )}

              <div onClick={GoToKYC}>
                <div className={`${styles.folder} text-danger`} style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}>
                  <div className={`${styles.icons}`}>
                    <span className="mt-2">
                      <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                    </span>
                    <span className="mt-3">
                      <i className="bi bi-three-dots-vertical h4"></i>
                    </span>
                  </div>
                  <h5 className={`ml-2`}>KYC</h5>
                  <div className={`${styles.folder_date} ml-2`}>{kyclastdate}</div>
                </div>
              </div>

              <div onClick={GoToDoc}>
                <div className={`${styles.folder} text-warning`} style={{ backgroundColor: "rgba(255, 242, 0, 0.2)" }}>
                  <div className={`${styles.icons}`}>
                    <span className="mt-2">
                      <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                    </span>
                    <span className="mt-3">
                      <i className="bi bi-three-dots-vertical h4"></i>
                    </span>
                  </div>
                  <h5 className={`ml-2`}>Docs</h5>
                  <div className={`${styles.folder_date} ml-2`}>{doclastdate}</div>
                </div>
              </div>


              <div onClick={GoToTallyBackup}>
                <div className={`${styles.folder}`} style={{ backgroundColor: "#dff1df",color:"#28a745" }}>
                  <div className={`${styles.icons}`}>
                    <span className="mt-2">
                      <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                    </span>
                    <span className="mt-3">
                      <i className="bi bi-three-dots-vertical h4"></i>
                    </span>
                  </div>
                  <h5 className={`ml-2`}>Tally Backup</h5>
                  <div className={`${styles.folder_date} ml-2`}>{doclastdate}</div>
                </div>
              </div>
            </div>


          </div>
          <div >
            <hr style={{ backgroundColor: "gray", height: "0.50%" }} />



            <div className={`d-flex justify-content-between`}>
              <h4>Recent Uploads</h4>
              <div className={`${styles.micon}`}>
                <h4><i className="fa-solid fa-upload"></i></h4>
              </div>
            </div>


            <div className='row mt-4 ml-5'>

              {/* //////////////////////////////////////////Income files/////////////////////////////////////// */}
              {incometaxlastestfile && (
                <div className={`d-flex col`}>
                  <div className={`${styles.leftdear}`}>
                    <div className={`${styles.licon}`}>
                      <h1>
                        <i className="fa-solid fa-file-pdf" style={{ color: "#ff0000" }} onDoubleClick={() => openFileAndDownload('pdf', 'document.pdf')}></i>
                      </h1>
                    </div>
                    <div className={`${styles.ricon}`}>
                      <div className={`${styles.uptext} `}>
                        <p
                          style={{
                            color: "#",
                            textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)",
                            fontWeight: "bold",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {(incometaxlastestfile.imageName).split('_').slice(2).join('_')}
                        </p>
                      </div>
                      <div className={`${styles.lowtext} `}>
                        <p style={{ color: "grey", fontSize: "0.9em" }}>
                          {new Date(incometaxlastestfile.lastUpdateDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className={`${styles.rightdear}`}>
                    <p className={`${styles.p4}`} style={{ color: "grey" }}>
                      300Kb
                    </p>
                  </div> */}
                </div>
              )}


              {/* //////////////////////////////////////////GST files/////////////////////////////////////// */}
              {gstlastestfile && (
                <div className={`d-flex col`}>
                  <div className={`${styles.leftdear}`}>
                    <div className={`${styles.licon}`}>
                      <h1>
                        <i className="fa-solid fa-file-pdf" style={{ color: "#ff0000" }} onDoubleClick={() => openFileAndDownload('pdf', 'document.pdf')}></i>
                      </h1>
                    </div>
                    <div className={`${styles.ricon}`}>
                      <div className={`${styles.uptext} `}>
                        <p
                          style={{
                            color: "#",
                            textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)",
                            fontWeight: "bold",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {(gstlastestfile.imageName).split('_').slice(2).join('_')}
                        </p>
                      </div>
                      <div className={`${styles.lowtext} `}>
                        <p style={{ color: "grey", fontSize: "0.9em" }}>
                          {new Date(gstlastestfile.lastUpdateDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className={`${styles.rightdear}`}>
                    <p className={`${styles.p4}`} style={{ color: "grey" }}>
                      300Kb
                    </p>
                  </div> */}
                </div>
              )}




              {/* ///////////////////////////////////////////////////////////////////////////////// */}


            </div>





          </div>
        </div>
      </div>
    </div >
  );
}

export default MyFolder;
