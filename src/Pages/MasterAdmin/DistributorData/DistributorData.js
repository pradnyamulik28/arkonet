import React, { useState } from 'react';
import DropDown from '../../../components/DropDown/DropDown'
import Uprofesion_obj from '../../../ObjData/AProf.json'
import States_obj from '../../../ObjData/States.json'

import swal from 'sweetalert';
import { url_ } from '../../../Config';
import styles from './DistributorData.module.css';
import profileimg from '../../../Images/profile.png'
import InputField from '../../../components/InputField/InputField';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import Swal from 'sweetalert2';



const DistributorData = () => {

  const Navigate = useNavigate()
  const user_id = useLocation().state.DistributorID;
  // const Distri_PAN = useLocation().state.DistributorPAN;
  // console.log(user_id)
  const storedToken = window.localStorage.getItem('jwtToken');

  const [values, setValues] = useState({
    name: "",
    datebirth: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    address: "",
    pin_code: "",
    state: "",
    whatsApp_Link: "",
    
  })


  useEffect(() => {
    GetClient();
    getKYCDetails();
  }, [])



  function GetClient() {
    try {

      fetch(`${url_}/all/distributorbyid/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          // console.log(res);
          setValues({
            name: res.name,
            datebirth: res.datebirth,
            profession: res.profession,
            pan: res.pan,
            telephone: res.telephone,
            mobile: res.mobile,
            email: res.email,
            address: res.address,
            pin_code: res.pin_code,
            state: res.state,
            whatsApp_Link: res.whatsApp_Link,
          })

        })
        .catch(error => {


          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${url_}/updateDistribution/${user_id}`;
    console.log(url);
    console.log(values)
    try {

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },

        body: JSON.stringify(values),
      })
        .then(res => {
          swal("Success", "Data updated successfully.", "success");
          window.history.back();
          console.log(values)
        })
        .catch(error => {
          swal("Failed!", " Failed to update.!!!!", "error");
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }


  async function StopServiceDistributor() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/update/distributor/${user_id}/false`, requestOptions);

      if (response.status === 200) {
        await Swal.fire("Success.", "Distributor stopped successfully.", "success");
        window.location.reload();
      } else {
        await Swal.fire("Failed!", "Failed to approve distributor.", "error");
        window.location.reload();

      }
    } catch (error) {
      console.log(error);
    }
  }

  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  ////////////////////////////////////////////////////////////////////////////////////


  const disrtributor_pan = useLocation().state.DistributorPAN;
  // const storedToken = window.localStorage.getItem('jwtToken');

  const maxSize = 5;


  ////////////////////////////////////////////////////////////////////////////////////


  const [bankdatalength, setBankDataLength] = useState();
  const [imgcontent, setImgContent] = useState();

  const [bankdetails, setBankdetails] = useState({

    bankname: "",
    accountname: "",
    accountnumber: "",
    ifsc: ""
  });



  const [KYCFiles, setKYCFiles] = useState([
    {
      name: "Profile Picture",
      id: "profilepic",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    },
    {
      name: "Aadhar Card",
      id: "aadhar_card",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    },
    {
      name: "PAN Card",
      id: "pan_card",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    },
    {
      name: "Bank Cheque",
      id: "bank_cheque",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    }]);


  const bankhandleChange = (e) => {


    setBankdetails({ ...bankdetails, [e.target.name]: e.target.value });
    if (e.target.name === "accountnumber") {
      setBankdetails({ ...bankdetails, [e.target.name]: e.target.value.replace(/\D/g, "") });
      e.target.value = e.target.value.replace(/\D/g, "");

    }


  };



  const SaveBankData = async (event) => {
    console.log(KYCFiles)
    event.preventDefault();


    if (!bankdetails.bankname || !bankdetails.accountname || !bankdetails.accountnumber || !bankdetails.ifsc) {
      Swal.fire("Fill all bank details")
    }
    else {



      Swal.fire({
        title: 'Saving details',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var formdata = new FormData();
      formdata.append("imagePathProfile", KYCFiles[0].selectedFile && KYCFiles[0].selectedFile);
      formdata.append("Bank_Name", bankdetails.bankname);
      formdata.append("AccountName", bankdetails.accountname);
      formdata.append("AccountNumber", bankdetails.accountnumber);
      formdata.append("IFSC", bankdetails.ifsc);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      try {
        const response = await fetch(`${url_}/UpdatedistributorPaymentDetails/${disrtributor_pan}`, requestOptions)
        const result = await response.text();
        if (response.status === 200) {
          Swal.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Details saved.!',
            showConfirmButton: false,
            timer: 5000
          });
        }
      } catch (error) { Swal.close(); console.log('error', error) };
    }
  };




  async function getImageData(updatedItems) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    await fetch(`${url_}/getdistributorprofile/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[0].imgsrc = dataURL;

          updatedItems[0].selectedFile = new File([result], `$profile.jpeg`, {
            type: "image/jpeg",
          });
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));


    await fetch(`${url_}/getdistributoradhar/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[1].imgsrc = dataURL;
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));



    await fetch(`${url_}/getdistributorpan/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[2].imgsrc = dataURL;
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));



    await fetch(`${url_}/getdistributorcheque/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[3].imgsrc = dataURL;
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));

    setKYCFiles(updatedItems);


  }


  async function saveKyc(e) {
    console.log(e.target.id)
    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);



    if (index !== -1) {



      Swal.fire({
        title: 'Saving details',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var formdata = new FormData();
      formdata.append("pan", disrtributor_pan);


      let url_opt = "";
      switch (e.target.id) {
        case "aadhar_card":
          url_opt = "Kycadharimage";
          formdata.append("imagePathAdhar", KYCFiles[1].selectedFile);

          break;
        case "pan_card":
          url_opt = "Kycpanimage";
          formdata.append("imagePathpan", KYCFiles[2].selectedFile);

          break;
        case "bank_cheque":
          url_opt = "Kycchequeimage";

          formdata.append("imagePathcheque", KYCFiles[3].selectedFile);

          break;
        default:
          break;
      }


      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${url_}/distributor/upload/${url_opt}`, requestOptions)
        .then(response => {
          if (response.status === 200) {
            Swal.close();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${KYCFiles[index].name} Saved successfully.!!`,
              showConfirmButton: false,
              timer: 5000
            });
          }
          response.text()
        }
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    }





  }

  async function deleteFile(e) {

    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);

    Swal.fire({
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


          let url_opt = "";
          switch (e.target.id) {
            case "aadhar_card":
              url_opt = "Kycadharimage"
              break;
            case "pan_card":
              url_opt = "Kycpanimage"
              break;
            case "bank_cheque":
              url_opt = "Kycachequeimage"
              break;
            default:
              break;
          }
          Swal.fire({
            title: 'Saving details',
            text: 'Please wait...',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });

          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${storedToken}`);

          var formdata = new FormData();
          formdata.append("pan", disrtributor_pan);

          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          fetch(`${url_}/distributor/delete/${url_opt}`, requestOptions)
            .then(response => {
              if (response.status === 200) {
                Swal.close();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `${KYCFiles[index].name} Deleted successfully.!!`,
                  showConfirmButton: false,
                  timer: 5000
                });
              }
              response.text()
            }
            )
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        }

      }
    })



  }


  const handleFileChange = (e, fileid) => {


    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === fileid);

    const file = e.target.files[0];


    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInKb = fileSizeInBytes / 1024;
      const fileSizeInMb = fileSizeInKb / 1024;
      //console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
      if (fileSizeInMb > maxSize) {
        Swal.fire({
          title: `Select file with a size less than ${maxSize} MB.`,
          text: 'Click OK to open a file reducer website in a new tab',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            if (file.type === "image/jpeg" ||
              file.type === "image/jpg" ||
              file.type === "image/png") {
              window.open("https://www.reduceimages.com/", '_blank');
            }


            e.target.value = '';
          }
          else {
            e.target.value = '';
          }
        });
      } else {
        const renamedFile = new File([file], `${e.target.id}.${file.type.split("/")[1]}`, {
          type: file.type,
        });
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png"

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
              // console.log(updatedItems)
              setKYCFiles(updatedItems);
            }
          };
          reader.readAsDataURL(file);
        } else {
          Swal
            .fire({
              title: `Select (JPEG or PNG ) `,
              icon: "info",
              confirmButtonText: "OK",
            })
            .then((result) => {
              if (result.isConfirmed) {
                e.target.value = "";
              } else {
                e.target.value = "";
              }
            });
        }
      }
    }

  };

  function handleSelectFile(e) {


    const fileid = e.target.id;
    const index = KYCFiles.findIndex((item) => item.id === fileid);
    // console.log(fileid,index)  

    if (index !== -1) {
      KYCFiles[index].fileRef.current.click();
    }

  }


  async function viewFile(filename) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url_opt = "";
    switch (filename) {
      case "aadhar_card":
        url_opt = "getdistributoradhar"
        break;
      case "pan_card":
        url_opt = "getdistributorpan"
        break;
      case "bank_cheque":
        url_opt = "getdistributorcheque"
        break;
      default:
        break;
    }



    await fetch(`${url_}/${url_opt}/${disrtributor_pan}`, requestOptions)
      .then(response => response.arrayBuffer())
      .then(result => {
        const fileBlob = new Blob([result], {
          type: `image/jpeg`,
        });

        const blobUrl = URL.createObjectURL(fileBlob);
        console.log(blobUrl)


        const pdfWindow = window.open(blobUrl, "_blank");
        pdfWindow.addEventListener("beforeunload", () => {
          URL.revokeObjectURL(blobUrl);
        });
      })
      .catch((error) => console.log(error));



  }

  async function getKYCDetails() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const updatedItems = [...KYCFiles];

    await fetch(`${url_}/getdistributordetail/${disrtributor_pan}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        setBankdetails({
          bankname: result.bank_name,
          accountname: result.accountName,
          accountnumber: result.accountNumber,
          ifsc: result.ifsc
        })

        if (result.imageNameprofile) {
          const index = updatedItems.findIndex((item) => item.id === "profilepic");
          if (index !== -1) {

            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";


          }
        }



        if (result.imageNameAdhar) {
          const index = updatedItems.findIndex((item) => item.id === "aadhar_card");
          if (index !== -1) {
            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";

          }
        }


        if (result.imageNamepan) {
          const index = updatedItems.findIndex((item) => item.id === "pan_card");
          if (index !== -1) {
            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";
          }
        }

        if (result.imageNamecheque) {
          const index = updatedItems.findIndex((item) => item.id === "bank_cheque");
          if (index !== -1) {
            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";

          }
        }

      }).catch(error => console.log('error', error));

    getImageData(updatedItems);
  }
  useEffect(() => {
    getKYCDetails()
  }, [])

  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;





  return (
    <div>
      <div className={styles.right}>
        <div className={`${styles.regtitle} d-flex justify-content-around align-items-center mt-4`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <h3> DISTRIBUTOR PROFILE</h3>
          <div></div>

        </div>
        <div className={`${styles.proimg} d-flex flex-column align-items-center`} >

          {/* <div className={styles.file_upload}>
            <div className={styles.image_upload_wrap}>
              <input className={styles.file_upload_input} type='file' name='profilepic' onChange={bankhandleChange} />
              <div className={styles.drag_text}>
                <img src={imageSrc} alt="Profile Image" />
                <h4>Upload File</h4>
              </div>
            </div>
          </div> */}
          <button className='mt-2 ' onClick={() => StopServiceDistributor()} style={{ backgroundColor: "red" }}>STOP</button>
        </div>
        <div className={styles.regform}>
          <h4 className='text-danger mb-4'>
            <hr />
            <b>Personal Information</b>
            <hr />
          </h4>
          <form action="" onSubmit={handleSubmit}>
            <div className={`${styles.first} ml-5 w-75`}>
              <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={values.name} />
              <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='datebirth' value={values.datebirth} />
              <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={values.profession} />
              <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} disabled={true} />
              <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={values.telephone} maxLength='11' />
              <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} maxLength='10' />
              <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={values.email} />
              <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Address' name='address' value={values.address} />
              <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_code' value={values.pin_code} />
              <DropDown value_array={States_obj} lblname='State' name='state' value={values.state} onChange={handleChange} />
              <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='Whatsapp Link' name='whatsApp_Link' value={values.whatsApp_Link} />
            </div>

          </form>
        </div>
        <div className={`${styles.btn_submit} w-100 d-flex justify-content-center`}>
          <button type="submit" onClick={handleSubmit}>
            UPDATE
          </button>
        </div>
      </div>

      <div className="">
        <h4 className='text-danger mb-4'>
          <hr />
          <b>Bank Details</b>
          <hr />
        </h4>
      </div>
      <div className={`w-75 ml-5`}>

        {/* <div className='ml-5'>
          <div className={`${styles.qrupload} mb-4 d-flex justify-content-around w-100 `}>
            <div className='d-flex flex-column align-items-center '>
              <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }}></i>
              <h6>PAN Card</h6>
            </div>
            <div className='d-flex flex-column align-items-center '>
              <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }}></i>
              <h6>Aadhar Card</h6>
            </div>
            <div className='d-flex flex-column align-items-center '>
              <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }}></i>
              <h6>Canceled Cheque</h6>
            </div>

          </div>
          <div className={`${styles.upiid} `}>
           
            <InputField lblname='BANK NAME' color='red' placeholder='Enter bank name' name='bankname' value={bankdetails.bankname} onChange={bankhandleChange} />
            <InputField lblname='ACCOUNT NAME' color='red' placeholder='Enter account name' name='accountname' value={bankdetails.accountname} onChange={bankhandleChange} />
            <InputField lblname='ACCOUNT NUMBER' color='red' placeholder='Enter account number' name='accountnumber' value={bankdetails.accountnumber} onChange={bankhandleChange} />
            <InputField lblname='IFSC' color='red' placeholder='Enter IFSC code' name='ifsc' value={bankdetails.ifsc} onChange={bankhandleChange} />

          </div>
        </div>
      </div > */}
        {/* <div className={`${styles.ifsc} w-100 d-flex justify-content-center`}>

    <button onClick={UpdateBankData}>UPDATE</button></div>*/}


        {/* <div className="row">
          <div className={`${styles.paytitle}`}>OTHER DETAILS</div>
        </div> */}
        <div className={`  ${styles.paymentres} m-2  `}>
          <div className={`${styles.proimg}`} >

            <div className={styles.file_upload}>
              <div className={styles.image_upload_wrap}>
                <input className={styles.file_upload_input} type='file' id="profilepic" name='profilepic' onChange={(e) => { handleFileChange(e, "profilepic") }} />
                <div className={styles.drag_text}>
                  <img src={KYCFiles[0].isExist ? KYCFiles[0].imgsrc : profileimg} alt="Profile Image" />
                  <h4>Upload File</h4>
                </div>
              </div>
            </div>

          </div>
          <div className='ml-5 w-100'>
            <div className={`${styles.detailtitle}`}>KYC DETAILS</div>

            <div className={` mb-4 d-flex justify-content-around`}>

              <div className='d-flex flex-column justify-content-center'>

                {/* {KYCFiles[1].selectedFile ? <button className={`${styles.buttons} ${styles.btnupload}`} onClick={saveKyc} id="aadhar_card">Save</button> :
  <button className={`${styles.buttons} ${styles.btnupload}`} onClick={handleSelectFile} id="aadhar_card">{KYCFiles[1].isExist ? `Update` : `Upload`}</button>} */}

                {KYCFiles[1].isExist && <>
                  <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }} onClick={(e) => { viewFile("aadhar_card") }}></i></>}



                {/* <button className={`${styles.buttons} ${styles.btnview}`} onClick={(e) => { viewFile("aadhar_card") }}>View</button></>} */}
                {/* <button className={`${styles.buttons} ${styles.btndelete}`} id="aadhar_card" onClick={deleteFile}>Delete</button></>} */}
                {/* <input type="file" style={{ "display": "none" }} name="aadhar_card" id="aadhar_card" className={`${styles.qrinput}`} ref={KYCFiles[1].fileRef} onChange={(e) => handleFileChange(e, "aadhar_card")} /> */}
                <label >AADHAR CARD</label>
              </div>
              <div className='d-flex flex-column align-items-center'>
                {/* {KYCFiles[2].selectedFile ? <button className={`${styles.buttons} ${styles.btnupload}`} onClick={saveKyc} id="pan_card">Save</button> :
                <button onClick={handleSelectFile} id="pan_card" className={`${styles.buttons} ${styles.btnupload}`}>{KYCFiles[2].isExist ? `Update` : `Upload`}</button>} */}

                {KYCFiles[2].isExist && <>
                  <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }} onClick={(e) => { viewFile("pan_card") }} ></i></>}


                {/* <button onClick={(e) => { viewFile("pan_card") }} className={`${styles.buttons} ${styles.btnview}`}>View</button></>} */}
                {/* <button id="pan_card" onClick={deleteFile} className={`${styles.buttons} ${styles.btndelete}`}>Delete</button></>} */}
                {/* <input type="file" style={{ "display": "none" }} name="pan_card" id="pan_card" className={`${styles.qrinput}`} ref={KYCFiles[2].fileRef} onChange={(e) => handleFileChange(e, "pan_card")} /> */}

                <label >PAN</label>
              </div>
              <div className='d-flex flex-column justify-content-center'>
                {/* {KYCFiles[3].selectedFile ? <button className={`${styles.buttons} ${styles.btnupload}`} onClick={saveKyc} id="bank_cheque">Save</button> :
                <button className={`${styles.buttons} ${styles.btnupload}`} onClick={handleSelectFile} id="bank_cheque">{KYCFiles[3].isExist ? `Update` : `Upload`}</button>} */}

                {KYCFiles[3].isExist && <>
                  <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }} onClick={(e) => { viewFile("bank_cheque") }}></i></>}


                {/* <button className={`${styles.buttons} ${styles.btnview}`} onClick={(e) => { viewFile("bank_cheque") }}>View</button></>} */}
                {/* <button className={`${styles.buttons} ${styles.btndelete}`} id="bank_cheque" onClick={deleteFile}>Delete</button></>} */}
                <input type="file" style={{ "display": "none" }} name="bank_cheque" id="bank_cheque" className={`${styles.qrinput}`} ref={KYCFiles[3].fileRef} onChange={(e) => handleFileChange(e, "bank_cheque")} />

                <label >BANK CHEQUE</label>
              </div>



            </div>







            <div className={`${styles.upiid} `}>

            </div>
            <div className={`${styles.detailtitle}`}>BANK DETAILS</div>
            <div className="accname">
              <InputField lblname='BANK NAME' color='red' placeholder='Enter bank name' name='bankname' value={bankdetails.bankname} onChange={bankhandleChange} manadatory="*" />
              <InputField lblname='ACCOUNT NAME' color='red' placeholder='Enter account name' name='accountname' value={bankdetails.accountname} onChange={bankhandleChange} manadatory="*" />
              <InputField lblname='ACCOUNT NUMBER' color='red' placeholder='Enter account number' name='accountnumber' value={bankdetails.accountnumber} onChange={bankhandleChange} manadatory="*" />
              <div className={`${styles.ifsc} `}>
                <InputField lblname='IFSC' color='red' placeholder='Enter IFSC code' name='ifsc' value={bankdetails.ifsc} onChange={bankhandleChange} manadatory="*" />

                {bankdatalength > 0 ?
                  (
                    <button onClick={SaveBankData} >UPDATE</button>
                  ) : (
                    <button onClick={SaveBankData}>SAVE</button>
                  )}
              </div>
            </div>
          </div>
        </div >

      </div>
    </div >
  );
}

export default DistributorData;
