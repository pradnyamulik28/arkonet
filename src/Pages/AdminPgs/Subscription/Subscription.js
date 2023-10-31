import React, { useState,useRef } from 'react';
import style from './Subscription.module.css'; // Import the CSS module for styling
import ImageModal from '../../../components/ImageModal/ImageModal'; // Import the ImageModal component
import taxko from "../../../Images/Taxko.jpg";
import arkonet from "../../../Images/Arkonet.jpg";
import swal from 'sweetalert2';

const Subscription = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [selectFile,setSelectedFile]=useState();
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
            setSelectedFile(renamedFile.name);
            
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

          <div className={`${style.attatchment} mb-4`}>
            <di className={`${style.leftitle}`}>
              <h6 className={`${style.h62}`}>ATTATCHMENT</h6>
            </di>
            <div className={`${style.rightcont}`}>
              <div className={`${style.rightconttop} mt-4`}>
                <label htmlFor="file">
                  <input className={`${style.input1}`} ref={fileInputRef} type="file" id='file' onChange={handleFileChange}/>
                  <div className={`${style.card1}`}><p className={`${style.cardtext}`}>Upload here</p></div>
                  <h6 className={`${style.h}`}>{selectFile?selectFile:"jpeg, pdf fromat accepted"}</h6></label>
              </div>

            </div>
          </div>

          <div className={`${style.btn} `}>
            <button className={`${style.button1} `} type="submit">SUMBIT</button>
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