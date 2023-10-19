// KYC.js
import React, { useState,useRef, useEffect } from 'react';
import style from './DOCs.module.css';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function DOCs() {
  const Navigate=useNavigate()

  const storedToken = window.localStorage.getItem("jwtToken");
  const client_pan=localStorage.getItem("pan");

  const maxSize=10;
  
  const [DOCFile, setDOCFile] = useState([{
    name:"Document",
    id:"document",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null)
  }]);

  async function deleteFile(e){
    const updatedItems = [...DOCFile];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);
    
    if (index !== -1) {
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${url_}/client/deletedocumnet?pan=${client_pan}`, requestOptions)
  .then(response => {if(response.status===200){
    swal.fire({
      position: 'center',
      icon: 'success',
      title: `${DOCFile[index].name} Deleted sucessfully`,
      showConfirmButton: false,
      timer: 2000
    })
  }
    response.text()})
  .then(result => {console.log(result)
  const updatedItems = [...DOCFile];    
        updatedItems[index].isExist=false;
        setDOCFile(updatedItems)  }
  )
  .catch(error => console.log('error', error));}

  }
  
  async function uploadFile(e){ 
      

    const updatedItems = [...DOCFile];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);
    
    if (index !== -1) {
      if(!updatedItems[index].isExist){
        
      
///////////////////////////////////////////////////////////////////
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var formdata = new FormData();
formdata.append("pan", client_pan);
formdata.append("image", DOCFile[index].selectedFile);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const fetchUrl=`${url_}/client/uploaddocument`;
    
    fetch(fetchUrl, requestOptions)
    .then(response => {
      if(response.status===200)
      {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `${DOCFile[index].name} updated sucessfully`,
          showConfirmButton: false,
          timer: 2000
        })
        getDocDetails();
      }
     return response.text()})
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

     
      updatedItems[index].selectedFile=null;
      updatedItems[index].imgsrc=null;
      setDOCFile(updatedItems);
    }
    }
  }





  
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const openFileAndDownload = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };



    /////////////   VIEW PDF   /////////////////////////////////////////////////////////////////////////////

    await fetch(`${url_}/getclientdocument/${client_pan}`, requestOptions)
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
          
        }).catch((error)=>console.log(error));
        
    } catch (error) {
      console.error(
        `Error fetching or downloading ${"pdf".toUpperCase()} file:`,
        error
      );
    }
  };


  async function getImageData(){
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      await fetch(`${url_}/getclientdocument/${client_pan}`, requestOptions)
      .then((response)=>response.arrayBuffer())
      .then((result)=>{ 
        const fileBlob = new Blob([result], {
          type: `image/*`,
        });
            
        const blobToDataURL = (blob) => {
          const reader = new FileReader();
          reader.onload = () => {           
            const updatedItems = [...DOCFile];      
        updatedItems[0].imgsrc=reader.result;
        updatedItems[0].isExist=true;
        setDOCFile(updatedItems)  
          };
          reader.readAsDataURL(blob);
        };        
        blobToDataURL(fileBlob);
          
        }).catch((error)=>console.log(error));



        
    } catch (error) {
      console.error(
        `Error fetching or downloading ${"pdf".toUpperCase()} file:`,
        error
      );
    }
  }



  function getDocDetails(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${url_}/getclientdocumentinformation/${client_pan}`, requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
    const updatedItems = [...DOCFile]; 
    if(result.imageName.split(".")[1]==="pdf"){
      updatedItems[0].fileType="pdf";

    }
    else{           
      updatedItems[0].fileType="image";  
      getImageData();        
    }
    
    updatedItems[0].isExist=true;
    setDOCFile(updatedItems); 
  
  })
  .catch(error => console.log('error', error));
  }





  useEffect(()=>{
    const timestamp = Math.floor(new Date().getTime() / 1000);
console.log(`taxko.in/refferal/user/${timestamp}_1`);
// openFileAndDownload();
getDocDetails()
  },[])


  

  const handleFileChange = (e,fileid) => {
    console.log(fileid)
    const updatedItems = [...DOCFile];
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
          text: 'Click OK to open a image reducer website in a new tab',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // Replace 'https://example.com' with the URL you want to open
            window.open("https://www.ilovepdf.com/compress_pdf", '_blank');
            DOCFile[index].fileRef.current.value = '';
          }
          else{
            DOCFile[index].fileRef.current.value = '';
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
          setDOCFile(updatedItems);
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
            DOCFile[index].fileRef.current.value = "";
          } else {
            DOCFile[index].fileRef.current.value = "";
          }
        });
    }}
  }
    
  };

  function handleSelectFile(e){
    const fileid=e.currentTarget.id;    
    const index = DOCFile.findIndex((item) => item.id === fileid);
    if (index !== -1) {
      DOCFile[index].fileRef.current.click();
    }    
      
  }

  //console.log(DOCFile)

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
<div className={`${style.eyes}`} ><h3>Document</h3></div>
<div className={`${style.rightear}`} ><h3>&nbsp;</h3></div>
</div>

{DOCFile.map((item) => {return(
  <div className={`${style.mainport}`} >
<h4 className={`${style.h4}`} >{item.name}</h4>
{(!item.selectedFile&&!item.isExist)&&
<div className={`${style.psudoslot}`} onClick={handleSelectFile} id={item.id}>
<input  className={`${style.input}`}  type="file" id={item.id} 
onChange={(e)=>handleFileChange(e,item.id)}  ref={item.fileRef}  style={{"display":"none"}} />


<label htmlFor="fileinput">
<div className={`${style.pusdouploadport}`} >
<div className={`${style.logo}`} >
<h1 className={`${style.h1}`} ><i class="fa-solid fa-download"></i></h1>
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
{((item.isExist&&item.fileType==="pdf" )||(item.selectedFile && item.selectedFile.name.endsWith(".pdf")))? (
                <>
                  <i
                    className="bi bi-file-earmark-pdf-fill text-danger"
                    style={{ "font-size": "4rem" }} onClick={item.isExist&&openFileAndDownload}
                  >

                  </i>
                </>
              ) : (
                <img
                  id="file-image"
                  src={item.imgsrc}
                  alt="Preview"
                  className={`${style.img}`}
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

export default DOCs;
