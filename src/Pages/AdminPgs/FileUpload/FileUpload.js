import React, { useEffect, useState } from 'react';
import style from "./FileUpload.module.css";
import upload from './upload.png';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { url_ } from '../../../Config';


const FileUpload = () => {



  const { id } = useParams();
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const { year } = useParams();



  const [dbfilename, setDbfilename] = useState([]);
  const originalfilename = [
    "Acknowledgement",
    "Statement of Total Income",
    "Balance Sheet",
    "Profit and Loss",
    "26AS",
    "Tax Challan",
    "1",
    "2"
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    GetFile();
    SendCountData();
  }, []);

  const filenameStatusArray = originalfilename.map(filename => ({
    filename: filename,
    status: dbfilename.includes(filename)
  }));


  const GetFile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/getfile/${user_id}/${id}/${year}`, requestOptions)
      .then(response => response.json())
      .then(data => {

        const extractedNames = data.map(file => {
          const parts = file.fileName.split('1_1_2022-2023_');
          const extractedName = parts[1].split('.pdf')[0];
          return extractedName;
        });
        setDbfilename(extractedNames)


      })
      .catch(error => console.log('error', error));
  }

  const SendCountData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      "userid": `${user_id}`,
      "clientid": `${id}`,
      "accountyear": `${year}`,
      "filednotfiled": "No"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${url_}/saveData`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  const UpdateFileData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/updateFiledNotFiled?userid=${user_id}&clientid=${id}&accountyear=${year}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleFileUpload = (event, filename) => {
    const file = event.target.files[0];

    if (file) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm!'
      }).then((result) => {
        if (result.isConfirmed) {

          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${storedToken}`);

          var formdata = new FormData();
          formdata.append("file", file);
          formdata.append("userid", user_id);
          formdata.append("clientid", id);
          formdata.append("accountyear", year);
          formdata.append("filename", filename);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          fetch(`${url_}/upload`, requestOptions)
            .then(response => {
              response.text();
              console.log(file)
              console.log(filename)
              window.location.reload();
            })
            .then(result => {
              console.log(result)

            })
            .catch(error => console.log('error', error));


        } else {
          console.log("Uploade is canceled.")
        }
      });
    } else {
      console.log("No file selected")
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
                    <input type='checkbox' onClick={UpdateFileData} />
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
            <div className='container'>
              <div className="row m-4">



                {filenameStatusArray.map(item => (
                  <div className='col-6'>
                    {item.status ? (
                      <div className={style.file_upload}>
                        <i className="bi bi-file-earmark-pdf-fill"></i>
                        <h6 className={style.filename_text} key={item.filename}>{item.filename}</h6>
                      </div>
                    ) : (
                      <div className={style.file_upload}>
                        <div className={style.image_upload_wrap}>
                          <input className={style.file_upload_input} type='file' onChange={(event) => handleFileUpload(event, item.filename)} />
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

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;

