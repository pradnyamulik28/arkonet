// KYC.js
import React, { useState,useRef, useEffect } from 'react';
import style from './ClientTallyView.module.css';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import tallyicon from "../../../Images/tallyfileicon.png";
import { saveAs } from 'file-saver';

function ClientTallyView() {
  const Navigate=useNavigate()
  const uploder = useLocation().state.uploder;

  const storedToken = window.localStorage.getItem("jwtToken");

  const gst_subs_status=localStorage.getItem("gst_subs_status");
  const it_subs_status=localStorage.getItem("it_subs_status");

  const client_pan=localStorage.getItem("pan");
  
  const itclientid=localStorage.getItem("client_id_it");
  const gstclientid=localStorage.getItem("client_id_gst");
  const ituserid=localStorage.getItem("user_id_it"); 
  const gstuserid=localStorage.getItem("user_id_gst");

  const maxSize=10;
  
  const [TallyFiles, setTallyFiles] = useState([{
    name:"IT User File",
    id:"it_user_tally",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    lastupdatedate:"01.01.2023",
    filename:""
  },
  {
    name:"GST User File",
    id:"gst_user_tally",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    lastupdatedate:"01.01.2023",
    filename:""
  },
  {
    name:"Client File",
    id:"client_tally",
    fileType:"",
    selectedFile:null,
    isExist:false,
    isRecordExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    lastupdatedate:"01.01.2023",
    filename:""
  }
]);



  async function deleteFile(e){


    if((it_subs_status==="grace_period" || it_subs_status==="off" || it_subs_status===null)
    && (gst_subs_status==="grace_period" || gst_subs_status==="off" || gst_subs_status===null)
    ){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }
    else{
    
    const updatedItems = [...TallyFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);


    swal.fire({
      title: 'Are you sure?',
      text: `${TallyFiles[index].name} will be Deleted .!!`,
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
      
var formdata = new FormData();
formdata.append("pan", client_pan);
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${url_}/client/delete/clientbackupfile`, requestOptions)
        .then(response => {if(response.status===200){
          swal.fire({
            position: 'center',
            icon: 'success',
            title: `${TallyFiles[index].name} Deleted sucessfully`,
            showConfirmButton: false,
            timer: 2000
          })
        }
          response.text()})
        .then(result => {console.log(result)
        const updatedItems = [...TallyFiles];    
              updatedItems[index].isExist=false;
              setTallyFiles(updatedItems)  }
        )
        .catch(error => console.log('error', error));}
      

      }
    })
  }
    
  }
  
  async function uploadFile(e){ 
      

    const updatedItems = [...TallyFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);
    
    if (index !== -1) {
      if(!updatedItems[index].isExist){
        
      
///////////////////////////////////////////////////////////////////
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var formdata = new FormData();
formdata.append("pan", client_pan);
formdata.append("imagePathBackupfile", TallyFiles[index].selectedFile);

var requestOptions = {
  method: TallyFiles[2].isRecordExist?'PUT':'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const fetchUrl=TallyFiles[2].isRecordExist?`${url_}/client/update/tallybackupfile`:`${url_}/client/upload/tallybackupfile`;
    
    fetch(fetchUrl, requestOptions)
    .then(response => {
      if(response.status===200)
      {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `${TallyFiles[index].name} updated sucessfully`,
          showConfirmButton: false,
          timer: 2000
        })
        getTallyFiles()
      }
     return response.text()})
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

     
      updatedItems[index].selectedFile=null;
      updatedItems[index].imgsrc=null;
      setTallyFiles(updatedItems);
    }
    }
  }


  const downloadITUserFile = async (fileid) => {

    const index = TallyFiles.findIndex((item) => item.id === fileid);
    
    if((it_subs_status==="grace_period" || it_subs_status==="off" || it_subs_status===null)
    && (gst_subs_status==="grace_period" || gst_subs_status==="off" || gst_subs_status===null)
    ){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }

    else{

    if(TallyFiles[index].isExist){
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };



    /////////////   VIEW PDF   /////////////////////////////////////////////////////////////////////////////

    await fetch(`${url_}/client/user/getuserbackupfile/${itclientid}/${ituserid}`, requestOptions)
      .then((response)=>response.blob())
      .then((result)=>{ 
        const index = TallyFiles.findIndex((item) => item.id === fileid);
        if(index !== -1)
        {saveAs(result, TallyFiles[index].filename);}               
                      
          
        }).catch((error)=>console.log(error));
        
    } catch (error) {
      console.error(
        `Error fetching or downloading file.`,
        error
      );
    }
  }
  else{
    swal.fire({
      icon: "warning",
      text: "No file to view."
    })
  }

  }
  };


  const downloadGSTUserFile = async (fileid) => {

    const index = TallyFiles.findIndex((item) => item.id === fileid);
    


    if((it_subs_status==="grace_period" || it_subs_status==="off" || it_subs_status===null)
    && (gst_subs_status==="grace_period" || gst_subs_status==="off" || gst_subs_status===null)
    ){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }

    else{

    if(TallyFiles[index].isExist){
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };



    /////////////   VIEW PDF   /////////////////////////////////////////////////////////////////////////////

    try{const response=await fetch(`${url_}/client/user/getuserbackupfile/${gstclientid}/${gstuserid}`, requestOptions);
    const result=await response.blob()
    if(response.status===200){
      if(index !== -1)
    {saveAs(result, TallyFiles[index].filename);}              

    }}catch(error){
      console.log(error)
    }
     
        
    } catch (error) {
      console.error(
        `Error fetching or downloading file`,
        error
      );
    }
  }
  else{
    swal.fire({
      icon: "warning",
      text: "No file to view."
    })
  }



  }
  };


  
  const downloadClientFile = async (fileid) => {

    const index = TallyFiles.findIndex((item) => item.id === fileid);
    


    if((it_subs_status==="grace_period" || it_subs_status==="off" || it_subs_status===null)
    && (gst_subs_status==="grace_period" || gst_subs_status==="off" || gst_subs_status===null)
    ){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }

    else{

    if(TallyFiles[index].isExist){
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };



    /////////////   VIEW PDF   /////////////////////////////////////////////////////////////////////////////

    try{const response=await fetch(`${url_}/getclientbackupfile/${client_pan}`, requestOptions);
    const result=await response.blob()
    if(response.status===200){
      if(index !== -1)
    {saveAs(result, TallyFiles[index].filename);}           

    }}catch(error){
      console.log(error)
    }
     
        
    } catch (error) {
      console.error(
        `Error fetching or downloading file.`,
        error
      );
    }
  }
  else{
    swal.fire({
      icon: "warning",
      text: "No file to view."
    })
  }



  }
  };



  
  function DateConvert(ConvertingDate) {

    if (ConvertingDate === null) {
      return null;
    } else {



      const date = new Date(ConvertingDate);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      return formattedDate;

    }

  }


  async function getTallyFiles(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
const updatedItems = [...TallyFiles]; 


if(itclientid===gstclientid){
  //IT User File
  await fetch(`${url_}/client/user/getuserbackupfiledetail/${itclientid}/${ituserid}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
      if(result.imageNameBackupfile)
      {
        updatedItems[0].name="User Tally File"
        updatedItems[0].isExist=true;
        updatedItems[0].filename=result.imageNameBackupfile
        updatedItems[0].lastupdatedate=DateConvert(new Date(result.date));
      }
    
    })
    .catch(error => console.log('error', error));
    }
else{


if(itclientid){
//IT User File
await fetch(`${url_}/client/user/getuserbackupfiledetail/${itclientid}/${ituserid}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    if(result.imageNameBackupfile)
    {
      updatedItems[0].isExist=true;
      updatedItems[0].filename=result.imageNameBackupfile
      updatedItems[0].lastupdatedate=DateConvert(new Date(result.date));
    }
  
  })
  .catch(error => console.log('error', error));
  }


 if(gstclientid){ 
//GST User File
await fetch(`${url_}/client/user/getuserbackupfiledetail/${gstclientid}/${gstuserid}`, requestOptions)
.then(response => response.json())
.then(result => {
  // console.log(result)
  //Get details here
  if(result.imageNameBackupfile)
  {
    updatedItems[1].isExist=true;
    updatedItems[1].filename=result.imageNameBackupfile
    updatedItems[1].lastupdatedate=DateConvert(new Date(result.date));

  }

})
.catch(error => console.log('error', error));
}
}
//Client File
  await fetch(`${url_}/getcleintbackupfiledetail/${client_pan}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result)
    //Get details here
    if(result.imageNameBackupfile)
    {
      updatedItems[2].isExist=true;
      updatedItems[2].filename=result.imageNameBackupfile
      updatedItems[2].lastupdatedate=DateConvert(new Date(result.date));

    }
    if(result.id){
      updatedItems[2].isRecordExist=true;
    }
  
  })
  .catch(error => console.log('error', error)); 
  setTallyFiles(updatedItems); 
  }





  useEffect(()=>{
   
getTallyFiles()
  },[])


  

  const handleFileChange = (e,fileid) => {
    console.log(fileid)
    const updatedItems = [...TallyFiles];
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
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          TallyFiles[index].fileRef.current.value = '';
        });
      }else
  {
    if (
     
      file.name.endsWith(".rar")
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {     
        

        if (index !== -1) {
          // Update the item's value
          updatedItems[index].selectedFile = file;
          
          setTallyFiles(updatedItems);
        }
      };
      reader.readAsDataURL(file);
    } else {
      swal
        .fire({
          title: `Select RAR file `,
          icon: "info",
          confirmButtonText: "OK",
        })
        .then((result) => {
          TallyFiles[index].fileRef.current.value = "";
        });
    }}
  }
    
  };

  function handleSelectFile(e){

    if((it_subs_status==="grace_period" || it_subs_status==="off" || it_subs_status===null)
    && (gst_subs_status==="grace_period" || gst_subs_status==="off" || gst_subs_status===null)
    ){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }
    else{

    const fileid=e.currentTarget.id;    
    const index = TallyFiles.findIndex((item) => item.id === fileid);
    if (index !== -1) {
      TallyFiles[index].fileRef.current.click();
    }  
  }  
      
  }

  //console.log(TallyFiles)

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
<div className={`${style.eyes}`} ><h3>Tally Backup{uploder==="client"?"(Client)":uploder==="user"&&"(User)"}</h3></div>
<div className={`${style.rightear}`} ><h3>&nbsp;</h3></div>
</div>

{TallyFiles.map((item) => {return (
  <div>
    {uploder === "user" &&
      ((item.id === "it_user_tally" && itclientid) ||
        (item.id === "gst_user_tally" &&
          gstclientid &&
          gstclientid !== itclientid)) && (
        <div className={`${style.mainport}`}>
          <h4 className={`${style.h4}`}>{item.name}</h4>
          <div className={`${style.slot}`}>
            <div className={`${style.uploadport}`}>
              <div className={`${style.logo}`}>
                <img
                  src={tallyicon}
                  alt="tally file"
                  style={{ height: "5rem", width: "5rem" }}
                  id={
                    item.id
                  } /*onClick={(item.id==="it_user_tally")?downloadITUserFile:(item.id==="gst_user_tally")&&downloadGSTUserFile}*/
                />
                <p>{item.isExist?item.lastupdatedate:"No File"}</p>
                {item.isExist && (
                  <button
                    className={`${style.button}`}
                    type="sumbit"
                    onClick={(e) => {
                      item.id === "it_user_tally"
                        ? downloadITUserFile(item.id)
                        : item.id === "gst_user_tally" &&
                          downloadGSTUserFile(item.id);
                    }}
                    id={item.id}
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    {uploder === "client" && item.id === "client_tally" && (
      <div className={`${style.mainport}`}>
        <h4 className={`${style.h4}`}>{item.name}</h4>
        {!item.selectedFile && !item.isExist && (
          <div
            className={`${style.psudoslot}`}
            onClick={handleSelectFile}
            id={item.id}
          >
            <input
              className={`${style.input}`}
              type="file"
              id={item.id}
              onChange={(e) => handleFileChange(e, item.id)}
              ref={item.fileRef}
              style={{ display: "none" }}
            />

            <label htmlFor="fileinput">
              <div className={`${style.pusdouploadport}`}>
                <div className={`${style.logo}`}>
                  <h1 className={`${style.h1}`}>
                    <i class="fa-solid fa-upload"></i>
                  </h1>
                </div>
                <div className={`${style.text}`}>
                  <p>Select a file</p>
                </div>
                <div className={`${style.btn}`}>
                  <div className={`${style.psudobutton}`}>
                    {" "}
                    {item.isExist ? "Update File" : "Select a file"}
                  </div>
                </div>
              </div>
            </label>
          </div>
        )}

        {(item.selectedFile || item.isExist) && (
          <div className={`${style.slot}`}>
            <div className={`${style.uploadport}`}>
              <div className={`${style.logo}`}>
                <img
                  style={{ height: "5rem", width: "5rem" }}
                  src={tallyicon}
                  alt="tally file" /*onClick={item.isExist&&downloadClientFile}*/
                />
                <p>{item.lastupdatedate}</p>
              </div>
              <div className={`${style.btn}`}>
                <button
                  className={`${style.button}`}
                  type="sumbit"
                  onClick={item.isExist ? deleteFile : uploadFile}
                  id={item.id}
                >
                  {" "}
                  {item.isExist ? "Delete File" : "Upload File"}
                </button>
                {item.isExist && (
                  <button
                    className={`${style.button}`}
                    type="sumbit"
                    onClick={(e) => {
                      downloadClientFile(item.id);
                    }}
                    id={item.id}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);
})}

</>
  );
}

export default ClientTallyView;
