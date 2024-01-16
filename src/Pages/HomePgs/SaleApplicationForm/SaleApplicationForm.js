import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { url_ } from "../../../Config";
import style from "./SaleApplicationForm.module.css"

function SaleApplicationForm(){
    const storedToken = window.localStorage.getItem("jwtToken");

    const resumefileRef=useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    designation: "",
    experience: "",
  });
  const [file, setFile] = useState(null);
  const [isNameNull, setIsNameNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setFile(null);
      Swal.fire({
        icon: "error",
        text: "Please choose a valid PDF file.",
      });
      e.target.value=""
    }
  };

  async function sendResume() {
// console.log(file)
    if (
      formData.name === "" ||
      formData.mobile === "" ||
      formData.email === "" ||
      formData.designation === ""||
      formData.experience === ""||
      !/^[789]\d{9}$/.test(formData.mobile)||   //Check mobile validity
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)|| //Check email validity
      file===null||!file
    ) {
      Swal.fire({
        text:
          formData.name === ""
            ? `Please enter your name.`
            : (formData.mobile === "" || !(/^[789]\d{9}$/.test(formData.mobile)))
            ? `Please enter valid mobile no.`
            : (formData.email === "" ||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)))
            ? `Please enter valid email.`
            : formData.designation === ""
            ? `Please enter designation.`
            : formData.experience === ""
            ? `Please enter experience.`:
            (file===null||!file)   &&  "Upload resume/cv file"
      });
    }
else{

    Swal.fire({
        title: 'Submitting Form',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

    const message = `Dear, HR Team
    Greeting from ${formData.name}
    
    I hope this message finds you well. 
    
    ${formData.name} has expressed an interest in the position of Sales Manager for TAXKO, as advertised on TAXKO's career portal.,
    Following are his/her contact details and professional information:

    Full Name: ${formData.name}
    Mobile: ${formData.mobile}
    Email: ${formData.email}
    Designation: ${formData.designation}
    Total Experience: ${formData.experience}
    
    The soft copy of resume/cv is attatched herewith.
    Your esteemed expertise in evaluating candidate profiles is kindly sought for the thorough review of this application.
                        
    Best regards,
    
    ${formData.name},
    Contact no : ${formData.mobile}`;

    console.log(message);
    const formattedMsg = message.replace(/\n/g, "<br>");

    const subject = "Job Application for Sale manager";

    var formdata = new FormData();
    formdata.append("recipient", "inquirytaxko@gmail.com");//"change mail to : contact@arkonetglobal.com"
    formdata.append("text", formattedMsg);
    formdata.append("subject", subject);
    formdata.append("attachmentFileName", "resume_cv");
    formdata.append("attachmentContent", file);

    var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUFBQTExMTFBIiwiaWF0IjoxNzA0MjU4NDI1LCJleHAiOjE3MDQzMDE2MjV9.8en2F9Qtq_4sYDa1wvowfRHpnfvxoiyQdJlCkAidWf8`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/salesmanager/send-email/withattachment`,
        // `${url_}/send-email/withattachment`,
        requestOptions
      );
      const result = await response.text();

      if (response.status === 200) {
        Swal.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application Submitted.!",
          text: "Thank you for showing interest. Our HR team will contact you soon.",
          showConfirmButton: false,
          timer: 7000,
        });
        clearForm()
      } else {
        Swal.close();
        Swal.fire("Failed!", `${result}`, "error");
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Failed!", `${error}`, "error");
    }


  }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsNameNull(false);
        } else {
          setIsNameNull(true);
        }
        break;

      case "email":
        setFormData({ ...formData, [name]: value });
        //---Basic Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(e.target.value));
        break;

      case "mobile":
        console.log("jdskjfsdk")
        setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic mobile validation
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;

      default:
        setFormData({ ...formData, [name]: value });

    }
  }
  function clearForm(){
    
    setFormData({
      name: "",
      mobile: "",
      email: "",
      designation: "",
      experience: "",
    });
    setFile(null)
    resumefileRef.current.value=null
  }
    return(
<section>
        
        <div
          className="modal fade"
          id="salemanagerform"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title fs-5" id="exampleModalLabel">
                  Application Form
                </h3>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={clearForm}
                  
                ><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <form className={style.saleform}>
                  <div className="mb-3">
                    <label for="name" className="col-form-label">
                      Name:
                    </label>
                    <input
                        autoComplete="off"
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="mobile" className="col-form-label">
                      Mobile:
                    </label>
                    <input
                        autoComplete="off"
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      maxLength={10}
                      value={formData.mobile}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="email" className="col-form-label">
                      Email:
                    </label>
                    <input
                        autoComplete="off"
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="designation" className="col-form-label">
                      Current designation:
                    </label>
                    <input
                        autoComplete="off"
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="experience" className="col-form-label">
                      Experience:
                    </label>
                    <input
                        autoComplete="off"
                      type="number"
                      onChange={handleChange}
                      className="form-control"
                      id="experience"
                      name="experience"
                      min="0" 
                      value={formData.experience}
                    />
                  </div>
                  <div className="mb-3" style={{"display":"flex"}}>
                    <label for="message-text" className="col-form-label">
                      Upload file:
                    </label>
                    &nbsp;&nbsp;&nbsp;
                    <span >
                      <input
                        autoComplete="off" type="file" onChange={handleFileChange} ref={resumefileRef}/>
                        <p style={{"color":"#f88379"}}>select pdf file</p>
                    </span>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={clearForm}
                >
                  Close
                </button>
                <button
                  type="button"
                  className={`btn ${style.btn}`}
                  onClick={sendResume}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
export default SaleApplicationForm;