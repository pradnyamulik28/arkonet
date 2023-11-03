import { useEffect,useState } from "react";
import style from "./ContactUs.module.css";
import swal from "sweetalert2";
import { url_ } from "../../../Config";

function ContactUs() {

  
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);


    const [formdata, setFormdata] = useState({
        firstName: "",
        LastName: "",
        email:"",
        contactNo:"",
        Message: ""
      });




      function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
          case "contactNo":
            setFormdata({
              ...formdata,
              [e.target.name]: value.replace(/\D/g, ""),
            });
            e.target.value = value.replace(/\D/g, "");
            // Basic mobile validation
            const mobilePattern = /^[789]\d{9}$/;
            setIsValidMobile(mobilePattern.test(e.target.value));
            break;
          case "email":
            setFormdata({ ...formdata, [e.target.name]: e.target.value });
            //---Basic Email Validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailPattern.test(e.target.value));
            break;
          default:
            setFormdata({ ...formdata, [name]: value });
            break;
        }
      }




      async function submitContactUsForm(name,email,mobile) {
       
        const subject=`Contact us enquiry`
        const message = `Dear Support Team,
  Greeting from TAXKO!
    
  I hope this message finds you well. 
      
  New customer interest in TAXKO , Following are customer details.
  Name:${name}
  Email :${email}
  Mobile No :${mobile}
  
  We trust your expertise and kindly request your assistance in guiding them through this process.
                        
  Best regards,
  From ${name}
      `;
    
    console.log(subject,message)
    
        swal.fire({
          title: 'Registering your response',
          text: 'Kindly wait...',
          showConfirmButton: false,
          onBeforeOpen: () => {
            swal.showLoading();
          },
        });
    
    
        var requestOptions = {
          method: 'POST',
          body: message,
          redirect: 'follow'
        };
    
        try{
          const response= await fetch(`${url_}/send-email/forcontact?subject=${subject}`, requestOptions);
          const result=await response.text();
    
    
          if (response.status === 200) {
            swal.close();
            swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Response Submitted.!',
              text:"Thank you for showing interest. Our support team will contact you soon.",
              showConfirmButton: false,
              timer: 7000
            }); 
           
            
          } else {  
            swal.close();
            swal.fire("Failed!", `${result}`, "error");
          }}catch(error){
            swal.close();
            swal.fire("Failed!", `${error}`, "error");
          }
      }
    

      function handleContactUsQuery(e){
        e.preventDefault();



        if (
          formdata.firstName === "" ||
          formdata.contactNo === "" ||
          formdata.emailemail === "" ||
          formdata.Message === ""||
          !isValidMobile||   //Check mobile validity
          !isValidEmail //Check mobile validity
        ) {
          swal.fire({
            text:
              formdata.firstName === ""
                ? `Please enter your name.`
                : formdata.email === "" || !isValidEmail
                ? `Please enter valid email id.`
                : formdata.contactNo === "" || !isValidMobile
                ? `Please enter valid mobile no.`
                : formdata.Message === "" && `Please enter some message.`,
          });
        } else {
          // console.log(formdata);
          const fullname=formdata.firstName+" "+formdata.LastName;
        submitContactUsForm(fullname,formdata.email,formdata.contactNo)
        setFormdata({
        firstName: "",
        LastName: "",
        email:"",
        contactNo:"",
        Message: ""
        })
        }
        
      }

  return (
    <div className={`${style.container}`}>
      <div className={`${style.innerwrap}`}>
        <section className={`${style.section1} ${style.clearfix}}`}>
          <div className={`${style.textcenter}`}>
            <span className={`${style.shtext} ${style.heading}`}>Contact Us</span>
            <span className={`${style.seperator}`}></span>
            {/* <h1>Drop Us a Mail</h1> */}
          </div>
        </section>

        <section className={`${style.section2} ${style.clearfix}}`}>
          <div className={`${style.col2} ${style.column1} ${style.first}}`}>
            {/* <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script> */}
            <div
              className={`${style.sec2map}`}
              style={{ overflow: "hidden", height: "550px", width: "100%" }}
            >
                
              <div
                id="gmap_canvas"
                style={{ height: "100%", width: "100%" }}
              >

<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4544.579964450332!2d74.23297943894102!3d16.70083637274872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1019213886153%3A0xab33886478d32ae1!2sRETINUE%20ASSOCIATES!5e0!3m2!1sen!2sin!4v1698471233844!5m2!1sen!2sin" 
width="100%" height="100%" frameborder="0" style={{"border":"0"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
              </div>
              <div>
                {/* <small>
                  <a href="http://embedgooglemaps.com"> embed google maps </a>
                </small>
              </div>
              <div>
                <small>
                  <a href="http://freedirectorysubmissionsites.com/">
                    free web directories
                  </a>
                </small> */}
              </div>
            </div>
            <script type="text/javascript"></script>
          </div>
          <div className={`${style.col2} ${style.column2} ${style.last}}`}>
            <div className={`${style.sec2innercont}`}>
              <div className={`${style.sec2addr}`}>
                <p>
                3rd floor, Triveni Tower
Shahupuri 5th lane,
Kolhapur 416001
                </p>
                <p>
                  <span className={`${style.collig}`}>Phone :</span> +91 9820105056
                </p>
                <p>
                  <span className={`${style.collig}`}>Email :</span>{" "}
                  inquiry@taxko.in
                </p>
                {/* <p>
                  <span className={`${style.collig}`}>Fax :</span> +91 9768850839
                </p> */}
              </div>
            </div>
            <div className={`${style.sec2contactform}`}>
              <h3 className={`${style.sec2frmtitle}`}>
                Want to Know More?? Drop Us a Mail
              </h3>
              <form action="">
                <div className={`${style.clearfix}`}>
                  <input
                    className={`${style.col2} ${style.first}`}
                    type="text"
                    placeholder="FirstName"
                    name="firstName"
                    onChange={handleChange}
                    value={formdata.firstName}
                    autoComplete="off"
                  />
                  <input
                    className={`${style.col2} ${style.last}`}
                    type="text"
                    placeholder="LastName"
                    name="LastName"
                    onChange={handleChange}
                    value={formdata.LastName}
                    autoComplete="off"
                  />
                </div>
                <div className={`${style.clearfix}`}>
                  <input
                    className={`${style.col2} ${style.first}`}
                    type="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formdata.email}
                    autoComplete="off"
                  />
                  <input
                    className={`${style.col2} ${style.last}`}
                    type="text"
                    placeholder="Contact Number"
                    name="contactNo"
                    onChange={handleChange}
                    value={formdata.contactNo}
                    autoComplete="off"
                    maxLength={10}
                  />
                </div>
                <div className={`${style.clearfix}`}>
                  <textarea name="Message" id="" cols="30" rows="7" onChange={handleChange} value={formdata.Message}
                  placeholder="Your message here..." />
                    
                  
                </div>
                <div className={`${style.clearfix}`}>
                  <input type="submit" value="Send" onClick={handleContactUsQuery}/>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;
