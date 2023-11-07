import React, { useState,useRef } from 'react';
import style from './Subscription.module.css'; // Import the CSS module for styling
import ImageModal from '../../../components/ImageModal/ImageModal'; // Import the ImageModal component
import taxko from "../../../Images/Taxko.jpg";
import arkonet from "../../../Images/Arkonet.jpg";
import swal from 'sweetalert2';
import { useLocation,useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';

const Subscription = () => {
  const subscription_status=localStorage.getItem('subscription_status');

const Navigate=useNavigate()
  const {subs_pack,subs_amount,no_of_client}=useLocation().state;
  console.log(subs_pack,subs_amount,no_of_client);

  const userInfo={
    userid:localStorage.getItem("user_id"),
    userPAN:localStorage.getItem("pan"),
    jwtToken:localStorage.getItem("jwtToken")
  }


  const [modalVisible, setModalVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile,setSelectedFile]=useState(null);
  const maxSize=10;

  const handleClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function handleFileChange(e){
    const file = e.target.files[0];
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
            fileInputRef.current.value = '';
          }
          else{
            fileInputRef.current.value = '';
          }
        });
      }
      else{
        const renamedFile = new File([file], `Payment_Acknowledgement.${file.type.split("/")[1]}`, {
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
            const binaryData = e.target.result;           
            setSelectedFile(renamedFile);
            
          };
          reader.readAsDataURL(file);
        }
        else {
          swal
            .fire({
              title: `Select (JPEG or PNG or PDF) `,
              icon: "info",
              confirmButtonText: "OK",
            })
            .then((result) => {
              if (result.isConfirmed) {
                fileInputRef.current.value = "";
              } else {
                fileInputRef.current.value = "";
              }
            });
        }
      }
    }
  }


  async function submitAcknowledgement(e) {
    e.preventDefault()


    const message = `Dear Accounts Team,
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  Our client ${localStorage.getItem("user_name")}, has made payment for ${subs_pack} subcription pack worth Rs${subs_amount}. 
  Following is the attachment of payment acknowledgement.Kindly activate the subscription as soon as possible.
                    
  Best regards,

  ${localStorage.getItem("user_name")},
  Contact no : ${localStorage.getItem("mobile")}`;

console.log(message)

    swal.fire({
      title: 'Sending Acknowledgement',
      text: 'Please wait...',
      showConfirmButton: false,
      onBeforeOpen: () => {
        swal.showLoading();
      },
    });


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userInfo.jwtToken}`);

    var formdata = new FormData();
    formdata.append("aceesclient", no_of_client);
    formdata.append("userid", userInfo.userid);
    formdata.append("attachmentContent", selectedFile);
    formdata.append("subscriptionprice", subs_amount);
    formdata.append("subscriptiontype", subs_pack);
    formdata.append("subject", "Payment Acknowledgement");
    formdata.append("text", message);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try{
      const response= await fetch(`${url_}/Subscription/${userInfo.userPAN}`, requestOptions);
      const result=await response.text();


      if (response.status === 200) {
        swal.close();
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Acknowledgement Submitted.!',
          text:"Thank you for payment.Your subscription will be activated soon.",
          showConfirmButton: false,
          timer: 7000
        }); 
        if(subscription_status==="not_subscribed" || subscription_status==="off")
        {

        }
        else{
          Navigate('/admin/dashboard');
        }
       
        
      } else {  
        swal.close();
        swal.fire("Failed!", `${result}`, "error");
      }}catch(error){
        swal.close();
        swal.fire("Failed!", `${error}`, "error");
      }
  }





  return (
    <div className={`${style.workport}`}>


      <div className={`${style.maincont}`}>

        <div className={`${style.mainhair}`}>
          <h3 className={`${style.h31}`}>RENEW SUBSCRIPTION</h3>
        </div>

        <div className={`${style.mainhead}`}>
          <div className={`${style.mainheadtop}`}>
            <h4 className={`${style.h41}`}>PAYENT DETAILS</h4>
          </div>

          <div className={`${style.mainheadbot}`}>
            <div className={`${style.title}`}>
              <p className={`${style.titlepara}`}>QR CODE</p>
            </div>
            <div className={`${style.value} d-flex align-items-center`}>
              <h1 className={`${style.h11}`}><i class="fa-solid fa-qrcode" onClick={handleClick}></i></h1>
              <h6>(Click me to Scan/Pay)</h6>
            </div>
          </div>
          {modalVisible && (
            <ImageModal
              imageSrc={arkonet} // Replace 'arkonet' with the appropriate image source
              imageAlt="Arkonet"
              closeModal={closeModal}
            />
          )}
          <p className={`${style.pline}`} ></p>

          <div className={`${style.mainneck}`}>
            <div className={`${style.title}`}>
              <p className={`${style.titlepara}`}>UPI ID</p>
            </div>
            <div className={`${style.value}`}><h6 className={`${style.h61}`}>eazypay2000013502@icici</h6></div>
          </div>

          <p className={`${style.pline}`} ></p>

          <div className={`${style.abdobinal}`}>

            <div className={`${style.headtr}`}>
              <h6 className={`${style.titleh6}`}>BANK DETAILS</h6>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>BANK NAME</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ICICI BANK</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>ACCOUNT NAME</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ARKONET GLOBAL SERVICES PRIVATE LIMITED</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>ACCOUNT NUMBER</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>016605018980</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>IFSC</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ICIC0000166</h6></div>
            </div>

          </div>

          <p className={`${style.pline}`} ></p>

          <div className={`${style.message}`} >
            <h6 className={`${style.h62}`}>IMPORTANT</h6>
            <p className={`${style.para2}`}>Make payment using ARKONET QR code or using UPI ID or NEFT/RTGS/IMPS payment to Bank Account, upload payment acknowledgement receipt upon successful transaction. once you submit payment  acknowledgement receipt , it may take 48 hours to reflect payment details in TAXKO system.</p>
          </div>

          <div className={`${style.message}`} >
            <h6 className={`${style.h62}`}>Selected Pack</h6>
            <p className={`${style.para2}`}>{`${subs_pack} Clients`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`Amount :`}&nbsp;&#8377;{`${subs_amount}`}/-</p>
          </div>

          <div className={`${style.attatchment} mb-4`}>
            <di className={`${style.leftitle}`}>
              <h6 className={`${style.h62}`}>ATTATCHMENT</h6>
            </di>
            <div className={`${style.rightcont}`}>
              <div className={`${style.rightconttop} mt-4`}>
                <label htmlFor="file">
                  <input className={`${style.input1}`} ref={fileInputRef} type="file" id='file' onChange={handleFileChange}/>
                  <div className={`${style.card1}`}><p className={`${style.cardtext}`}>Upload here</p></div>
                  <h6 className={`${style.h}`}>{selectedFile?selectedFile.name:"jpeg, pdf fromat accepted"}</h6></label>
              </div>

            </div>
          </div>

          <div className={`${style.btn} `}>
            <button className={`${style.button1} `} type="submit" onClick={submitAcknowledgement}>SUMBIT</button>
          </div>
        </div>






      </div>

      {/* <div className={`${style.QR}`}>
        <img src={taxko} alt="" className={style.qrimg} />
      </div> */}



    </div>
  );
}

export default Subscription;