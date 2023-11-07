import React, { useEffect, useState } from 'react';
import style from "./GstrFileUpload.module.css";
import upload from '../../../Images/upload.png';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';


const GstrFileUpload = () => {
  const subscription_status=localStorage.getItem('subscription_status');

  const Navigate = useNavigate();
  const clientid = useLocation().state.clientId;
  const year = useLocation().state.Year;
  const gst_title = useLocation().state.Title;



  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');



  const [codeVisible, setCodeVisible] = useState(false);
  const [fileResponse, setFileResponse] = useState(false);
  const [Fileresponsedata, setFileresponsedata] = useState([]);
  const [dbfilename, setDbfilename] = useState([]);
  const [dbfilelength, setDbfilelength] = useState([]);


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

  const currentYear = year.substring(0, 4);

  const mappedMonths = [];

  const months = [
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
  ];

  for (let i = 0; i < 12; i++) {
    const monthName = months[i];
    const year = i < 9 ? currentYear : parseInt(currentYear) + 1; // Fix the typo here
    mappedMonths.push(monthName + " " + year);
    // mappedMonths.push(monthName + year);
  }

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
  // const currentYear = currentDate.getFullYear();

  // Find the index of the current month in the array
  const currentIndex = mappedMonths.findIndex(month => {
    const [monthName, year] = month.split(' ');
    return monthName === new Date().toLocaleString('default', { month: 'long' }) && year == currentYear;
  });

  // if (currentIndex !== -1) {
  // Split the array into two parts and rearrange them
  const beforeCurrentMonth = mappedMonths.slice(0, currentIndex);
  const afterCurrentMonth = mappedMonths.slice(currentIndex);

  // Map the array
  const mappedArray = afterCurrentMonth.concat(beforeCurrentMonth);
  // console.log(mappedArray);
  // } else {
  //   console.log("Current month not found in the array.");
  // }


  // filename gstr ==>


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
      const response = await fetch(`${url_}/Gstgetfile/${user_id}/${clientid}/${year}/${gst_title}`, requestOptions);
      const data = await response.json();
      // console.log(data)
      setDbfilelength(data)
      const extractedNames = data.map(file => {
        const fileid = file.id;
        const filePath = file.filePath;
        // const parts = file.fileName.split(`${user_id}_${clientid}_${year}_`);
        // const extractedName = parts[1].split('.pdf')[0];
        // const fileName = "1_2_GSTR-1_Pavan_Resume_October 2023";

        let splitString = file.fileName.split('_');
        let extractedName = splitString.slice(2).join('_');

        return { fileid, extractedName, filePath };
      });
      setDbfilename(extractedNames);
      // console.log(extractedNames)
    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };


  const filenameStatusArray = [];

  mappedArray.forEach(month => {
    const match = dbfilename.find(item => item.extractedName.includes(month));
    if (match) {
      filenameStatusArray.push({
        month: month,
        status: true,
        fileid: match.fileid,
        filePath: match.filePath,
        filename: match.extractedName
      });
    } else {
      filenameStatusArray.push({
        month: month,
        status: false,
        fileid: null,
        filePath: null,
        filename: null
      });
    }
  });

  // console.log(filenameStatusArray);






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
      const response = await fetch(`${url_}/GST_Statusfilednotfiled/${user_id}/${clientid}/${year.slice(0, 4)}/${gst_title}`, requestOptions);
      const data = await response.json();
      setFileresponsedata(data)



    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };




  const handleToggle = async (month) => {

    if(subscription_status==="grace_period")
    {
      Swal.fire({
        icon:"info",
        text:"Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."})
        
    }

    else if(subscription_status==="not_subscribed")
    {
      Swal.fire({
        icon:"info",
        text:"Subscribe to avail this service."})
        
    }
    else{
    if (fileResponse === true) {
      // console.log("It's TRUE");
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

          fetch(`${url_}/GSTupdateFiledNotFiled/${user_id}/${clientid}/${month}/${year.slice(0, 4)}/${gst_title}`, requestOptions)
            .then(response => console.log(response.status))
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
          window.location.reload();

          // console.log(user_id)
          // console.log(clientid)
          // console.log(month)
          // console.log(year.slice(0, 4))
          // console.log(gst_title)
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
    }}
  };



  /////////////////////////////////////////////////////////////////





  var NEWARRAY = filenameStatusArray.map(fileStatus => {
    const dataItem = Fileresponsedata.find(item => item.month === fileStatus.month);
    if (dataItem) {
      fileStatus.filednotfiled = dataItem.filednotfiled;
    } else {
      fileStatus.filednotfiled = 'no'; // Set default value if no match found
    }
    return fileStatus; // Return the updated fileStatus
  });

  // console.log(NEWARRAY);

  /////////////////////////////////////////////////////////////////////////////////////////////

  function filterArrayBasedOnYear(data, currentYear, fyYear) {
    if (fyYear === currentYear) {
      const startIndex = data.findIndex(item => item.month === `April ${currentYear}`);
      const endIndex = data.findIndex(item => item.month === `October ${currentYear}`);
      return data.slice(startIndex, endIndex + 1).reverse();
    } else {
      return data;
    }
  }

  // Given data


  // Current year and fiscal year
  const currentYearr = `${currentDate.getFullYear()}`;
  const fyYear = `${currentYear}`;


  console.log(currentYearr)
  console.log(fyYear)
  // Call the function with the data, current year, and fiscal year
  const NEWARRAYUpdated = filterArrayBasedOnYear(NEWARRAY, currentYearr, fyYear);
  console.log(NEWARRAYUpdated);


  // ///////////////////////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////////////////

  // File Upload Code
  const checkSubsriptionStatus=(e)=>{
    if(subscription_status==="grace_period")
      {
        Swal.fire({
          icon:"info",
          text:"Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."})
          e.preventDefault();
      }
  
      else if(subscription_status==="not_subscribed")
      {
        Swal.fire({
          icon:"info",
          text:"Subscribe to avail this service."})
          e.preventDefault();
      }
  
  }

  const handleFileUpload = async (event, month) => {
    const file = event.target.files[0];

    if (file) {


      if (file.name.endsWith('.pdf')) {

        FileUpload(file, month);
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

  async function FileUpload(file, month) {

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
      // console.log(user_id)
      // console.log(clientid)
      // console.log(file)
      // console.log(month)
      // console.log(year)
      // console.log(gst_title)

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("userid", user_id);
      formdata.append("clientid", clientid);
      formdata.append("financialYear", year);
      formdata.append("category", gst_title);
      formdata.append("month", month);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      try {
        const response = await fetch(`${url_}/GSTFileUpload`, requestOptions);
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

    if(subscription_status==="grace_period")
    {
      Swal.fire({
        icon:"info",
        text:"Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."})
        
    }

    else if(subscription_status==="not_subscribed")
    {
      Swal.fire({
        icon:"info",
        text:"Subscribe to avail this service."})
        
    }

    else{
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


        const response = await fetch(`${url_}/gstdeletefile`, requestOptions);
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
    try {
      const response = await fetch(`${url_}/openGstfile/${file_ID}`, {
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


  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  return (

    <div className="container">
      <div className="row m-5">


        <div className="w-100" id="maindiv">

          <div className="container">


            <div className="uphead mb-5">
              <div className="row">
                <div className="col">
                  <h1 className='d-flex align-items-center'>
                    <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
                      &#8617;&nbsp;
                    </div>
                    <b>{gst_title}</b>
                  </h1>
                </div>

              </div>
              <h6 className={`${style.headpara}`}>F.Y {year}</h6>
            </div>


            <div className={`${style.neckbar}`}>
              <div className="row d-flex justify-content-between">
                <div className="" id="select">
                  {dbfilelength.length > 0
                    ? <button type="button" className="btn btn-danger" onClick={toggleCodeVisibility}>Select</button>
                    : null}
                  {/* <button type="button" className="btn btn-danger" onClick={toggleCodeVisibility}>Select</button> */}
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="delet">
                  <h2 className="icons">
                    {codeVisible && (
                      <i className="fa-solid fa-trash-can" onClick={DeleteFile}></i>
                    )}
                  </h2>
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="share">
                  <h2 className="icons">
                    {codeVisible && (
                      <i className="fa-solid fa-share-from-square" ></i>
                    )}
                  </h2>
                </div>
                {/* <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="share">
                  <h2 className="icons">
                    {codeVisible && (
                      <i className="fa-solid fa-share-from-square" onClick={DeleteFile}></i>
                    )}
                  </h2>
                </div> */}
              </div>
            </div>


            <div className='container'>
              <div className="">





                {NEWARRAYUpdated.map((item, index) => (
                  <div className='d-flex align-items-center mb-2 w-100' key={index} >


                    <div className={`${style.gstr1_mothn_filename}`}>
                      <h4 className={`${style.filename_text} text-danger`} >{item.month}</h4>
                    </div>

                    <div className={`${style.file_upload}  w-25`}>
                      <div className={style.image_upload_wrap}>
                        <input className={style.file_upload_input} type='file' onChange={(event) => handleFileUpload(event, item.month)} onClick={checkSubsriptionStatus}/>
                        <div className={style.drag_text}>
                          <img src={upload} alt="" />
                          <h4>Upload File</h4>
                        </div>
                      </div>
                    </div>


                    {item.status ? (
                      <div className=' w-25'>

                        <div className={style.file_upload}>
                          {codeVisible && (
                            <label className={style.checkbox_label}>
                              <input
                                type="checkbox"
                                className={style.checkbox}
                                onChange={event => handleCheckboxChange(event, item.fileid)}
                              />
                              <span className={style.checkbox_custom}>
                                <span className={style.checkbox_tick}></span>
                              </span>
                            </label>
                          )}


                          <i className="bi bi-file-earmark-pdf-fill text-danger" onDoubleClick={() => openFileAndDownload('pdf', 'document.pdf', item.fileid)}>

                          </i>


                          <h6 className={style.filename_text} >
                            {item.filename}
                          </h6>
                        </div>
                      </div>
                    ) : (

                      <div className='w-25'></div>


                    )}

                    <div className={`${style.gstr_1_file_toggle}  `} style={{ margin: "auto" }}>
                      <label className={`${style.switch}`}>
                        <input type="checkbox" checked={item.filednotfiled === "yes" ? true : false} onChange={() => handleToggle(item.month)} />
                        <span className={`${style.slider} ${style.round}`}></span>
                      </label>

                    </div>


                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div >

  );
}

export default GstrFileUpload;








///////////////////////////////

