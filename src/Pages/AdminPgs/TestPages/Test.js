// import styles from "./PaymentDetails.module.css"
// import profileimg from '../../../Images/profile.png'
// import InputField from "../../../components/InputField/InputField";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useRef } from "react";
// import { url_ } from "../../../Config";

// function PaymentDetails() {
//   const disrtributor_pan = window.localStorage.getItem('pan');
//   const storedToken = window.localStorage.getItem('jwtToken');

//   const maxSize = 5;


//   ////////////////////////////////////////////////////////////////////////////////////


//   const [bankdatalength, setBankDataLength] = useState();
//   const [imgcontent, setImgContent] = useState();

//   const [bankdetails, setBankdetails] = useState({

//     bankname: "",
//     accountname: "",
//     accountnumber: "",
//     ifsc: ""
//   });



//   const [KYCFiles, setKYCFiles] = useState([
//     {
//       name: "Profile Picture",
//       id: "profilepic",
//       fileType: "",
//       selectedFile: null,
//       isExist: false,
//       imgsrc: null,
//       fileRef: useRef(null),
//       uploadStatus: false
//     },
//     {
//       name: "Aadhar Card",
//       id: "aadhar_card",
//       fileType: "",
//       selectedFile: null,
//       isExist: false,
//       imgsrc: null,
//       fileRef: useRef(null),
//       uploadStatus: false
//     },
//     {
//       name: "PAN Card",
//       id: "pan_card",
//       fileType: "",
//       selectedFile: null,
//       isExist: false,
//       imgsrc: null,
//       fileRef: useRef(null),
//       uploadStatus: false
//     },
//     {
//       name: "Bank Cheque",
//       id: "bank_cheque",
//       fileType: "",
//       selectedFile: null,
//       isExist: false,
//       imgsrc: null,
//       fileRef: useRef(null),
//       uploadStatus: false
//     }]);


//   const bankhandleChange = (e) => {


//     setBankdetails({ ...bankdetails, [e.target.name]: e.target.value });



//   };



//   const SaveBankData = async (event) => {
//     console.log(KYCFiles)
//     event.preventDefault();

//     if (!bankdetails.bankname || !bankdetails.accountname || !bankdetails.accountnumber || !bankdetails.ifsc) {
//       Swal.fire("Fill all bank details")
//     }
//     else {



//       Swal.fire({
//         title: 'Saving details',
//         text: 'Please wait...',
//         showConfirmButton: false,
//         onBeforeOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       var myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${storedToken}`);

//       var formdata = new FormData();
//       formdata.append("imagePathProfile", KYCFiles[0].selectedFile && KYCFiles[0].selectedFile);
//       formdata.append("imagePathAdhar", KYCFiles[1].selectedFile && KYCFiles[1].selectedFile);
//       formdata.append("imagePathcheque", KYCFiles[3].selectedFile && KYCFiles[3].selectedFile);
//       formdata.append("Bank_Name", bankdetails.bankname);
//       formdata.append("AccountName", bankdetails.accountname);
//       formdata.append("AccountNumber", bankdetails.accountnumber);
//       formdata.append("IFSC", bankdetails.ifsc);
//       formdata.append("imagePathpan", KYCFiles[2].selectedFile && KYCFiles[2].selectedFile);

//       var requestOptions = {
//         method: 'PUT',
//         headers: myHeaders,
//         body: formdata,
//         redirect: 'follow'
//       };

//       try {
//         const response = await fetch(`${url_}/UpdatedistributorPaymentDetails/${disrtributor_pan}`, requestOptions)
//         const result = await response.text();
//         if (response.status === 200) {
//           Swal.close();
//           Swal.fire({
//             position: 'center',
//             icon: 'success',
//             title: 'Details saved.!',
//             showConfirmButton: false,
//             timer: 5000
//           });
//         }
//       } catch (error) { Swal.close(); console.log('error', error) };
//     }
//   };




//   async function getImageData(updatedItems) {

//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${storedToken}`);

//     var requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };


//     await fetch(`${url_}/getdistributorprofile/${disrtributor_pan}`, requestOptions)
//       .then(response => response.blob())
//       .then(result => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const dataURL = reader.result;
//           updatedItems[0].imgsrc = dataURL;
//         };
//         reader.readAsDataURL(result);
//       })
//       .catch((error) => console.log(error));


//     await fetch(`${url_}/getdistributoradhar/${disrtributor_pan}`, requestOptions)
//       .then(response => response.blob())
//       .then(result => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const dataURL = reader.result;
//           updatedItems[1].imgsrc = dataURL;
//         };
//         reader.readAsDataURL(result);
//       })
//       .catch((error) => console.log(error));



//     await fetch(`${url_}/getdistributorpan/${disrtributor_pan}`, requestOptions)
//       .then(response => response.blob())
//       .then(result => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const dataURL = reader.result;
//           updatedItems[2].imgsrc = dataURL;
//         };
//         reader.readAsDataURL(result);
//       })
//       .catch((error) => console.log(error));



//     await fetch(`${url_}/getdistributorcheque/${disrtributor_pan}`, requestOptions)
//       .then(response => response.blob())
//       .then(result => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const dataURL = reader.result;
//           updatedItems[3].imgsrc = dataURL;
//         };
//         reader.readAsDataURL(result);
//       })
//       .catch((error) => console.log(error));


//     // console.log(updatedItems)
//     setKYCFiles(updatedItems);


//   }

//   async function deleteFile(e) {

//     const updatedItems = [...KYCFiles];
//     const index = updatedItems.findIndex((item) => item.id === e.target.id);
//     console.log(index)
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `${KYCFiles[index].name} will be Deleted .!!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         SaveBankData(e);
//         if (index !== -1) {



//           const updatedItems = [...KYCFiles];
//           updatedItems[index].isExist = false;
//           updatedItems[index].imgsrc = null;
//           updatedItems[index].selectedFile = null;
//           setKYCFiles(updatedItems);

//           SaveBankData(e)


//         }

//       }
//     })



//   }


//   const handleFileChange = (e, fileid) => {


//     const updatedItems = [...KYCFiles];
//     const index = updatedItems.findIndex((item) => item.id === fileid);

//     const file = e.target.files[0];


//     if (file) {
//       const fileSizeInBytes = file.size;
//       const fileSizeInKb = fileSizeInBytes / 1024;
//       const fileSizeInMb = fileSizeInKb / 1024;
//       //console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
//       if (fileSizeInMb > maxSize) {
//         Swal.fire({
//           title: `Select file with a size less than ${maxSize} MB.`,
//           text: 'Click OK to open a file reducer website in a new tab',
//           icon: 'info',
//           showCancelButton: true,
//           confirmButtonText: 'OK',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             if (file.type === "image/jpeg" ||
//               file.type === "image/jpg" ||
//               file.type === "image/png") {
//               window.open("https://www.reduceimages.com/", '_blank');
//             }


//             e.target.value = '';
//           }
//           else {
//             e.target.value = '';
//           }
//         });
//       } else {
//         const renamedFile = new File([file], `${e.target.id}.${file.type.split("/")[1]}`, {
//           type: file.type,
//         });
//         if (
//           file.type === "image/jpeg" ||
//           file.type === "image/jpg" ||
//           file.type === "image/png"

//         ) {
//           const reader = new FileReader();

//           reader.onload = (e) => {
//             // Get the binary data of the uploaded image
//             const binaryData = e.target.result;
//             // Find the index of the item with the given name


//             if (index !== -1) {
//               // Update the item's value
//               updatedItems[index].selectedFile = renamedFile;
//               if (
//                 file.type === "image/jpeg" ||
//                 file.type === "image/jpg" ||
//                 file.type === "image/png"
//               ) {
//                 updatedItems[index].imgsrc = binaryData;
//                 updatedItems[index].fileType = "image";
//               }
//               // console.log(updatedItems)
//               setKYCFiles(updatedItems);
//             }
//           };
//           reader.readAsDataURL(file);
//         } else {
//           Swal
//             .fire({
//               title: `Select (JPEG or PNG ) `,
//               icon: "info",
//               confirmButtonText: "OK",
//             })
//             .then((result) => {
//               if (result.isConfirmed) {
//                 e.target.value = "";
//               } else {
//                 e.target.value = "";
//               }
//             });
//         }
//       }
//     }

//   };

//   function handleSelectFile(e) {


//     const fileid = e.target.id;
//     const index = KYCFiles.findIndex((item) => item.id === fileid);
//     // console.log(fileid,index)

//     if (index !== -1) {
//       KYCFiles[index].fileRef.current.click();
//     }

//   }


//   async function viewFile(filename) {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${storedToken}`);

//     var requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     let url_opt = "";
//     switch (filename) {
//       case "aadhar_card":
//         url_opt = "getdistributoradhar"
//         break;
//       case "pan_card":
//         url_opt = "getdistributorpan"
//         break;
//       case "bank_cheque":
//         url_opt = "getdistributorcheque"
//         break;
//       default:
//         break;
//     }



//     await fetch(`${url_}/${url_opt}/${disrtributor_pan}`, requestOptions)
//       .then(response => response.arrayBuffer())
//       .then(result => {
//         const fileBlob = new Blob([result], {
//           type: `image/jpeg`,
//         });

//         const blobUrl = URL.createObjectURL(fileBlob);
//         console.log(blobUrl)


//         const pdfWindow = window.open(blobUrl, "_blank");
//         pdfWindow.addEventListener("beforeunload", () => {
//           URL.revokeObjectURL(blobUrl);
//         });
//       })
//       .catch((error) => console.log(error));



//   }

//   async function getKYCDetails() {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${storedToken}`);

//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow'
//     };

//     const updatedItems = [...KYCFiles];

//     await fetch(`${url_}/getdistributordetail/${disrtributor_pan}`, requestOptions)
//       .then(response => response.json())
//       .then(result => {//console.log(result)

//         setBankdetails({
//           bankname: result.bank_name,
//           accountname: result.accountName,
//           accountnumber: result.accountNumber,
//           ifsc: result.ifsc
//         })

//         if (result.imageNameprofile) {
//           const index = updatedItems.findIndex((item) => item.id === "profilepic");
//           if (index !== -1) {
//             updatedItems[index].isExist = true;
//             updatedItems[index].fileType = "image";

//           }
//         }



//         if (result.imageNameAdhar) {
//           const index = updatedItems.findIndex((item) => item.id === "aadhar_card");
//           if (index !== -1) {
//             updatedItems[index].isExist = true;
//             updatedItems[index].fileType = "image";

//           }
//         }


//         if (result.imageNamepan) {
//           const index = updatedItems.findIndex((item) => item.id === "pan_card");
//           if (index !== -1) {
//             updatedItems[index].isExist = true;
//             updatedItems[index].fileType = "image";
//           }
//         }

//         if (result.imageNamecheque) {
//           const index = updatedItems.findIndex((item) => item.id === "bank_cheque");
//           if (index !== -1) {
//             updatedItems[index].isExist = true;
//             updatedItems[index].fileType = "image";

//           }
//         }

//       }).catch(error => console.log('error', error));

//     getImageData(updatedItems);
//   }
//   useEffect(() => {
//     getKYCDetails()
//   }, [])

//   const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;

//   return (
//     <>
//       <div className="row">
//         <div className={`${styles.paytitle}`}>OTHER DETAILS</div>
//       </div>
//       <div className={` row ${styles.paymentres} m-2  `}>
//         <div className={`${styles.proimg}`} >

//           <div className={styles.file_upload}>
//             <div className={styles.image_upload_wrap}>
//               <input className={styles.file_upload_input} type='file' id="profilepic" name='profilepic' onChange={(e) => { handleFileChange(e, "profilepic") }} />
//               <div className={styles.drag_text}>
//                 <img src={KYCFiles[0].isExist ? KYCFiles[0].imgsrc : profileimg} alt="Profile Image" />
//                 <h4>Upload File</h4>
//               </div>
//             </div>
//           </div>

//         </div>
//         <div className='ml-5'>
//           <div className={`${styles.detailtitle}`}>KYC DETAILS</div>
//           <div className={`${styles.fileupload} mb-4 `}>
//             <label >AADHAR CARD</label>
//             <button className={styles.buttons} onClick={handleSelectFile} id="aadhar_card">{KYCFiles[1].isExist ? `Update` : `Upload`}</button>
//             {KYCFiles[1].isExist && <><button className={styles.buttons} onClick={(e) => { viewFile("aadhar_card") }}>View</button>
//               <button className={styles.buttons} id="aadhar_card" onClick={deleteFile}>Delete</button></>}
//             <input type="file" style={{ "display": "none" }} name="aadhar_card" id="aadhar_card" className={`${styles.qrinput}`} ref={KYCFiles[1].fileRef} onChange={(e) => handleFileChange(e, "aadhar_card")} />


//           </div>
//           <div className={`${styles.fileupload} mb-4 `}>
//             <label >PAN</label>
//             <button onClick={handleSelectFile} id="pan_card" className={styles.buttons}>{KYCFiles[2].isExist ? `Update` : `Upload`}</button>
//             {KYCFiles[2].isExist && <><button onClick={(e) => { viewFile("pan_card") }} className={styles.buttons}>View</button>
//               <button id="pan_card" onClick={deleteFile} className={styles.buttons}>Delete</button></>}
//             <input type="file" style={{ "display": "none" }} name="pan_card" id="pan_card" className={`${styles.qrinput}`} ref={KYCFiles[2].fileRef} onChange={(e) => handleFileChange(e, "pan_card")} />
//           </div>


//           <div className={`${styles.fileupload} mb-4 `}>
//             <label >BANK CHEQUE</label>
//             <button className={styles.buttons} onClick={handleSelectFile} id="bank_cheque">{KYCFiles[3].isExist ? `Update` : `Upload`}</button>
//             {KYCFiles[3].isExist && <><button className={styles.buttons} onClick={(e) => { viewFile("bank_cheque") }}>View</button>
//               <button className={styles.buttons} id="bank_cheque" onClick={deleteFile}>Delete</button></>}
//             <input type="file" style={{ "display": "none" }} name="bank_cheque" id="bank_cheque" className={`${styles.qrinput}`} ref={KYCFiles[3].fileRef} onChange={(e) => handleFileChange(e, "bank_cheque")} />
//           </div>
//           <div className={`${styles.upiid} `}>

//           </div>
//           <div className={`${styles.detailtitle}`}>BANK DETAILS</div>
//           <div className="accname">
//             <InputField lblname='BANK NAME' color='red' placeholder='Enter bank name' name='bankname' value={bankdetails.bankname} onChange={bankhandleChange} />
//             <InputField lblname='ACCOUNT NAME' color='red' placeholder='Enter account name' name='accountname' value={bankdetails.accountname} onChange={bankhandleChange} />
//             <InputField lblname='ACCOUNT NUMBER' color='red' placeholder='Enter account number' name='accountnumber' value={bankdetails.accountnumber} onChange={bankhandleChange} />
//             <div className={`${styles.ifsc} `}>
//               <InputField lblname='IFSC' color='red' placeholder='Enter IFSC code' name='ifsc' value={bankdetails.ifsc} onChange={bankhandleChange} />

//               {bankdatalength > 0 ?
//                 (
//                   <button onClick={SaveBankData} >UPDATE</button>
//                 ) : (
//                   <button onClick={SaveBankData}>SAVE</button>
//                 )}
//             </div>
//           </div>
//         </div>
//       </div >
//     </>
//   )
// }
// export default PaymentDetails;



import style from '../../DistributorPgs/ViewUserCategory/ViewUserCategory.module.css';



const Test = () => {








  return (


    <div className="d-flex w-100 ">


      <div className={`${style.workport} `}>

        {/* Top Port Starts */}
        <h2 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} >
            &#8617;&nbsp;
          </div>
          <b>hi</b>
          <div>
          </div>
        </h2>
        <div className={`${style.top} `}>
          <div className={`${style.inputbox} `}>
            <div className={`${style.seachbox} `}>
              <input type="search" className={`${style.inputbox} `} placeholder='Search Admin By PAN/Name'
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={`${style.seachlogo} `}>
              <h1><i class="fa-solid fa-magnifying-glass"></i></h1>
            </div>
          </div>
        </div>
        {/* Top Port Ends */}

        {/* Bottom Port Starts */}
        {/* <div style={{ overflowX: "auto", height: "100%" }} className='d-flex w-100 justify-content-center '>

          <div className={`${style.bottom} `} >



            <div className={`${style.drow} `}>
              <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div>
              <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>Admin Name</p></div>
              <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
              <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>
              <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Status</p></div>
            </div>



            <div className={`${style.ddata} `}>
              <div className={`${style.name} `} ><p className={`${style.srno} `}>1</p></div>
              <div className={`${style.name} `} ><p className={`${style.an} `}>PAVAN</p></div>
              <div className={`${style.name} `}  ><p className={`${style.pan} text-primary`}>PAVAN1999D</p></div>
              <div className={`${style.name} `} ><p className={`${style.mobile} `}>9657812062</p></div>
              <div className={`${style.name} `} ><p className={`${style.status} `}><i class="fa-solid fa-circle" style={{ color: true ? "#32e132" : "#ff0000" }}></i></p></div>
            </div>




          </div>

        </div> */}
        {/* Bottom Port Ends */}
        {/* ////////////////////////////////////// */}

        <div style={{ backgroundColor: "#fefbec", borderRadius: "1.5rem", marginTop: "20px", width: "95%", height: "100%" }} className='d-flex justify-content-center'>


          <div style={{ overflow: "auto", width: "95%" }}>
            <table>
              <thead>
                <tr className='text-warning'>
                  <th>Sr. No</th>
                  <th>Admin Name</th>
                  <th>PAN</th>
                  <th>Mobile</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pavan Jidimath</td>
                  <td>Row 1, Cell 3</td>
                  <td>Row 1, Cell 4</td>
                  <td>Row 1, Cell 5</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
        {/* ////////////////////////////////////// */}

      </div>

    </div >


  );
}

export default Test;