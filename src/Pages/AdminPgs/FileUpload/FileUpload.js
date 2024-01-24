import React, { useEffect, useState } from 'react';
import style from "./FileUpload.module.css";
import upload from './upload.png';
import Swal from 'sweetalert2';
import { url_ } from '../../../Config';
import { useLocation } from 'react-router-dom';


const FileUpload = () => {

  const subscription_status = localStorage.getItem('subscription_status');


  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const clientid = useLocation().state.ClientID;
  const year = useLocation().state.Year;

  const [codeVisible, setCodeVisible] = useState(false);
  const [fileResponse, setFileResponse] = useState(false);
  const [dbfilename, setDbfilename] = useState([]);
  const [dbfilelength, setDbfilelength] = useState([]);
  const originalfilename = [
    "Acknowledgement",
    "Statement_of_Total_Income",
    "Balance_Sheet",
    "Profit_and_Loss",
    "26AS",
    "Tax_Challan",
    "Excel",
    "Others"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await getFile();
      await GetFileResponse();


    } catch (error) {
      console.error('An error occurred:', error);
    }
  };




  ////////////////////////////////////////////////////////////////////////////////////////////////

  //  Fetch file Code


  const getFile = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/getfile/${user_id}/${clientid}/${year}`, requestOptions);
      const data = await response.json();
      // console.log(data)
      setDbfilelength(data.length)
      const extractedNames = data.map(file => {
        const fileid = file.id;
        const filePath = file.filePath;
        const parts = file.fileName.split(`${user_id}_${clientid}_${year}_`);
        const extractedName = parts[1].split('.pdf')[0];
        return { fileid, extractedName, filePath };
      });
      setDbfilename(extractedNames);
      // console.log(extractedNames)

    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };


  const filenameStatusArray = originalfilename.map(filename => {
    const matchingFile = dbfilename.find(file => {
      return file.extractedName === filename || file.fileid.toString() === filename;
    });

    if (matchingFile) {
      return { filename, status: true, fileId: matchingFile.fileid, filePath: matchingFile.filePath };
    } else {
      return { filename, status: false };
    }
  });




  // console.log(filenameStatusArray)





  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Toggle Switch Code


  const GetFileResponse = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/getfilednotfiled/${user_id}/${clientid}/${year}`, requestOptions);
      const data = await response.json();
      if (data[0].filednotfiled === "no") {
        setFileResponse(false)
        console.log(data[0].filednotfiled)
      } else {
        setFileResponse(true)
      }

    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };

  const handleToggle = async () => {


    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }



    else {
      if (fileResponse === true) {
        console.log("It's TRUE");
      } else {
        try {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm!'
          });

          if (result.isConfirmed) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${storedToken}`);

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              redirect: 'follow'
            };

            fetch(`${url_}/updateFiledNotFiled/${user_id}/${clientid}/${year}`, requestOptions)
              .then(response => console.log(response.status))
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
            window.location.reload();
          } else {
            console.log("Canceled the toggle!");
          }
        } catch (error) {
          console.log("Failed to call function!!!");

          console.log('Error:', error);
          if (error.response) {
            console.log('Response Status:', error.response.status);
            console.log('Response Data:', error.response.text());
          }
        }
      }

    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////

  // File Upload Code
  const checkSubsriptionStatus = (e) => {
    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })
      e.preventDefault();
    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })
      e.preventDefault();
    }

  }

  const handleFileUpload = async (event, filename) => {
    const file = event.target.files[0];

    if (file) {
      if (filename.toLowerCase().includes('excel')) {
        if (file.name.endsWith('.xlsx')) {

          FileUpload(file, filename);
        } else {
          Swal.fire(
            'Invalid File Type!',
            "Please select a valid file type (XLSX).",
            "error"
          );
        }
      } else if (file.name.endsWith('.pdf')) {

        FileUpload(file, filename);
      } else {
        Swal.fire(
          'Invalid File Type!',
          "Please select a valid file type (PDF).",
          "error"
        );
      }
    } else {
      console.log("No file selected");
    }
  };

  async function FileUpload(file, filename) {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm!'
    });

    if (result.isConfirmed) {
      console.log("file", file);
      console.log("userid", user_id);
      console.log("clientid", clientid);
      console.log("accountyear", year);
      console.log("filename", filename);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("userid", user_id);
      formdata.append("clientid", clientid);
      formdata.append("accountyear", year);
      formdata.append("filename", filename);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      try {
        const response = await fetch(`${url_}/upload`, requestOptions);
        const responseData = await response.text();
        console.log(responseData)
        if (response.status === 200) {
          await Swal.fire(
            'Success.',
            `${responseData}`,
            'success'
          )
          window.location.reload();

        } else {
          Swal.fire(
            'Failed!',
            `${responseData}`,
            'error'
          )
        }
      } catch (error) {
        console.log('Error:', error);
        if (error.response) {
          console.log('Response Status:', error.response.status);
          console.log('Response Data:', await error.response.text());
        }
      }
    } else {
      console.log("Upload is canceled.");
      window.location.reload();
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Select button code

  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible);
  };


  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCheckboxChange = (event, fileId) => {
    if (event.target.checked) {
      setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, fileId]);
    } else {
      setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(id => id !== fileId));
    }
  };



  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Delete file Code

  const DeleteFile = async () => {

    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }

    else {

      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, confirm!'
        });

        if (result.isConfirmed) {

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${storedToken}`);

          var raw = JSON.stringify({
            "fileIds": selectedFiles
          });

          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };


          const response = await fetch(`${url_}/deletefile`, requestOptions);
          const responseData = await response.text();
          console.log(responseData)
          if (response.status === 200) {
            await Swal.fire(
              'Success.',
              `${responseData}`,
              'success'
            )
            window.location.reload();

          } else {
            Swal.fire(
              'Failed!',
              `${responseData}`,
              'error'
            )
          }

          console.log(selectedFiles)


        } else {
          console.log("Canceled the delete!");
        }
      } catch (error) {
        console.log("Failed to call function!!!");

        console.log('Error:', error);
        if (error.response) {
          console.log('Response Status:', error.response.status);
          console.log('Response Data:', error.response.text());
        }
      }

    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////



  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const openFileAndDownload = async (contentType, fileName, file_ID) => {

    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }
    else {
      try {
        const response = await fetch(`${url_}/openfile/${file_ID}`, {
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


    }
  };
  // console.log(clientid)
  // console.log(year)


  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  return (
<>
    <div className="container mt-4">
      {/* <div className="row m-3"> */}
        <div className="row m-3" style={{"minWidth":"300px"}} id="maindiv">
          {/* <div className="container"> */}
            {/* <div className="uphead"> */}
              {/* <div className="row"> */}
                <div className="col-9 col-xl-6 col-lg-6">
                  <h3 className={`d-flex align-items-center ${style.h1}`}>
                    <div style={{ fontSize: "xx-large", cursor: "pointer" }} onClick={GoBack}>
                      &#8617;&nbsp;
                    </div>
                    <b>Income Tax</b>
                  </h3>
                  <p className={`h6 ${style.headpara}`}>A.Y {year}</p>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <label className={`${style.switch}`}>
                    <input type="checkbox" checked={fileResponse} onChange={handleToggle} />
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>
                </div>
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
        </div>
        
      {/* </div> */}
      <div className={`${style.neckbar}`}>
              <div className="d-flex">
                <div className="col-4 col-sm-4 col-md-6 col-lg-9 col-xl-9" id="select">
                  {dbfilelength > 0
                    ? <button type="button" className="btn btn-danger" onClick={toggleCodeVisibility}>Select</button>
                    : null}
                  {/* <button type="button" className="btn btn-danger" onClick={toggleCodeVisibility}>Select</button> */}
                </div>
                <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center" id="delet">
                  <h2 className="icons">
                    {codeVisible && (
                      <i className="fa-solid fa-trash-can" onClick={DeleteFile}></i>
                    )}
                  </h2>
                </div>
                <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center" id="share">
                  <h2 className="icons">
                    {codeVisible && (
                      <i className="fa-solid fa-share-from-square" ></i>
                    )}
                  </h2>
                </div>
              </div>
            </div>
    </div >
    
    <div className='row m-4 justify-content-center'>
              {/* <div className="row m-4"> */}
                {filenameStatusArray.map(item => (
                  <div className={`col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6`} key={item.fileId}>
                    {item.status ? (
                      <div>
                        <div className={style.file_upload}>
                          {codeVisible && (
                            <label className={style.checkbox_label}>
                              <input
                                type="checkbox"
                                className={style.checkbox}
                                onChange={event => handleCheckboxChange(event, item.fileId)}
                              />
                              <span className={style.checkbox_custom}>
                                <span className={style.checkbox_tick}></span>
                              </span>
                            </label>
                          )}

                          {item.filename.toLowerCase().includes('excel') ? (
                            <i className="bi bi-file-earmark-excel-fill text-success" onDoubleClick={(e) => { e.preventDefault(); openFileAndDownload('xlsx', 'spreadsheet.xlsx', item.fileId) }}></i>
                          ) : (
                            <i className="bi bi-file-earmark-pdf-fill text-danger" onDoubleClick={(e) => { e.preventDefault(); openFileAndDownload('pdf', 'document.pdf', item.fileId) }}></i>
                          )}

                          <h6 className={style.filename_text} >
                            {item.filename}
                          </h6>
                        </div>
                      </div>


                    ) : (
                      <div className={style.file_upload}>
                        <div className={style.image_upload_wrap}>
                          <input className={style.file_upload_input} type='file' onChange={(event) => handleFileUpload(event, item.filename)} onClick={checkSubsriptionStatus} />
                          <div className={style.drag_text}>
                            <img src={upload} alt="" />
                            <h4>Upload File</h4>
                          </div>
                        </div>
                        <h6 className={style.filename_text} key={item.filename}>{item.filename}</h6>
                      </div>
                    )}
                  </div>
                ))}

              {/* </div> */}
            </div>
</>
  );
}

export default FileUpload;








///////////////////////////////

