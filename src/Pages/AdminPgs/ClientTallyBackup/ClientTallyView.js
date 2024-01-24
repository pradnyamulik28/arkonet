// KYC.js
import React, { useState,useRef, useEffect } from 'react';
import style from './ClientTallyView.module.css';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import tallyicon from "../../../Images/tallyfileicon.png"
import { saveAs } from 'file-saver';


function ClientTallyView() {
  const Navigate=useNavigate()

  const storedToken = window.localStorage.getItem("jwtToken");
  const client_pan = useLocation().state.ClientPan;
  const client_id = useLocation().state.clientId;
  const user_id=localStorage.getItem("user_id");

  const uploder = useLocation().state.uploder;
  
  const subscription_status=localStorage.getItem("subscription_status");


  const maxSize=10;
  
  const [TallyFile, setTallyFile] = useState([{
    name:"Tally File",
    id:"user_tally_file",
    fileType:"",
    selectedFile:null,
    isExist:false,
    isRecordExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    lastupdatedate:"",
    filename:""
  },
  {
    name:"Tally File",
    id:"client_tally_file",
    fileType:"",
    selectedFile:null,
    isExist:false,
    imgsrc:null,
    fileRef:useRef(null),
    lastupdatedate:"",
    filename:""
  }
]);

  async function deleteFile(e){


    if (subscription_status === "grace_period") {
      swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }
    else{
    
    const updatedItems = [...TallyFile];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);
    



    swal.fire({
      title: 'Are you sure?',
      text: `${TallyFile[index].name} will be Deleted .!!`,
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
formdata.append("ClientId", client_id);
formdata.append("UserId",user_id);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
  body: formdata,
  redirect: 'follow'
      };
      
      fetch(`${url_}/client/user/delete/userbackupfile`, requestOptions)
        .then(response => {if(response.status===200){
          swal.fire({
            position: 'center',
            icon: 'success',
            title: `${TallyFile[index].name} Deleted sucessfully`,
            showConfirmButton: false,
            timer: 2000
          })
        }
          response.text()})
        .then(result => {console.log(result)
        const updatedItems = [...TallyFile];    
              updatedItems[index].isExist=false;
              updatedItems[index].filename=""
              setTallyFile(updatedItems)  }
        )
        .catch(error => console.log('error', error));}
      

      }
    })
  }
    
  }
  
  async function uploadFile(e){ 
      
    if (subscription_status === "grace_period") {
      swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }
   else{ const updatedItems = [...TallyFile];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);
    
    if (index !== -1) {
     
        
      
///////////////////////////////////////////////////////////////////
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var formdata = new FormData();
formdata.append("ClientId", client_id);
formdata.append("UserId", user_id);
formdata.append("imagePathBackupfile", TallyFile[index].selectedFile);

var requestOptions = {
  method: updatedItems[index].isRecordExist?'PUT':'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const fetchUrl=updatedItems[index].isRecordExist?`${url_}/client/user/update/tallybackupfile`
                :`${url_}/client/user/upload/tallybackupfile`
             
    console.log(fetchUrl,requestOptions)
    fetch(fetchUrl, requestOptions)
    .then(response => {
      if(response.status===200)
      {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `${TallyFile[index].name} updated sucessfully`,
          showConfirmButton: false,
          timer: 2000
        })
        window.location.reload();
      }
     return response.text()})
    .then(result => console.log(result))
    .catch(error => console.log('error', error));     
      updatedItems[index].selectedFile=null;
      updatedItems[index].imgsrc=null;
      setTallyFile(updatedItems);
    
    }}
  }





  
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const downloadClientBackup = async (fileid) => {
    const index = TallyFile.findIndex((item) => item.id === fileid);
   

    if (subscription_status === "grace_period") {
      swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }

    else if (!TallyFile[1].isExist) {
      swal.fire({
        icon: "warning",
        text: "No file to view."
      })

    }

    else{

    
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
      {saveAs(result, TallyFile[index].filename);}               

    }
  }catch(error){
      console.log(error)
    }
        
    } catch (error) {
      console.error(
        `Error fetching or downloading ${"pdf".toUpperCase()} file:`,
        error
      );
    }

  }
  };


  const downloadUserBackup=async(fileid)=>{

    const index = TallyFile.findIndex((item) => item.id === fileid);

    if (subscription_status === "grace_period") {
      swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }

    else if (!TallyFile[0].isExist) {
      swal.fire({
        icon: "warning",
        text: "No file to view."
      })

    }

    else{

    
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };



    /////////////   VIEW PDF   /////////////////////////////////////////////////////////////////////////////

    await fetch(`${url_}/client/user/getuserbackupfile/${client_id}/${user_id}`, requestOptions)
      .then((response)=>response.blob())
      .then((result)=>{ 
        if(index !== -1)
      {saveAs(result, TallyFile[index].filename);}                  
                         
          
        }).catch((error)=>console.log(error));
        
    } catch (error) {
      console.error(
        `Error fetching or downloading ${"pdf".toUpperCase()} file:`,
        error
      );
    }

  }
  }




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
  async function getDocDetails(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
const updatedItems = [...TallyFile]; 

await fetch(`${url_}/client/user/getuserbackupfiledetail/${client_id}/${user_id}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    //Get details here
    if(result.imageNameBackupfile)
    {
    console.log(result)
    updatedItems[0].isExist=true;
    updatedItems[0].filename=result.imageNameBackupfile
    updatedItems[0].lastupdatedate=DateConvert(new Date(result.date));
    }
    if(result.id){
      updatedItems[0].isRecordExist=true;
    }  
  })
  .catch(error => console.log('error', error));
  


  await fetch(`${url_}/getcleintbackupfiledetail/${client_pan}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    //Get details here
    if(result.imageNameBackupfile)
    {
      updatedItems[1].isExist=true;
      updatedItems[1].filename=result.imageNameBackupfile
      updatedItems[1].lastupdatedate=DateConvert(new Date(result.date));

    }
  
  })
  .catch(error => console.log('error', error)); 

  console.log(updatedItems);
  setTallyFile(updatedItems); 
  }




  useEffect(()=>{
getDocDetails()
  },[])


  

  const handleFileChange = (e,fileid) => {
    console.log(fileid)
    const updatedItems = [...TallyFile];
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
          confirmButtonText:"Ok"
        }).then((result) => {
          TallyFile[index].fileRef.current.value = "";
        });
      }else
  {
    if (
      file.name.endsWith('.rar')||file.name.endsWith('.zip')
    ) {
     
      const reader = new FileReader();

      reader.onload = (e) => {
        
        if (index !== -1) {
          // Update the item's value
          updatedItems[index].selectedFile = file;          
          setTallyFile(updatedItems);
        }
      };
      reader.readAsDataURL(file);
    } else {
      swal
        .fire({
          title: `Select RAR/ZIP format file `,
          icon: "info",
          confirmButtonText: "OK",
        })
        .then((result) => {
          TallyFile[index].fileRef.current.value = "";

        });
    }}
  }
    
  };

  function handleSelectFile(e){

    if((subscription_status==="grace_period" || subscription_status==="off" || subscription_status===null)
    ){
      swal.fire({
        icon:"info",
        text:"This is view only, to access this service kindly contact your Tax Professional to resume your services."
      })
    }
    else{

    const fileid=e.currentTarget.id;    
    const index = TallyFile.findIndex((item) => item.id === fileid);
    if (index !== -1) {
      TallyFile[index].fileRef.current.click();
    }  
  }  
      
  }

  //console.log(TallyFile)

  return (
<>

    <div className={`m-2 ${style.header}`} >
      <div className={`d-flex`} >
        <Link className={`${style.ancher}`}  
                onClick={(e) => {    e.preventDefault();
                          Navigate(-1);
                        }}><span className='h4'>
          <i class="fa-solid fa-angle-left"></i>&nbsp;&nbsp;</span></Link>
          <h4>{uploder==="client"?"Client Tally Backup":uploder==="user"&&"Uplod Client Tally Backup"}</h4>
      </div>
    </div>

{TallyFile.map((item) => {return(


<div className={`d-flex ${style.uploadcontainer}`}>

{(uploder==="user" && item.id==="user_tally_file")&&
  <div className={`${style.mainport}`} >
  <h4 className={`${style.h4}`} >{item.name}</h4>
  <p class='text-gray-400 '>Files Should be less than {maxSize} MB</p>

{(!item.selectedFile&&!item.isExist)&&
<div className={`${style.psudoslot}`} onClick={handleSelectFile} id={item.id}>
<input  className={`${style.input}`}  type="file" id={item.id} 
onChange={(e)=>handleFileChange(e,item.id)}  ref={item.fileRef}  style={{"display":"none"}} />


<label htmlFor="fileinput">
<div className={`${style.pusdouploadport}`} >
<div className={`${style.logo}`} >
<h2 className={`${style.h1}`} >
  <img style={{ "height": "5rem","width":"5rem" }} src={tallyicon} alt="tally file" />
  </h2>
  <p>{item.lastupdatedate}</p>

</div>
<div className={`${style.text}`} ></div>
<div className={`${style.btn}`} ><div className={`${style.psudobutton}`} > {item.isExist?"Update File":"Select a file"}</div></div>
</div>
</label> 
</div>}


{(item.selectedFile||item.isExist) && 
<div >
<div className={`${style.uploadport}`} >
<div className={`${style.logo}`} >
{
                <>
                 <img style={{ "height": "5rem","width":"5rem" }} src={tallyicon} alt="tally file" onClick={(e)=>{item.isExist&&downloadUserBackup(item.id)}}
                  />
  <p>{item.lastupdatedate}</p>
                </>
               }
</div>
<div className={`${style.btn}`} >
  <div className={`${style.psudobutton}`} type='sumbit' onClick={item.isExist?deleteFile:uploadFile} id={item.id} > {item.isExist?"Delete File":"Upload File"}</div>
{item.isExist&&<div className={`${style.psudobutton}`} type='sumbit' onClick={(e)=>{downloadUserBackup(item.id)}} id={item.id} style={{"marginLeft":"0.5rem"}}>Download</div>  }
  
  </div>
</div>
</div>}
</div>

}

{(uploder==="client" && item.id==="client_tally_file")&&
<div className={`${style.slot}`} >
<div className={`${style.uploadport}`} >
<div className={`${style.logo}`} >

                <>
                 <img style={{ "height": "5rem","width":"5rem" }} src={tallyicon} alt="tally file" 
                  />
  <p>{item.lastupdatedate}</p>

<div className={`${style.btn}`} ><div className={`${style.psudobutton}`} onClick={(e)=>{downloadClientBackup(item.id)}}>{item.isExist?'Download File':'No File'}</div>

</div>
 </>
               
</div>
</div>
</div>}
</div>



)
})}

</>
  );
}

export default ClientTallyView;
