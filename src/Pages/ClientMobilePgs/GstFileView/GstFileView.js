
import style from "./GstFileView.module.css";
import pdf from "../../../Images/pdf.png";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

function GstFileView() {

  const year=useLocation().state.year;//`${parseInt((useLocation().state.year).split("-")[0])+1}-${parseInt((useLocation().state.year).split("-")[1])+1}`;
  
  const gst_subs_status=localStorage.getItem("gst_subs_status");

  // console.log("year",year)
  const gstCategory=useLocation().state.gstCategory;
  const navigate=useNavigate();
  const client_id = window.localStorage.getItem("client_id_gst");
  const user_id = window.localStorage.getItem("user_id_gst");
  const storedToken = window.localStorage.getItem("jwtToken");

  console.log("year",year,"client Id :",client_id,"user :",user_id)

  const [codeVisible, setCodeVisible] = useState(false);
  const [fileBlob, setFileBlob] = useState(null);

  const [isLoading,setIsLoading]=useState(false);


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
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    console.log(`${url_}/client/files`, requestOptions);

    fetch(`${url_}/Gstgetfile/${user_id}/${client_id}/${year}/${gstCategory}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {        
        
        const filterPdfFiles = data.filter((file) => {
          if(!file.filePath.includes(".xlsx"||"excel"||"Excel"||".xls")) return true
          else return false
        });

        //console.log("filtered",filterPdfFiles)
        const extractedNames = filterPdfFiles.map((file) => {
          
          const fileid = file.id;
          const filePath = file.filePath;
          const parts = file.fileName.split(`${user_id}_${client_id}_${gstCategory}_`);
          // console.log(parts)
          const extractedName = !filePath.includes(".xlsx"||"excel"||"Excel"||".xls")  &&  file.month
         // parts[1].split("_")[1].split(".pdf")[0];//Extract Only Month of GST File
          const isSelected=false;
          return { fileid, extractedName, filePath, isSelected };          
        });
        //console.log("extractednames",extractedNames)


        const pdfArray=[]
        extractedNames.map((file)=>{
          setIsLoading(true);
       fetch(`${url_}/openGstfile/${file.fileid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.blob())
        .then((pdfBlob) => {
          console.log(pdfBlob)
          pdfArray.push(
            new File([pdfBlob], `${file.extractedName}.pdf`, {
              type: "application/pdf",
            })
          );
          setIsLoading(false);
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
//Sort By Month
// Sample array of month names (replace with your own data)
// var monthArray = [
//   "January",
//   "October",
//   "March",
//   "April",
//   "February",
//   "June",
// ];
// function monthSort(a,b){
//   const monthOrder = {
//       "January": 2, "February": 1, "March": 0, "April": 11,
//       "May": 10, "June": 9, "July": 8, "August": 7,
//       "September": 6, "October": 5, "November": 4, "December": 3
//   };

//   return monthOrder[a] - monthOrder[b];
// }
// // Custom sorting function
// monthArray.sort(monthSort);





  //////////////////////////////////////////////////////////////////////////////////////
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



    if(gst_subs_status==="grace_period" || gst_subs_status==="off"){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }
    else{
      
    
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
   
      
    }
  };



  const openFileAndDownload = async (contentType, fileName, file_ID) => {


    if(gst_subs_status==="grace_period" || gst_subs_status==="off"){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }
    else{
    setIsLoading(true)
    try {
      const response = await fetch(`${url_}/openGstfile/${file_ID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const fileBlob = new Blob([arrayBuffer], {
          type: `application/${contentType}`,
        });
        const blobUrl = URL.createObjectURL(fileBlob);
        setIsLoading(false)
        console.log(blobUrl);
        if (contentType === "pdf") {
          setPdfBlobUrl(blobUrl);
          const pdfWindow = window.open(blobUrl, "_blank");
          pdfWindow.addEventListener("beforeunload", () => {
            URL.revokeObjectURL(blobUrl);
          });
        }
      }
    } catch (error) {
      console.error(
        `Error fetching or downloading ${contentType.toUpperCase()} file:`,
        error
      );
    }

  }
  };



  return (
<div className={`row ${style.row1}`}>
  {isLoading&&<Spinner />}
<div className={`${style.allport}`}>

{/* Headbar Starts*/}
<div className={`${style.headerbar}`}>
<div className={`${style.leftear}`}>
<Link onClick={(e) => {
                          e.preventDefault();
                          navigate(-1,{state:{year:year}});
                        }} style={{ fontSize: "2rem" , margin: "0.5rem", color: "black"}}> 
<i class="fa-solid fa-angle-left" style={{ fontSize: "1.5rem" , color: "grey"}} ></i> &nbsp;GST</Link>
<h6 style={{ color: "#596fa4", marginLeft: "2.5rem"}}>{gstCategory} (F.Y {year})</h6>

</div>
<div className={`${style.rightear}`}>
<h4>
{/* <img src={fd} alt="fd"  style={{ fontSize: "2rem",width: "2rem" }} /> */}
</h4>
</div>
</div>
{/* Headbar Ends ....................................................................................................... */}

{/* ABD Starts*/}
{fileBlob && (<div className={`${style.abd}`}>
<div className={`${style.leftbear}`}>
{/* <p className={`${style.p3}`}>My Folders</p> */}
</div>
<div className={`${style.rightbear}`}>
<div className={`${style.licon}`}>

                  <div  className={`d-flex justify-content-center flex-wrap ${style.btndiv}`}>
                    <button
                      type="button"
                      className={`btn btn-danger ${style.btns}`}
                      onClick={toggleCodeVisibility}
                    >
                      Select
                    </button>
                    {codeVisible && <b onClick={selecAllFiles}>All</b>}
                    
                    <div onClick={shareFile}>
                      
                    <h2>{codeVisible && (
                        <i className="fa-solid fa-share-from-square" ></i>
                      )}
                    </h2>
                    </div>
                  </div>
               
</div>
{/* <div className={`${style.ricon}`}>
<h2>{codeVisible && (
                        <i className="fa-solid fa-share-from-square" ></i>
                      )}</h2>
</div> */}
</div>
</div>
)}
{/* ABD Ends ....................................................................................................... */}


{/* Cards Starts*/}
<div className={`${style.row2}`}>
{fileBlob&&<div className={`${style.doc1}`}>{fileBlob.extractedNames.map((item) => {
  return(
<div className={`col-4 ${style.pdffile}`}>
                           

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
  );
})}
</div>}
</div>
{/* Cards Ends ....................................................................................................... */}



{/*  File Not Available Start ....................................................................................................... */}
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

{/*  File Not Available Ends ....................................................................................................... */}

</div>
</div>

  );
}

export default GstFileView;
