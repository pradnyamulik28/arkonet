import { useEffect,useState } from "react";
import style from "./ContactUs.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { url_ } from '../../../Config';


function ContactUs() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
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
    
        Swal.fire({
          title: 'Registering your response',
          text: 'Kindly wait...',
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
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
            Swal.close();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Response Submitted.!',
              text:"Thank you for showing interest. Our support team will contact you soon.",
              showConfirmButton: false,
              timer: 7000
            }); 
           
            
          } else {  
            Swal.close();
            Swal.fire("Failed!", `${result}`, "error");
          }}catch(error){
            Swal.close();
            Swal.fire("Failed!", `${error}`, "error");
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
          Swal.fire({
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
    <div className={style.about}>
      <section
        className={`${style.breadcrumbs_custom} ${style.bgimage} ${style.section}`}
        
        // data-preset='{"title":"Breadcrumbs","category":"header","reload":false,"id":"breadcrumbs"}'
      >
        <div className={`container ${style.container}`}>
          <div className="breadcrumbs-wrapper">
            <h2 className={style.breadcrumbs_custom_title}>Contact Us</h2>
            <ul className={style.breadcrumbs_custom_path}>
              <li>
                <Link to="/" >Home</Link>
              </li>
              <li className={style.active}>Contact Us</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={`section ${style.contactsection} ${style.section_lg} ${style.bg_default}`}>
        <div className="container">
          <div className={style.layout_bordered}>
            <div className={`${style.layout_bordered__main} text-center`}>
              <div className={`${style.layout_bordered__main_inner}`}>
                <h3>Get in Touch</h3>
                <p>Feel free to get in touch with us. We're here to assist you with any questions or concerns you may have.</p>
                
                <form className={`${style.form} ${style.rd_mailform}`} data-form-output="form-output-global" data-form-type="contact" method="post" action="bat/rd-mailform.php" novalidate="novalidate">
                  <div className={`row align-items-md-end ${style.row_30}`}>
                    <div className="col-md-6">
                      <div className={style.form_wrap}>
                        <input 
                        placeholder="Name" 
                        onChange={handleChange} 
                        className={`${style.form_input}`} 
                        id="firstName" 
                        type="text" name="firstName" 
                        value={formdata.firstName} 
                        data-constraints="@Required" 
                        autoComplete="off"/>
                        <span className={style.form_validation}></span>
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={style.form_wrap}>
                        <input 
                        placeholder="Mobile" 
                        onChange={handleChange} 
                        className={`${style.form_input}`} 
                        id="contactNo" 
                        name="contactNo" 
                        type="text" 
                        value={formdata.contactNo}
                        data-constraints="@Numeric @Required" 
                        autoComplete="off"
                        maxLength={10}/>
                    <span className={style.form_validation}></span>
                        
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className={`${style.form_wrap}`}>
                        
                        <textarea 
                        placeholder="Your message" 
                        onChange={handleChange} 
                        className={`${style.form_input} form-control-last-child`} 
                        id="Message" 
                        name="Message" 
                        value={formdata.Message}
                        data-constraints="@Required"
                        ></textarea>
                        <span className={style.form_validation}></span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={style.form_wrap}>
                        <input 
                        type="Email"                        
                        placeholder="E-mail"               
                        onChange={handleChange}
                        className={`${style.form_input}`} 
                        id="email"
                        name="email" 
                        value={formdata.email}
                        autoComplete="off"
                        data-constraints="@Email @Required" />
                        <span className={style.form_validation}></span>
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <button className={`${style.button} ${style.button_block} ${style.button_primary}`} type="submit" onClick={handleContactUsQuery}>Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={style.layout_bordered__aside}>
              <div className={style.layout_bordered__aside_item}>
                <p className={style.heading_8}>Get social</p>
                <ul className={style.list_inline_xs}>
                  <li><a href="https://www.facebook.com/arkonetglobal" target="_blank" rel="noreferrer" className={`${style.icon} ${style.icon_sm} ${style.icon_default} fa-brands fa-facebook-f`} > </a></li>
                  <li><a href="https://www.instagram.com/arkonetglobal/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noreferrer" className={`${style.icon} ${style.icon_sm} ${style.icon_default} fa-brands fa-instagram`} > </a></li>
                  <li><a href="https://www.linkedin.com/company/arkonetglobal/" target="_blank" rel="noreferrer" className={`${style.icon} ${style.icon_sm} ${style.icon_default} bi bi-linkedin`} > </a></li>
                  <li><a href="https://twitter.com/arkonetglobal?s=11&t=_tXcbzY9oJ0xsskd5YCcMw" target="_blank" rel="noreferrer" className={`${style.icon} ${style.icon_sm} ${style.icon_default} bi-twitter-x inverted`} > </a></li>
                </ul>      
              </div>

              <div className={style.layout_bordered__aside_item}>
                <p className={style.heading_8}>Phone</p>
                <div className={`${style.unit} flex-row ${style.unit_spacing_xxs}`}>
                  <div className={style.unit_left}><span className={`${style.icon} ${style.icon_sm} ${style.icon_primary} material-icons-local_phone`}></span></div>
                  <div className={style.unit_body}><a href="callto:+91 9820105056">+91 9820105056</a></div>
                </div>
              </div>
              <div className={style.layout_bordered__aside_item}>
                <p className={style.heading_8}>E-mail</p>
                <div className={`${style.unit} flex-row ${style.unit_spacing_xxs}`}>
                  <div className={style.unit_left}><span className={`${style.icon} ${style.icon_sm} ${style.icon_primary} mdi mdi-email-outline`}></span></div>
                  <div className={style.unit_body}><a href="mailto:inquiry@taxko.in">inquiry@taxko.in</a></div>
                </div>
              </div>
              <div className={style.layout_bordered__aside_item}>
                <p className={style.heading_8}>Address</p>
                <div className={`${style.unit} flex-row ${style.unit_spacing_xxs}`}>
                  <div className={style.unit_left}><span className={`${style.icon} ${style.icon_sm} ${style.icon_primary} material-icons-location_on`}></span></div>
                  <div className={style.unit_body}><a href="##">3rd floor, Triveni Tower<br/>
Shahupuri 5th lane, <br/> Kolhapur 416001  Alexandria, VA, 2230</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
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
      </section>


      
    </div>
  );
}

export default ContactUs;
