import React, { useEffect, useState } from "react";
import style from "./ClientFileView.module.css";
import { url_ } from "../../../Config";
import { Link, useLocation,useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const ClientFileView = () => {
  const navigate = useNavigate();
  //const  id  = useLocation().state.clientid;
  const client_id = window.localStorage.getItem("client_id");
  const user_id = window.localStorage.getItem("userid");
  const storedToken = window.localStorage.getItem("jwtToken");
  const year = useLocation().state.year;
  //console.log(year,client_id)

  const [codeVisible, setCodeVisible] = useState(false);
  const [fileResponse, setFileResponse] = useState(false);
  const [dbfilename, setDbfilename] = useState([]);
  const originalfilename = [
    "Acknowledgement",
    "Statement_of_Total_Income",
    "Balance_Sheet",
    "Profit_and_Loss",
    "26AS",
    "Tax_Challan",
    "Excel",
    "Others",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await getFile();
      // await GetFileResponse();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //  Fetch file Code

  const getFile = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      clientid: client_id,
      accountyear: year,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url_}/client/files`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const extractedNames = data.map((file) => {
          const fileid = file.id;
          const filePath = file.filePath;
          const parts = file.fileName.split(`${user_id}_${client_id}_${year}_`);
          const extractedName = parts[1].split(".pdf")[0];
          return { fileid, extractedName, filePath };
        });
        setDbfilename(extractedNames);
      })
      .catch((error) => console.log("error", error));
  };

  const filenameStatusArray = originalfilename.map((filename) => {
    const matchingFile = dbfilename.find((file) => {
      return (
        file.extractedName === filename || file.fileid.toString() === filename
      );
    });

    if (matchingFile) {
      //console.log("filename",filename)
      return {
        filename,
        status: true,
        fileId: matchingFile.fileid,
        filePath: matchingFile.filePath,
      };
    } else {
      return { filename, status: false };
    }
  });

  const filesAvailable = filenameStatusArray.filter(
    (files) => files.status && !files.filename.toLowerCase().includes("excel")
  ).length;

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Select button code

  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCheckboxChange = (event, filedetail) => {
    
    if (
      selectedFiles.some(
        (item) =>
          item.fileId === filedetail.fileId &&
          item.filename === filedetail.filename
      )
    ) {
      setSelectedFiles(
        selectedFiles.filter(
          (item) =>
            item.fileId !== filedetail.fileId &&
            item.filename !== filedetail.filename
        )
      );
    } else {
      setSelectedFiles([...selectedFiles, filedetail]);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
 



  //===========  Files Share Functionality =======================
  const shareFile = async () => {
    const pdfArray = [];
    //Dowload all files in an array
    selectedFiles.map((item, index, Array) => {

      //console.log(index,item,Array.length)
      fetch(`${url_}/openfile/${item.fileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.blob())
        .then((pdfBlob) => {
          pdfArray.push(
            new File([pdfBlob], `${item.filename}.pdf`, {
              type: "application/pdf",
            })
          );
          if (index === Array.length - 1) {
            console.log("last item : ",pdfArray)
            //---Share Files-----
            if (navigator.share) {
              // Check if the Web Share API is available in the browser

              // Create a shareable data object
              const shareData = {
                title: "Share PDF Document",
                text: "Check out this PDF document!",
                files: [...pdfArray], // Array of files to share
              };

              // Use the Web Share API to share the PDF
              navigator
                .share(shareData)
                .then(() => {
                  console.log("PDF shared successfully");
                  pdfArray.length = 0;
                })
                .catch((error) => console.error("Error sharing PDF:", error));
            } else {
              // Web Share API is not supported in this browser
              swal.fire("", "This funcationality is not supported on this device", "error");
              //console.error("Web Share API is not available in this browser");
            }
          }
        })
        .catch((error) => console.error("Error fetching PDF:", error));
    });
  };



  const openFileAndDownload = async (contentType, fileName, file_ID) => {
    try {
      const response = await fetch(`${url_}/openfile/${file_ID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const arrayBuffer = await response.arrayBuffer();
      const fileBlob = new Blob([arrayBuffer], {
        type: `application/${contentType}`,
      });
      const blobUrl = URL.createObjectURL(fileBlob);
      console.log(blobUrl)
      if (contentType === "pdf") {
        setPdfBlobUrl(blobUrl);
        const pdfWindow = window.open(blobUrl, "_blank");
        pdfWindow.addEventListener("beforeunload", () => {
          URL.revokeObjectURL(blobUrl);
        });
      } else if (contentType === "xlsx") {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error(
        `Error fetching or downloading ${contentType.toUpperCase()} file:`,
        error
      );
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={`${style.outercontainer}`}>
      <div className={`container mt-3 ${style.maincontainer}`}>
        <div className="row">
          <div
            className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            id="maindiv"
          >
            <div className="container">
              <div className="uphead">
                <div className="row">
                  <div className="col">
                    <h1>
                      <b
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(-1);
                        }}
                      >
                        &#8617;&nbsp; Income Tax                        
                      </b>
                    </h1>
                  </div>
                  
                </div>
                <h6 className={`${style.headpara}`}>A.Y {year}</h6>
              </div>

              <div className={`${style.neckbar}`}>
                {filesAvailable > 0 && (
                  <div
                    className={`d-flex justify-content-center flex-wrap ${style.btndiv}`}
                  >
                    <button
                      type="button"
                      className={`btn btn-danger ${style.btns}`}
                      onClick={toggleCodeVisibility}
                    >
                      Select
                    </button>
                    <div onClick={shareFile}>
                    <h2>
                      {codeVisible && (
                        <i className="fa-solid fa-share-from-square" ></i>
                      )}
                    </h2>
                    </div>
                  </div>
                )}
              </div>
              <div className="container">
                <div className="row mt-3">
                  {filenameStatusArray.map((item) => (
                    <>
                      {item.status && !item.filename.toLowerCase().includes("excel") && (
                        <div
                          className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.smallcol}`}
                          key={item.fileId}
                        >
                          <div className={style.file_upload}>
                            {codeVisible && (
                              <label className={style.checkbox_label}>
                                <input
                                  type="checkbox"
                                  className={style.checkbox}
                                  onChange={(event) =>
                                    handleCheckboxChange(event, {fileId:item.fileId,filename:item.filename})
                                  }
                                />
                                <span className={style.checkbox_custom}>
                                  <span className={style.checkbox_tick}></span>
                                </span>
                              </label>
                            )}

                            {!item.filename.toLowerCase().includes("excel")  && (
                              <i
                                className="bi bi-file-earmark-pdf-fill text-danger"
                                onClick={(e) =>
                                 { e.preventDefault()
                                  openFileAndDownload(
                                    "pdf",
                                    "document.pdf",
                                    item.fileId
                                  )}
                                }
                              ></i>
                            )}
                            <h6 className={style.filename_text} onClick={() =>
                                  openFileAndDownload(
                                    "pdf",
                                    "document.pdf",
                                    item.fileId
                                  )
                                }>
                              {item.filename}
                            </h6>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
                {filesAvailable === 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Sorry..!!</h5>
                      <p className="card-text">No File Available to display</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(-1, {
                            state: { clientid: client_id, year: year },
                          });
                        }}
                        className={`btn btn-danger ${style.btns}`}
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFileView;
