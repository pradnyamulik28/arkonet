// KYC.js
import React, { useState } from 'react';
import style from './KYC.module.css';

function KYC() {

    
  const [KYCFiles, setKYCFiles] = useState([{
    name:"Aadhar Card",
    id:"aadhar_card",
    fileName:"",
    selectedFile:null,
    isExist:false
  },
  {
    name:"PAN Card",
    id:"pan_card",
    fileName:"",
    selectedFile:null,
    isExist:false
  },
  {
    name:"Bank Cheque",
    id:"bank_cheque",
    fileName:"",
    selectedFile:null,
    isExist:false
  }]);


  const handleFileChange = (e) => {
    const fileid=e.target.id;
    const updatedItems = [...KYCFiles];

    const file = e.target.files[0];
    //console.log(file)
    const renamedFile = new File([file], `${e.target.id}.${file.type.split("/")[1]}`, {
      type: file.type,
    });


   

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.name.endsWith('.pdf')) {
        const reader = new FileReader();

      reader.onload = (e) => {
        // Get the binary data of the uploaded image
        const binaryData = e.target.result;
         // Find the index of the item with the given name
    const index = updatedItems.findIndex(item => item.id === fileid);
    console.log(index)
    if (index !== -1) {
      
      // Update the item's value
      updatedItems[index].selectedFile = renamedFile;
      console.log(updatedItems)
      // Set the state with the updated array
      setKYCFiles(updatedItems);
    }
      };
      reader.readAsDataURL(file);
       }
       else{
        console.log("Invalid File Type")
       }
    
    
  };

  //console.log(KYCFiles)

  return (
    <div>
    {KYCFiles.map((item)=>{
        return(
        <div className={`${style.file_upload}`}>            
        <input type="file" id={item.id} onChange={handleFileChange} />
        <label htmlFor={item.id} className={`${style.file_label}`}>
          {item.name}
        </label>       
      </div>    
      
      )
    })}
    </div>
  );
}

export default KYC;
