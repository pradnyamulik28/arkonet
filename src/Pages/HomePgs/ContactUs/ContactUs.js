import { useEffect,useState } from "react";
import style from "./ContactUs.module.css";
import swal from "sweetalert2";
import { url_ } from "../../../Config";
import SocialMedia from "../SocialMedia/SocialMedia";

function ContactUs() {

  
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);


    const [formdata, setFormdata] = useState({
        firstName: "",
       
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
          const fullname=formdata.firstName;
        submitContactUsForm(fullname,formdata.email,formdata.contactNo)
        setFormdata({
        firstName: "",
       
        email:"",
        contactNo:"",
        Message: ""
        })
        }
        
      }

  return (
    <div className={style.outercontainer}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.left_side}>
            <div className={`${style.address} ${style.details}`}>
              <i className="fas fa-map-marker-alt"></i>
              <div className={style.topic}>Address</div>
              <div className={style.text_one}>3rd floor, Triveni Tower</div>
              <div className={style.text_two}>
                Shahupuri 5th lane, Kolhapur 416001
              </div>
            </div>
            <div className={`${style.phone} ${style.details}`}>
              <i className="fas fa-phone-alt"></i>
              <div className={style.topic}>Phone</div>
              <div className={style.text_one}>+91 9820105056</div>
              {/* <div className={style.text_two}>+0096 3434 5678</div> */}
            </div>
            <div className={`${style.email} ${style.details}`}>
              <i className="fas fa-envelope"></i>
              <div className={style.topic}>Email</div>
              <div className={style.text_one}>inquiry@taxko.in</div>
              {/* <div className={style.text_two}>info.codinglab@gmail.com</div> */}
            </div>
          </div>
          <div className={style.right_side}>
            <div className={style.topic_text}>Contact Us</div>
            <p>
              Feel free to get in touch with us. We're here to assist you with
              any questions or concerns you may have.
            </p>
            <form action="">
              <div className={style.contact_form}>
                <div className={style.input_box}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="firstName"
                    onChange={handleChange}
                    value={formdata.firstName}
                    autoComplete="off"
                  />
                </div>

                <div className={style.input_box}>
                  <input
                    type="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formdata.email}
                    autoComplete="off"
                  />
                </div>
                <div className={style.input_box}>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    name="contactNo"
                    onChange={handleChange}
                    value={formdata.contactNo}
                    autoComplete="off"
                    maxLength={10}
                  />
                </div>

                <div className={`${style.input_box} ${style.message_box}`}>
                  <textarea
                    name="Message"
                    id=""
                    cols="30"
                    rows="7"
                    onChange={handleChange}
                    value={formdata.Message}
                    placeholder="Your message here..."
                  />
                </div>

                <div className={style.button}>
                  <input
                    type="button"
                    value="Send Now"
                    onClick={handleContactUsQuery}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
        
        </div>
        {/* <div className={style.content}>
        <i className="fa fa-commenting-o font-20" aria-hidden="true"></i>
        <h5>For Feedback</h5><a href="mailto:feedback@taxko.in">feedback@taxko.in</a>
         </div> */}
        {/* <div className={style.content}> */}
        
          <div className={style.map}>
         
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.4056949935434!2d74.23990207696836!3d16.706597403866294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1012292d39783%3A0x817c1a1da55d15f6!2sARKONET%20GLOBAL!5e0!3m2!1sen!2sin!4v1698480061370!5m2!1sen!2sin"
              width="100%"
              height="70%"
              frameborder="0"
              style={{ border: "0", "height":"100%" }}
             
              aria-hidden="false"
              tabindex="0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
           
          </div>
        {/* </div> */}

        <div></div>

        <div >
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
