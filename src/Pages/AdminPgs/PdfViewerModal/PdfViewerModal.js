import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import style from "./PdfViewerModal.module.css";
import { Worker, Viewer,ScrollMode  } from '@react-pdf-viewer/core';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/zoom/lib/styles/index.css';
import PDF from "../../../Files/Privacy_Policy.pdf"

import Swal from "sweetalert2";

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`; // Adjust the version and path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const PdfViewerModal = (props) => {
  
  const [pdfBlob, setPdfBlob] = useState(null);
const [isChecked, setIsChecked] = useState(false);
const [iserror,setError]=useState(false);


const termFiles=[
  {
    id:"privacy_policy",
    name:"Privacy Policy",
    file:require("../../../Files/Privacy_Policy.pdf"),
    viewRef:useRef(null),
    defaultLayoutPluginInstance:defaultLayoutPlugin()
  },
  {
    id:"service_terms",
    name:"Terms of Service",
    file:require("../../../Files/Terms_of_Service.pdf"),
    viewRef:useRef(null),
    defaultLayoutPluginInstance:defaultLayoutPlugin()
  }
]

const storedToken=localStorage.getItem("jwtToken")
  const fetchPdf = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${storedToken}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

   try {
     const response = await fetch(
       "http://localhost:8085/openfile/1",
       requestOptions
     );
     if (response.status === 200) {
      const result = await response.blob();
      const url = URL.createObjectURL(result);
       setPdfBlob(url);
     }
   } catch (error) {
     console.log(error);
   }
  };
 function confirmTheTerms(){
  if(isChecked)
  {
    props.onData(true);
    props.onClose();
  }
  else{
    setError(true)
  }
 
 }
 
  useEffect(() => {
    
    fetchPdf();
  }, []);
  return (
    <div
      className={
        props.isOpen ? `${style.modal} ${style.modaldisplay}` : `${style.modal}`
      }
    >
      <div className={`${style.modal_content}`}>
        <div className={style.container}>
          <div className={style.pdfview}>
            {termFiles.map((item) => {
              return (
                <div className={style.pdf}>
                  <p className={style.pdfTitle}>{item.name} </p>

                  {item.file && (
                    <Worker
                      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                    >
                      <Viewer
                        fileUrl={item.file}
                        plugins={[item.defaultLayoutPluginInstance]}
                        ref={item.viewRef}
                      />
                    </Worker>
                  )}
                </div>
              );
            })}
          </div>
          <div></div>
          <div className={style.terms}>
            <input
              name="confirmterms"
              id="confirmterms"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
               if(e.target.checked)
               {
                setError(false)
               }            
                
              }}
            />
            I agree to these Terms and Conditions..
          </div>
          
          {iserror&&<div className={style.terms}><p className={style.errormsg}>Please confirm to proceed..</p></div>}
          <div className={style.terms}>
            
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#7066e0",
                marginRight: "0.5rem",
                color: "white",
              }}
              onClick={confirmTheTerms}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                props.onData(false);
                props.onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;