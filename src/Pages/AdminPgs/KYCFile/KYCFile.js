// KYC.js
import React, { useState, useRef, useEffect } from 'react';
import style from './KYCFile.module.css';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const KYCFile = () => {
  const Navigate = useNavigate()
  useEffect(() => {
    getKYCDetails();
  }, [])

  const storedToken = window.localStorage.getItem("jwtToken");
  const client_pan = useLocation().state.ClientPan;



  const fileInputRef = useRef(null);
  const [KYCFiles, setKYCFiles] = useState([{
    name: "Aadhar Card",
    id: "aadhar_card",
    fileType: "",
    selectedFile: null,
    isExist: false,
    imgsrc: null,
    fileRef: useRef(null),
    uploadStatus: false
  },
  {
    name: "PAN Card",
    id: "pan_card",
    fileType: "",
    selectedFile: null,
    isExist: false,
    imgsrc: null,
    fileRef: useRef(null),
    uploadStatus: false
  },
  {
    name: "Bank Cheque",
    id: "bank_cheque",
    fileType: "",
    selectedFile: null,
    isExist: false,
    imgsrc: null,
    fileRef: useRef(null),
    uploadStatus: false
  }]);



  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const openFileAndDownload = async (fileid) => {
    let fetchUrl = ""
    switch (fileid) {
      case "aadhar_card":
        fetchUrl = `getclientkycadhar`;
        break;

      case "pan_card":
        fetchUrl = `getclientkycapan`;
        break;

      case "bank_cheque":
        fetchUrl = `getclientkyccheck`;

        break;

      default:
        break;

    }
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch(`${url_}/${fetchUrl}/${client_pan}`, requestOptions)
        .then((response) => response.arrayBuffer())
        .then((result) => {
          const fileBlob = new Blob([result], {
            type: `application/pdf`,
          });

          const blobUrl = URL.createObjectURL(fileBlob);
          console.log(blobUrl)

          setPdfBlobUrl(blobUrl);
          const pdfWindow = window.open(blobUrl, "_blank");
          pdfWindow.addEventListener("beforeunload", () => {
            URL.revokeObjectURL(blobUrl);
          });

        }).catch(error => console.log('error', error));
    } catch (error) {
      console.error(
        `Error fetching or downloading ${"pdf".toUpperCase()} file:`,
        error
      );
    }
  };



  async function getImageData(fetchURL, index) {


    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };


      fetch(`${url_}/${fetchURL}/${client_pan}`, requestOptions)
        .then((response) => response.arrayBuffer())
        .then((result) => {
          const fileBlob = new Blob([result], {
            type: `image/*`,
          });
          const blobToDataURL = (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const updatedItems = [...KYCFiles];
              updatedItems[index].imgsrc = reader.result;
              updatedItems[index].isExist = true
              setKYCFiles(updatedItems);
            };
            reader.readAsDataURL(blob);
          };
          blobToDataURL(fileBlob);

        }).catch((error) => console.log(error));
    } catch (error) {
      console.error(
        `Error fetching or downloading ${"pdf".toUpperCase()} file:`,
        error
      );
    }
  }

  // function handleSelectFile(e) {
  //   const fileid = e.currentTarget.id;
  //   const index = KYCFiles.findIndex((item) => item.id === fileid);
  //   if (index !== -1) {
  //     KYCFiles[index].fileRef.current.click();
  //   }

  // }




  async function getKYCDetails() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const updatedItems = [...KYCFiles];

    fetch(`${url_}/getclientKycinformation/${client_pan}`, requestOptions)
      .then(response => response.json())
      .then(result => {//console.log(result)   

        if (result.imageName) {
          const index = updatedItems.findIndex((item) => item.id === result.imageName.split(".")[0]);
          if (index !== -1) {
            if (result.imageName.includes("pdf")) {
              updatedItems[index].fileType = "pdf";
              updatedItems[index].isExist = true;
            }
            else {
              updatedItems[index].fileType = "image";
              getImageData("getclientkycadhar", index);
            }
          }
        }



        if (result.imageName2) {
          const index = updatedItems.findIndex((item) => item.id === result.imageName2.split(".")[0]);
          if (index !== -1) {
            if (result.imageName2.includes("pdf")) {
              updatedItems[index].fileType = "pdf";
              updatedItems[index].isExist = true;
            }
            else {
              updatedItems[index].fileType = "image";
              getImageData("getclientkycapan", index);
            }
          }
        }


        if (result.imageName3) {
          const index = updatedItems.findIndex((item) => item.id === result.imageName3.split(".")[0]);
          if (index !== -1) {
            if (result.imageName3.includes("pdf")) {
              updatedItems[index].fileType = "pdf";
              updatedItems[index].isExist = true;
            }
            else {
              updatedItems[index].fileType = "image";
              getImageData("getclientkyccheck", index);
            }
          }
          console.log(updatedItems)
        }

      }).catch(error => console.log('error', error));

    setKYCFiles(updatedItems);
  }


  //console.log(KYCFiles)

  return (
    <div >

      <div className={`${style.header} d-flex mt-5`} >
        <div className={`${style.leftear}`} >
          <Link className={`${style.ancher}`}
            onClick={(e) => {
              e.preventDefault();
              Navigate(-1);
            }}><h3>
              <i class="fa-solid fa-angle-left"></i></h3></Link>
        </div>
        <div className={`${style.eyes} ml-5`} ><h2>KYC Files</h2></div>
        <div className={`${style.rightear}`} ><h3>&nbsp;</h3></div>
      </div>
      <div className='ml-5'>

        {KYCFiles.map((item) => {
          return (
            <div className={`${style.mainport} mt-5`} >
              <h4 className={`${style.h4}`} >{item.name}</h4>
              {(!item.selectedFile && !item.isExist) &&
                <div className={`${style.psudoslot}`} id={item.id}>
                  <input className={`${style.input}`} type="file" id={item.id}
                    style={{ "display": "none" }} />


                  <label htmlFor="fileinput">
                    <div className={`${style.pusdouploadport}`} >
                      <div className={`${style.logo}`} >
                        <small className={`${style.h1}`} >No file uploaded....</small>
                      </div>
                    </div>
                  </label>
                </div>}


              {(item.selectedFile || item.isExist) &&
                <div className={`${style.slot}`} >
                  <div className={`${style.uploadport}`} >
                    <div className={`${style.logo}`} >
                      {((item.isExist && item.fileType === "pdf") || (item.selectedFile && item.selectedFile.name.endsWith(".pdf"))) ? (
                        <>
                          <i
                            className="bi bi-file-earmark-pdf-fill text-danger"
                            style={{ "font-size": "4rem" }}
                            onClick={(e) => {
                              e.preventDefault();
                              openFileAndDownload(item.id);
                            }}
                          ></i>
                        </>
                      ) : (
                        <img
                          id="file-image"
                          src={item.imgsrc}
                          alt="Preview"
                          className={`${style.img}`}
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>}
            </div>)
        })}

      </div>

    </div>
  );
}

export default KYCFile;
