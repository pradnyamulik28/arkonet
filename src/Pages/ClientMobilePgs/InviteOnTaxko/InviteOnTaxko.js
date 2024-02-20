import { useRef, useState } from "react";
import taxko from "../../../Images/Taxko.jpg";
import style from "./InviteOnTaxko.module.css";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const InviteOnTaxko = (props) => {
  const closemodal = useRef();
  const storedToken = localStorage.getItem("jwtToken");
  const [isValidMobile, setIsValidMobile] = useState(true)

  const invitername=localStorage.getItem("name")
  const invitermobile=localStorage.getItem("mobile")

  const [formData, setFormData] = useState({
    clientname: "",
    clientmobileno: "",
    gstno: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;


    switch (name) {
      case "clientmobileno":
        setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      formData.clientname === "" ||
      formData.clientmobileno === "" ||
      !/^[789]\d{9}$/.test(formData.clientmobileno) ||   //Check mobile validity
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) //Check email validity
    ) {
      swal.fire({
        text:
          formData.clientname === ""
            ? `Please enter invitee name.`
            : (formData.clientmobileno === "" || !(/^[789]\d{9}$/.test(formData.clientmobileno)))
              ? `Please enter valid mobile no.`
              : formData.gstno === ""
                ? `Please enter GSTNo.`
                : (formData.email === "" || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) &&
                `Please enter valid email.`
        // :!(formData.clientmobileno.test(e.target.value))&&`Please check mobile no entered`,
      });
    } else {



      swal.fire({
        title: 'Sending invitation.',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          swal.showLoading();
        },
      });


      const subject = `TAXKO Invitation `;

      const inviteemessage = `Dear ${formData.clientname},

  Greeting from TAXKO!

  I hope this message finds you well.
  Our client ${invitername}(Contact No :${invitermobile}) has invited you on TAXKO and we're thrilled to extend a warm invitation to you to explore our services on TAXKO.
  To view detailed specifications, features, and more, simply visit our website https://taxko.in/. We are confident that you'll find something that perfectly aligns with your requirements. 
  
  We look forward to serving you and meeting your expectations.


  Best regards,

  Team TAXKO,
  Contact no : +91 9820105056
  Website : https://taxko.in/
  `;


  const salemessage = `Dear Sale Team,

  Greeting from TAXKO!

  I hope this message finds you well.

  
  We've received a promising sales lead generated through our client ${invitername}(Contact No :${invitermobile}) by Invite on TAXKO.
  This lead represents a significant opportunity for us to expand our client base and drive revenue growth.Details of Invitee are as follows:
  - Name:${formData.clientname}
  - GSTN :${formData.gstno}
  - Contact Number:${formData.clientmobileno}
  - Email :${formData.email}


  We place our confidence in your expertise and kindly request your assistance in reaching out to the aforementioned references to gather more information.

  Best regards,

  ${invitername},
  Contact no : ${invitermobile}
  `;     


    await sendMail(inviteemessage,formData.email,false);
    await sendMail(salemessage,"inquirytaxko@gmail.com",true);

      clearForm()
      closemodal.current.click();
    }
  }


  async function sendMail(raw,to,close){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
   
      
    try {
      const response = await fetch(
        `${url_}/sendEmail/invite?to=${to}&subject=TAXKO Invitation`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.text();
        if(close) { 
          Swal.close()
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Invitation sent.!',
            text:"Thank you for your referrence.",
            showConfirmButton: false,
            timer: 5000
          }); 
        }
      }
      else{
        Swal.close()
      }
    } catch (error) {
      console.log(error);
      Swal.close()
    }
  }
  function clearForm() {
    setFormData({
      clientname: "",
      clientmobileno: "",
      gstno: "",
      email: "",
    });
  }
  return (
    <>
      

      <div
        className="modal fade "
        id="inviteontaxko"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLabel">
                <b>INVITE ON TAXKO</b>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closemodal}
                onClick={clearForm}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-header">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: "200",
                }}
              >
                Please fill details of an Invitee in the following form.
              </p>
            </div>

            

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="">NAME</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    name="clientname"
                    id="clientname"
                    value={formData.clientname}
                    autocomplete="off"
                    placeholder="Invitee name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">GST NO</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    name="gstno"
                    id="gstno"
                    value={formData.gstno}
                    maxLength={15}
                    autocomplete="off"
                    placeholder="Invitee GST NO"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">MOBILE NUMBER</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    value={formData.clientmobileno}
                    name="clientmobileno"
                    id="clientmobileno"
                    autocomplete="off"
                    maxLength={10}
                    placeholder="Invitee Mobile NO"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">EMAIL</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    name="email"
                    value={formData.email}
                    id="email"
                    autocomplete="off"
                    placeholder="Invitee Email"
                  />
                </div>
                
              </form>
            </div>
            <div className={`modal-footer ${style.modal_footer}`}>
              <button
                type="button"
                className={`btn btn-warning ${style.btn}`}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <img src={taxko} className={`${style.modalimg}`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default InviteOnTaxko;
