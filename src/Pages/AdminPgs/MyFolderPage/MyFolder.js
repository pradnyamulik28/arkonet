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

  useEffect(() => {
    GetClientImage();
  }, []);

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
        console.log(res.content);
        setImgContent(res.content)
      })
      .catch(error => console.log('error', error));
  }




  const GoTo = () => {
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

  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : imgprofile;

  return (
    <div>
      <div className='container'>
        <div className="row d-flex flex-column justify-content-center">
          <div className={`${styles.profileimg}`}>
            <img src={imageSrc} alt="" className='mt-4 mb-4' />
            <h3>{clientname}</h3>
            <h5>{clientpan}</h5>
            <h6>{clientPro}</h6>
          </div>
          <div className={`${styles.myfolder}`}>
            <div className={`${styles.myfolder_btn} mb-4 mt-5`}>
              <span className='font-weight-bold '>My Folders</span>
            </div>

            <div className={`${styles.myfolder_folder}`}>
              {clientCategory === "Income_Tax" && (
                <div onClick={GoTo}>
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
                    <div className={`${styles.folder_date} ml-2`}>November 10, 2020</div>
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
                    <div className={`${styles.folder_date} ml-2`}>November 10, 2020</div>
                  </div>
                </div>
              )}

              {clientCategory === "Both" && (
                <>
                  <div onClick={GoTo}>
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
                      <div className={`${styles.folder_date} ml-2`}>November 10, 2020</div>
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
                      <div className={`${styles.folder_date} ml-2`}>November 10, 2020</div>
                    </div>
                  </div>
                </>
              )}

              <Link to="#">
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
                  <div className={`${styles.folder_date} ml-2`}>November 10, 2020</div>
                </div>
              </Link>

              <Link to="#">
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
                  <div className={`${styles.folder_date} ml-2`}>November 10, 2020</div>
                </div>
              </Link>
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


              <div className={`d-flex col  `} >
                <div className={`${styles.leftdear}`}>
                  <div className={`${styles.licon}`}>
                    <h1><i className="fa-solid fa-file-pdf" style={{ color: "#ff0000" }}></i></h1>
                  </div>
                  <div className={`${styles.ricon}`}>
                    <div className={`${styles.uptext} `}>
                      <p style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)", fontWeight: "bold", marginBottom: "0.4rem" }}>Intimation u/s 139(9)</p>
                    </div>
                    <div className={`${styles.lowtext} `}>
                      <p style={{ color: "grey", fontSize: "0.9em" }}>November 22.2020</p>
                    </div>
                  </div>
                </div>
                <div className={`${styles.rightdear}`}>
                  <p className={`${styles.p4}`} style={{ color: "grey" }}>300Kb</p>
                </div>
              </div>



              <div className={`d-flex col`}>
                <div className={`${styles.leftdear}`}>
                  <div className={`${styles.licon}`}>
                    <h1><i className="fa-solid fa-file-pdf" style={{ color: "#ff0000" }}></i></h1>
                  </div>
                  <div className={`${styles.ricon}`}>
                    <div className={`${styles.uptext} `}>
                      <p style={{ color: "#", textShadow: "1px 4px 4px rgba(0, 0, 0, 0.24)", fontWeight: "bold", marginBottom: "0.4rem" }}>Intimation u/s 139(9)</p>
                    </div>
                    <div className={`${styles.lowtext} `}>
                      <p style={{ color: "grey", fontSize: "0.9em" }}>November 22.2020</p>
                    </div>
                  </div>
                </div>
                <div className={`${styles.rightdear}`}>
                  <p className={`${styles.p4}`} style={{ color: "grey" }}>300Kb</p>
                </div>
              </div>




            </div>





          </div>
        </div>
      </div>
    </div >
  );
}

export default MyFolder;
