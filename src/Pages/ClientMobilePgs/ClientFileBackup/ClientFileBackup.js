import { useEffect, useState } from "react";
import style from "./ClientFileBackup.module.css"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useRef } from "react";
import { url_ } from "../../../Config";

function ClientFileBackup(props){
    const [spinner,setSpinner]=useState(false);
    const storedToken = window.localStorage.getItem("jwtToken");
    const client_id_it = window.localStorage.getItem("client_id_it");
    const user_id_it = window.localStorage.getItem("user_id_it");

    
    const client_id_gst = window.localStorage.getItem("client_id_gst");
    const user_id_gst = window.localStorage.getItem("user_id_gst");

    const AY=`${new Date().getFullYear()-4}-${(new Date().getFullYear()-3).toString().slice(2)}`;
    // const AY=`${new Date().getFullYear()-5}-${(new Date().getFullYear()-4).toString().slice(2)}`;
    async function backupFiles()
    {
         
            switch(props.category)
        {
            case "IT":
                // console.log("IT")
                await getITFile();
                break;
            case "GST":
                // console.log("GST")
                await getGSTFiles()
                break;
            default:break;
        }

    }
    


    const getGSTFiles = async () => {
      setSpinner(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };


      const gstrFolders=["GSTR-1","GSTR-3B","GSTR-2","GSTR-9","GSTR-9A"]

        const responses = await Promise.all(gstrFolders.map(gstCategory => fetch(`${url_}/Gstgetfile/${user_id_gst}/${client_id_gst}/${AY}/${gstCategory}`, requestOptions)));

        // Use response.json() to extract JSON data from each response
        const dataPromises = responses.map(response => response.json());
  
        // Use Promise.all again to wait for all data promises to resolve
        const resultArray = await Promise.all(dataPromises);

        const filenames=resultArray.map((item)=>{
          const result=item.map((item)=>{
            const fileid = item.id;
            const filename = `${item.category}-${item.month}`;

          return {fileid,filename}
          })
          return result
        })
        const flattenedArray = [].concat(...filenames);

        const zip = new JSZip();
        const remoteZips = flattenedArray.map(async (file) => {
          const response = await fetch(`${url_}/openGstfile/${file.fileid}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          const data = await response.blob();

          if(response.status===200){

          }
          zip.file(`${file.filename}.pdf`, data);
        
          return data;
        });


        Promise.all(remoteZips)
            .then(() => {
              zip.generateAsync({ type: "blob" }).then((content) => {
                // give the zip file a name
                saveAs(content, `gst-backup-AY-${AY}.zip`);
              });
              setSpinner(false);
            })
            .catch(() => {
              setSpinner(false);
            });

      
    };
   
      const getITFile = async () => {
        setSpinner(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);
    
        var raw = JSON.stringify({
          clientid: client_id_it,
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
              const parts = file.fileName.split(`${user_id_it}_${client_id_it}_${AY}_`);
              const extractedName = !filePath.includes(".xlsx"||"excel"||"Excel"||".xls")  &&  parts[1].split(".pdf")[0];
              const isSelected=false;
              return { fileid, extractedName, filePath, isSelected };          
            });
            
            const zip = new JSZip();
            const remoteZips = extractedNames.map(async (file) => {
              const response = await fetch(`${url_}/openfile/${file.fileid}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              });
              const data = await response.blob();

              if(response.status===200){

              }
              zip.file(`${file.extractedName}.pdf`, data);
            
              return data;
            });


            Promise.all(remoteZips)
            .then(() => {
              zip.generateAsync({ type: "blob" }).then((content) => {
                // give the zip file a name
                saveAs(content, `incometax-backup-AY-${AY}.zip`);
              });
              setSpinner(false);
            })
            .catch(() => {
              setSpinner(false);
            });
           
          })
          .catch((error) => console.log("error", error));
      
      }
  

    useEffect(()=>{
    },[spinner])

  
    
return (
  <div className={spinner?`${style.vn_red} ${style.vn_red_disabled}`:`${style.vn_red}`} onClick={backupFiles}>
    <p href="#">
       {props.title}&nbsp;&nbsp;
       {spinner&&<i className="fa fa-spinner fa-spin "></i>}
    </p>
  </div>
);
}
export default ClientFileBackup;