import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import style from "./TermsPolicy.module.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { url_ } from "../../../Config";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const TermsPolicy = (props) => {
  const [termFiles, setTermFiles] = useState([
    {
      id: "privacy_policy",
      name: "Privacy Policy",
      file: null,
      viewRef: useRef(null),
    },
    {
      id: "service_terms",
      name: "Terms of Service",
      file: null,
      viewRef: useRef(null),
    },
    {
      id: "service_terms_taxko",
      name: "TAXKO Terms of Service",
      file: null,
      viewRef: useRef(null),
    },
    {
      id: "privacy_policy_taxko",
      name: "TAXKO Privacy Policy",
      file: null,
      viewRef: useRef(null),
    },
    {
      id: "disclaimer",
      name: "Disclaimer",
      file: null,
      viewRef: useRef(null),
    },
    {
      id: "refund",
      name: "Refund Policy",
      file: null,
      viewRef: useRef(null),
    },
  ]);

  const fetchPdf = async () => {
    const updateItem = [...termFiles];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/TermsOfServiceDownload/Privacy_Policy`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        updateItem[0].file = url;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${url_}/TermsOfServiceDownload/Terms_of_Service`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        updateItem[1].file = url;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${url_}/TermsOfServiceDownload/Taxko_Terms_Service`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        updateItem[2].file = url;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${url_}/TermsOfServiceDownload/Taxko_Privacy_Policy`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        updateItem[3].file = url;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${url_}/TermsOfServiceDownload/Disclaimer`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        updateItem[4].file = url;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${url_}/TermsOfServiceDownload/Refund_Policy`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        updateItem[5].file = url;
      }
    } catch (error) {
      console.log(error);
    }

    setTermFiles(updateItem);
  };

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
        <span className={`${style.close}`} onClick={props.onClose}>
          &times;
        </span>
        <div className={style.pdfview}>
          {props.name === "Payment Privacy Policy" ? (
            <div className={style.pdf}>
              <p className={style.pdfTitle}>{props.name} </p>

              {termFiles[0].file && (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={termFiles[0].file} />
                </Worker>
              )}
            </div>
          ) : props.name === "Payment Terms of Service" ? (
            <div className={style.pdf}>
              <p className={style.pdfTitle}>{props.name} </p>

              {termFiles[1].file && (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={termFiles[1].file} />
                </Worker>
              )}
            </div>
          ) : props.name === "Terms Of Service" ? (
            <div className={style.pdf}>
              <p className={style.pdfTitle}>{props.name} </p>

              {termFiles[2].file && (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={termFiles[2].file} />
                </Worker>
              )}
            </div>
          ) : props.name === "Privacy Policy" ? (
            <div className={style.pdf}>
              <p className={style.pdfTitle}>{props.name} </p>

              {termFiles[3].file && (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={termFiles[3].file} />
                </Worker>
              )}
            </div>
          ) : props.name === "Disclaimer" ? (
            <div className={style.pdf}>
              <p className={style.pdfTitle}>{props.name} </p>

              {termFiles[4].file && (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={termFiles[4].file} />
                </Worker>
              )}
            </div>
          ) : (
            props.name === "Refund Policy" && (
              <div className={style.pdf}>
                <p className={style.pdfTitle}>{props.name} </p>

                {termFiles[5].file && (
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                  >
                    <Viewer fileUrl={termFiles[5].file} />
                  </Worker>
                )}
              </div>
            )
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TermsPolicy;
