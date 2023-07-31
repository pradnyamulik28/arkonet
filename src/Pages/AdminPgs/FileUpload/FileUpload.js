import React, { useState } from 'react';
import style from "./FileUpload.module.css";
import upload from './upload.png';
import Swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { url_ } from '../../../Config';
import axios from 'axios';

const FileUpload = () => {

  const { id } = useParams();
  const { year } = useParams();
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const [selectedFile, setSelectedFile] = useState(null);
  const [ShowPopup, setShowPopup] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    if (file == null) {
      console.log("FILE is not uploaded.")
    } else {
      console.log(" File is uploaded", file.name)
      setShowPopup(true);
      handleFileUpload(file);
    }
    console.log(typeof (file), file)
  };

  const handleFileUpload = (file) => {
    console.log(ShowPopup);

    if (ShowPopup === true) {
      Swal({
        title: 'Upload file?',
        text: 'Are you sure you want to upload the selected file?',
        icon: 'warning',
        buttons: ['Cancel', 'Upload'],
        dangerMode: true,
      }).then((willUpload) => {
        if (willUpload) {


          const url = `${url_}/upload`;
          const formData = new FormData();
          formData.append('clientid', id);
          formData.append('userid', user_id);
          formData.append('accountyear', year);
          formData.append('file', file);

          axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${storedToken}`
            },
          }).then((response) => {


            // console.log(JSON.stringify(response.data));

            console.log('File uploaded successfully:', response.data);
          }).catch((error) => {

            console.error('Error uploading file:', error);
          });

        } else {
          Swal('Upload canceled!', '', 'error');
        }
      });

    } else {

      console.log('No file selected.');
    }
  };

















  return (

    <div className={`${style.container}`}>
      <div className="row">


        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9" id="maindiv">

          <div className="container">


            <div className="uphead">
              <div className="row">
                <div className="col">
                  <h1><b>Income Tax</b></h1>
                </div>
                <div className="col">

                  <label className={`${style.switch}`}>
                    <input type='checkbox' />
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>

                </div>
              </div>
              <h6 className={`${style.headpara}`}>A.Y {year}</h6>
            </div>


            <div className={`${style.neckbar}`}>
              <div className="row">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id="select">
                  <button type="button" className="btn btn-danger" >Select</button>
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="delet">
                  <h2 className="icons"><i className="fa-solid fa-trash-can"></i></h2>
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="share">
                  <h2 className="icons"><i className="fa-solid fa-share-from-square"></i></h2>
                </div>
              </div>
            </div>

            <div className="maindocuments">
              <div className="row">

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb1}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="akn" />
                      <label htmlFor="akn"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Acknowledgement</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb2}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="inc" />
                      <label htmlFor="inc"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Statement of Total Income</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb3}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="bs" />
                      <label htmlFor="bs"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Balannce Sheet</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb4}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="pl" />
                      <label htmlFor="pl"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Profit & Loss</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb5}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="26AS" />
                      <label htmlFor="26AS"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>26AS</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb6}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="tax" />
                      <label htmlFor="tax"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Tax Challan</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb7}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="od" />
                      <label htmlFor="od"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Other Document</p>
                  </div>
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className={`${style.filebox}`} id={`${style.fb8}`}>
                    <div className={`${style.uploadsymbol}`}>
                      <input type="file" onChange={handleFileChange} id="xlsheet" />
                      <label htmlFor="xlsheet"><img src={upload} alt="" /><h6>Upload File</h6></label>
                    </div>
                    <p>Esxcel Sheet</p>
                  </div>
                  <div className={`${style.uploadsymbol}`}>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
