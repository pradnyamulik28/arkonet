import React, { useEffect, useState } from "react";
import style from "./ClientFileView.module.css";
import { url_ } from "../../../Config";
import { Link, useLocation,useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const ClientFileView = () => {
  const navigate = useNavigate();
  const client_id = window.localStorage.getItem("client_id_it");
  const user_id = window.localStorage.getItem("user_id_it");
  const storedToken = window.localStorage.getItem("jwtToken");
  const year = useLocation().state.year;
  const AY=useLocation().state.AY;
  

  const [codeVisible, setCodeVisible] = useState(false);
  const [fileBlob, setFileBlob] = useState(null);



  useEffect(() => {
    fetchData();    
  }, []);

  const fetchData = async () => {
    try {
      await getFile();    
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //  Fetch file Code

  const getFile = async () => {
    // console.log(client_id,AY)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      clientid: client_id,
      accountyear: AY,
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
        // console.log(data)
        const filterPdfFiles = data.filter((file) => {
          if(!file.filePath.includes(".xlsx"||"excel"||"Excel"||".xls")) return true
          else return false
        });
        const extractedNames = filterPdfFiles.map((file) => {
          const fileid = file.id;
          const filePath = file.filePath;
          const parts = file.fileName.split(`${user_id}_${client_id}_${AY}_`);
          const extractedName = !filePath.includes(".xlsx"||"excel"||"Excel"||".xls")  &&  parts[1].split(".pdf")[0];
          const isSelected=false;
          return { fileid, extractedName, filePath, isSelected };          
        });
        


        const pdfArray=[]
        extractedNames.map((file)=>{
      
       fetch(`${url_}/openfile/${file.fileid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.blob())
        .then((pdfBlob) => {
          pdfArray.push(
            new File([pdfBlob], `${file.extractedName}.pdf`, {
              type: "application/pdf",
            })
          );
        })
        .catch((error) => console.error("Error fetching PDF:", error));
    })
    if(extractedNames.length>0){
      setFileBlob({extractedNames,pdfArray});
    }   
      })
      .catch((error) => console.log("error", error));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Select button code

  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const selecAllFiles=()=>{   
  const newData = { ...fileBlob };
  newData.extractedNames.map((item,index)=>{newData.extractedNames[index].isSelected = true;}) 
  // console.log(newData);
  setFileBlob(newData);
  }
 
  const handleCheckboxChange = (event, filedetail) => {
   

//================CODE To Update Selected File Status in fileBlob Array=================



  // Create a copy of the original data object
  const newData = { ...fileBlob };

  // Find the index of the item to update within the items array
  const itemIndex = newData.extractedNames.findIndex(item => item.extractedName === filedetail.extractedName);

  if (itemIndex !== -1) {
    // Update the status of the item in the copied array
    newData.extractedNames[itemIndex].isSelected = !newData.extractedNames[itemIndex].isSelected;
  } 
  setFileBlob(newData);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
 



  //===========  Files Share Functionality =======================
  const shareFile = async () => {
    //console.log(fileBlob.extractedNames);
    const sharableFiles = [];
    fileBlob.pdfArray.map((item,index)=>{ 
      // console.log(fileBlob.extractedNames[index].isSelected)   
      if(fileBlob.extractedNames[index].isSelected)
      sharableFiles.push(item)
    })    
    
    if(sharableFiles.length>0){
            //console.log(sharableFiles);
            if (navigator.share){
              // Check if the Web Share API is available in the browser

              // Create a shareable data object
              const shareData = {
                title: "Share PDF Document",
                text: "Check out this PDF document!",
                files: [...sharableFiles], // Array of files to share
              };

              // Use the Web Share API to share the PDF
              navigator
                .share(shareData)
                .then(() => {
                  //console.log("PDF shared successfully");
                  sharableFiles.length = 0;
                })
                .catch((error) => console.error("Error sharing PDF:", error));
            }
            else{
              // Web Share API is not supported in this browser
              swal.fire("", "This funcationality is not supported on this device", "error");
              
            }
    }
    else{
      
    }
  };



  const openFileAndDownload = async (contentType, fileName, file_ID) => {
    console.log(fileBlob)
    console.log(fileName,file_ID)


    const newData = { ...fileBlob };

    // Find the index of the item to update within the items array
    const itemIndex = newData.extractedNames.findIndex(item => item.fileid === file_ID);
  
    if (itemIndex !== -1) {
      console.log(fileBlob.pdfArray[itemIndex]);
      const blobUrl = URL.createObjectURL(fileBlob.pdfArray[itemIndex]);
      console.log(blobUrl)
      if (contentType === "pdf") {
        setPdfBlobUrl(blobUrl);
        const pdfWindow = window.open(blobUrl, "_blank");
        pdfWindow.addEventListener("beforeunload", () => {
          URL.revokeObjectURL(blobUrl);
        });
      }      
    } 



    // try {
    //   const response = await fetch(`${url_}/openfile/${file_ID}`, {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${storedToken}`,
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const arrayBuffer = await response.arrayBuffer();
    //   const fileBlob = new Blob([arrayBuffer], {
    //     type: `application/${contentType}`,
    //   });
    //   const blobUrl = URL.createObjectURL(fileBlob);
    //   console.log(blobUrl)
    //   if (contentType === "pdf") {
    //     setPdfBlobUrl(blobUrl);
    //     const pdfWindow = window.open(blobUrl, "_blank");
    //     pdfWindow.addEventListener("beforeunload", () => {
    //       URL.revokeObjectURL(blobUrl);
    //     });
    //   } else if (contentType === "xlsx") {
    //     const link = document.createElement("a");
    //     link.href = blobUrl;
    //     link.download = fileName;
    //     link.click();
    //     URL.revokeObjectURL(blobUrl);
    //   }
    // } catch (error) {
    //   console.error(
    //     `Error fetching or downloading ${contentType.toUpperCase()} file:`,
    //     error
    //   );
    // }
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
                <h6 className={`${style.headpara}`}>A.Y {AY}</h6>
              </div>

              <div className={`${style.neckbar}`}>
                {fileBlob && (
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
                    {codeVisible && <b onClick={selecAllFiles}>All</b>}
                    
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
                {fileBlob&&
                <div className="row mt-3">
                  {fileBlob.extractedNames.map((item) => (                   
                      
                        <div
                          className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.smallcol}`}
                          key={item.fileid}
                        >
                          <div className={style.file_upload}>
                           

                          {codeVisible && (
                            <label className={style.checkbox_label}>
                              <input
                                type="checkbox"
                                className={style.checkbox}
                                checked={item.isSelected}
                                onChange={event => handleCheckboxChange(event, item)}
                              />
                              <span className={style.checkbox_custom}>
                                <span className={style.checkbox_tick}></span>
                              </span>
                            </label>
                          )}
                              <i
                                className="bi bi-file-earmark-pdf-fill text-danger"
                                onClick={(e) =>
                                 { e.preventDefault();
                                  codeVisible?
                                  handleCheckboxChange(e, item):
                                  openFileAndDownload(
                                    "pdf",
                                    "document.pdf",
                                    item.fileid
                                  )}
                                }
                              ></i>
                            
                            <h6 className={style.filename_text} onClick={(e) =>

                                  {e.preventDefault();
                                    codeVisible ?
                                    handleCheckboxChange(e, item):
                                    openFileAndDownload(
                                    "pdf",
                                    "document.pdf",
                                    item.fileid
                                  )}
                                }>
                              {item.extractedName}
                            </h6>
                          </div>
                        </div>
                      
                    
                  ))}
                </div>
}
                {!fileBlob && (
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
