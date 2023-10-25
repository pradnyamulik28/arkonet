// KYC.js
import React, { useState,useRef, useEffect } from 'react';
import style from './KYC.module.css';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function KYC() {
  const Navigate=useNavigate()

  const storedToken = window.localStorage.getItem("jwtToken");
  const client_pan=localStorage.getItem("pan");

  const maxSize=10;

  const fileInputRef = useRef(null);
  const [KYCFiles, setKYCFiles] = useState([{
    name:"Aadhar Card",
    id:"aadhar_card",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    uploadStatus:false
  },
  {
    name:"PAN Card",
    id:"pan_card",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    uploadStatus:false
  },
  {
    name:"Bank Cheque",
    id:"bank_cheque",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    uploadStatus:false
  }]);

  
  
  async function uploadFile(e){   
    const selection=e.target.id;
   
    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);
    
    if (index !== -1) {
      // console.log(KYCFiles[index].selectedFile);
///////////////////////////////////////////////////////////////////
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var formdata = new FormData();
formdata.append("pan", client_pan);
formdata.append("image", KYCFiles[index].selectedFile);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

let fetchUrl="";
    switch (selection) {
      case "aadhar_card":
        fetchUrl=`${url_}/client/Kycadharimage`;
        break;

        case "pan_card":
          fetchUrl=`${url_}/client/Kycpanimage`;        
        break;

        case "bank_cheque":
          fetchUrl=`${url_}/client/Kycchequeimage`;
        
        break;
    
      default:
        break;
    } 
    fetch(fetchUrl, requestOptions)
    .then(response => {
      if(response.status===200)
      {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `${KYCFiles[index].name} updated sucessfully`,
          showConfirmButton: false,
          timer: 2000
        })
        updatedItems[index].selectedFile=null;
      updatedItems[index].uploadStatus=true;
        getKYCDetails();
      }
     return response.text()})
    .then(result => console.log(result))
    .catch(error => console.log('error', error));          
      setKYCFiles(updatedItems);
    }
  }


  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const openFileAndDownload = async (fileid) => {
    let fetchUrl=""
    switch(fileid){
      case "aadhar_card":
        fetchUrl=`getclientkycadhar`;
        break;

        case "pan_card":
          fetchUrl=`getclientkycapan`;        
        break;

        case "bank_cheque":
          fetchUrl=`getclientkyccheck`;
        
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
      .then((response)=>response.arrayBuffer())
      .then((result)=>{
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



  async function getImageData(updatedItems){
    
    var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };


      await fetch(`${url_}/getclientkycadhar/${client_pan}`, requestOptions)
      .then(response=> response.blob())
      .then(result=>
        {const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[0].imgsrc=dataURL;
        };
        reader.readAsDataURL(result);
          })
      .catch((error)=>console.log(error));



      await fetch(`${url_}/getclientkycapan/${client_pan}`, requestOptions)
      .then(response=> response.blob())
      .then(result=>
        {const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[1].imgsrc=dataURL;
        };
        reader.readAsDataURL(result);
          })
      .catch((error)=>console.log(error));



      await fetch(`${url_}/getclientkyccheck/${client_pan}`, requestOptions)
      .then(response=> response.blob())
      .then(result=>
        {const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[2].imgsrc=dataURL;
        };
        reader.readAsDataURL(result);
          })
      .catch((error)=>console.log(error));


    console.log("getImageData", updatedItems);
    setKYCFiles(updatedItems);
    
   
  }

  async function deleteFile(e){

    const selection=e.target.id;
    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);

    swal.fire({
      title: 'Are you sure?',
      text: `${KYCFiles[index].name} will be Deleted .!!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
                  
    if (index !== -1) {
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

let fetchUrl="";
    switch (selection) {
      case "aadhar_card":
        fetchUrl=`${url_}/client/deleteKycadharrimage?pan=${client_pan}`;
        break;

        case "pan_card":
          fetchUrl=`${url_}/client/deleteKycpankrimage?pan=${client_pan}`;        
        break;

        case "bank_cheque":
          fetchUrl=`${url_}/client/deleteKyccheckrimage?pan=${client_pan}`;
        
        break;
    
      default:
        break;
    } 
    fetch(fetchUrl, requestOptions)
  .then(response => {if(response.status===200){
    swal.fire({
      position: 'center',
      icon: 'success',
      title: `${KYCFiles[index].name} deleted sucessfully`,
      showConfirmButton: false,
      timer: 2000
    })
    //getKYCDetails();
  }
    response.text()})
  .then(result => {console.log(result)
  const updatedItems = [...KYCFiles];    
        updatedItems[index].isExist=false;
        setKYCFiles(updatedItems)  }
  )
  .catch(error => console.log('error', error));}

}
})

  }
  

  const handleFileChange = (e,fileid) => {
    console.log(fileid)
    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === fileid);

    const file = e.target.files[0];
    //console.log(file)
    
if(file){
  const fileSizeInBytes = file.size;
    const fileSizeInKb = fileSizeInBytes / 1024;
    const fileSizeInMb = fileSizeInKb / 1024;
      //console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
      if (fileSizeInMb > maxSize){
        swal.fire({
          title: `Select file with a size less than ${maxSize} MB.`,
          text: 'Click OK to open a file reducer website in a new tab',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            if(file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png" )
            {
              window.open("https://www.reduceimages.com/", '_blank');
            }
           
            else{
              window.open("https://www.ilovepdf.com/compress_pdf", '_blank');
            }
            KYCFiles[index].fileRef.current.value = '';
          }
          else{
            KYCFiles[index].fileRef.current.value = '';
          }
        });
      }else
  {const renamedFile = new File([file], `${e.target.id}.${file.type.split("/")[1]}`, {
    type: file.type,
  });
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.name.endsWith(".pdf")
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Get the binary data of the uploaded image
        const binaryData = e.target.result;
        // Find the index of the item with the given name
        

        if (index !== -1) {
          // Update the item's value
          updatedItems[index].selectedFile = renamedFile;
          if (
            file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png"
          ) {
            updatedItems[index].imgsrc = binaryData;
            updatedItems[index].fileType = "image";
          }
          else{
            updatedItems[index].fileType = "pdf";
          }
          setKYCFiles(updatedItems);
        }
      };
      reader.readAsDataURL(file);
    } else {
      swal
        .fire({
          title: `Select (JPEG or PNG or PDF) `,
          icon: "info",
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            KYCFiles[index].fileRef.current.value = "";
          } else {
            KYCFiles[index].fileRef.current.value = "";
          }
        });
    }}
  }
    
  };

  function handleSelectFile(e){
    const fileid=e.currentTarget.id;    
    const index = KYCFiles.findIndex((item) => item.id === fileid);
    if (index !== -1) {
      KYCFiles[index].fileRef.current.click();
    }    
      
  }




 async function getKYCDetails(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const updatedItems = [...KYCFiles]; 

 await fetch(`${url_}/getclientKycinformation/${client_pan}`, requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)   

    if(result.imageName){
      const index = updatedItems.findIndex((item) => item.id === result.imageName.split(".")[0]);
      if (index !== -1){   
        updatedItems[index].isExist=true;    
        if(result.imageName.includes("pdf")){
          updatedItems[index].fileType="pdf";   
        }
        else{           
          updatedItems[index].fileType="image";            
      }
    }}



    if(result.imageName2){
      const index = updatedItems.findIndex((item) => item.id === result.imageName2.split(".")[0]);
      if (index !== -1){
        updatedItems[index].isExist=true;
        if(result.imageName2.includes("pdf")){
          updatedItems[index].fileType="pdf";    
        }
        else{           
          updatedItems[index].fileType="image"; 
      }
    }}


    if(result.imageName3){
      const index = updatedItems.findIndex((item) => item.id === result.imageName3.split(".")[0]);
      if (index !== -1){
        updatedItems[index].isExist=true;  
        if(result.imageName3.includes("pdf")){
          updatedItems[index].fileType="pdf";            
        }
        else{           
          updatedItems[index].fileType="image";   
      }
    }   
   
  }
   
  }).catch(error => console.log('error', error));

  getImageData(updatedItems);
  }


  useEffect(()=>{
    getKYCDetails();
  },[])
  //console.log(KYCFiles)

  return (
<>

    <div className={`${style.header}`} >
<div className={`${style.leftear}`} >
  <Link className={`${style.ancher}`}  
  onClick={(e) => {    e.preventDefault();
                          Navigate(-1);
                        }}><h3>
  <i class="fa-solid fa-angle-left"></i></h3></Link>
  </div>
<div className={`${style.eyes}`} ><h3>KYC Files</h3></div>
<div className={`${style.rightear}`} ><h3>&nbsp;</h3></div>
</div>

{KYCFiles.map((item) => {return(
  <div className={`${style.mainport}`} >
<h5 className={`${style.h4}`} >{item.name}</h5>
{(!item.selectedFile&&!item.isExist)&&
<div className={`${style.psudoslot}`} onClick={handleSelectFile} id={item.id}>
<input  className={`${style.input}`}  type="file" id={item.id} 
onChange={(e)=>handleFileChange(e,item.id)}  ref={item.fileRef}  style={{"display":"none"}} />


<label htmlFor="fileinput">
<div className={`${style.pusdouploadport}`} >
<div className={`${style.logo}`} >
<h1 className={`${style.h1}`} ><i class="fa-solid fa-upload"></i></h1>
</div>
<div className={`${style.text}`} ><p>Select a file or Drag here</p></div>
<div className={`${style.btn}`} ><div className={`${style.psudobutton}`} > {item.isExist?"Update File":"Select a file"}</div></div>
</div>
</label> 
</div>}


{(item.selectedFile||item.isExist) && 
<div className={`${style.slot}`} >
<div className={`${style.uploadport}`} >
<div className={`${style.logo}`} >
{((item.isExist&&item.fileType==="pdf" )||(item.selectedFile && item.selectedFile.name.endsWith(".pdf"))) ? (
                <>
                  <i
                    className="bi bi-file-earmark-pdf-fill text-danger"
                    style={{ "font-size": "4rem" }}
                    onClick={(e)=>{
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
<div className={`${style.btn}`} >
  <button className={`${style.button}`} type='sumbit' onClick={item.isExist?deleteFile:uploadFile} id={item.id} > {item.isExist?"Delete File":"Upload File"}</button></div>
</div>
</div>}
</div>)
})}

</>
  );
}

export default KYC;
