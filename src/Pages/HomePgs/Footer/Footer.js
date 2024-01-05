import arkonet from "../../../Images/arkonet-logo.png";
import style from "./Footer.module.css";
import TermsPolicy from "../TermsPolicy/TermsPolicy";
import { Link } from "react-router-dom";
import { useState } from "react";


function Footer(){
  const year = new Date().getFullYear();
  
  const [isTermOpen, setisTermOpen] = useState(false);
  const [termOrPrivacy,setTermOrPrivacy]=useState();
  function socialonClick(e){

    console.log(e.target.id)
    e.preventDefault();
    switch(e.target.id){
      case "facebook":
       window.open("https://www.facebook.com/arkonetglobal", '_blank');  
      break;
      case "instagram":
       window.open("https://www.instagram.com/arkonetglobal/?igshid=YmMyMTA2M2Y%3D", '_blank');  
      break;
      case "linkedin":
       window.open("https://www.linkedin.com/company/arkonetglobal/", '_blank');  
      break;
      case "twitter":
       window.open("https://twitter.com/arkonetglobal?s=11&t=_tXcbzY9oJ0xsskd5YCcMw", '_blank');  
      break;
      case "arkonet":
       window.open("https://www.arkonetglobal.com/", '_blank');  
      break;
      default:break;
    }
   }
    return(
        
<footer className="text-center text-lg-start bg-body-tertiary " style={{"background":"#333","color":"#fff"}}>
 
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    

    
    <div className={style.social_icon}>
      <ul>

      
      <li>
      <a href="https://www.facebook.com/arkonetglobal" target="_blank" rel="noreferrer" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      </li>
      <li>
      <a href="https://twitter.com/arkonetglobal?s=11&t=_tXcbzY9oJ0xsskd5YCcMw" target="_blank" rel="noreferrer" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      </li>
      <li>
      <a href="https://www.instagram.com/arkonetglobal/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noreferrer" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      </li><li>
      <a href="https://www.linkedin.com/company/arkonetglobal/" target="_blank" rel="noreferrer" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </a>
      </li>
      </ul>
    </div>
    
  </section>
 

    <section className="">
    <div className="container-fluid text-center text-md-start mt-5">
      
      <div className="row mt-3">
        
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <p>Developed & Managed By</p>
          <h6 className="text-uppercase fw-bold mb-4">
            <img id="arkonet" className={`img-fluid`} src={arkonet} alt="TAXKO Services" style={{"height":"3rem","width":"15rem","cursor":"pointer"}} title="ARKONET GLOBAL" onClick={socialonClick}/>
          </h6>
          <p>
          Version 1.0 <br/>

At ARKONET, we're more than just a digital platform - we're your trusted partner in the world of financial and Accounting Management
          </p>
        </div>
        
        <TermsPolicy isOpen={isTermOpen} onClose={()=>{setisTermOpen(false)}} name={termOrPrivacy}/>

        
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase text-left fw-bold mb-4">
            Quick Links
          </h6>
          <p className="text-left">
            <Link className="text-reset" onClick={(e)=>{e.preventDefault();setTermOrPrivacy("Disclaimer");setisTermOpen(true);}}>Disclaimer</Link>
          </p>
          <p className="text-left">
            <Link className="text-reset" onClick={(e)=>{e.preventDefault();setTermOrPrivacy("Privacy Policy");setisTermOpen(true);}}>Privacy Policy</Link>
          </p>
          <p className="text-left">
            <Link className="text-reset" onClick={(e)=>{e.preventDefault();setTermOrPrivacy("Terms Of Service");setisTermOpen(true);}}>Terms of Service </Link>
          </p>
          <p className="text-left">
            <Link className="text-reset" onClick={(e)=>{e.preventDefault();setTermOrPrivacy("Payment Terms of Service");setisTermOpen(true);}}>Payment Terms of Service</Link>
          </p>
          <p className="text-left">
            <Link className="text-reset" onClick={(e)=>{e.preventDefault();setTermOrPrivacy("Payment Privacy Policy");setisTermOpen(true);}}>Payment Privacy Policy</Link>
          </p>
          <p className="text-left">
            <Link className="text-reset" onClick={(e)=>{e.preventDefault();setTermOrPrivacy("Refund Policy");setisTermOpen(true);}}>Refund Policies</Link>
          </p>
        </div>
        

        
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
        <h6 className="text-uppercase text-left fw-bold mb-4">Contact</h6>
          <p className="text-left"><i className="fas fa-home me-3"></i>&nbsp;&nbsp; 3rd floor, Triveni Tower
Shahupuri 5th lane, Kolhapur 416001</p>
          <p className="text-left"><i className="fas fa-envelope me-3"></i>&nbsp;&nbsp;inquiry@taxko.in
          </p>
          <p className="text-left"><i className="fas fa-phone me-3"></i>&nbsp;&nbsp; +91 9820105056</p>
        </div>
        

        
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          
        <h6 className={`footer-title`}>
        <h6 className="text-uppercase fw-bold mb-4">Location</h6>

              <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15285.62609528768!2d74.241994!3d16.706556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1012292d39783%3A0x817c1a1da55d15f6!2sARKONET%20GLOBAL!5e0!3m2!1sen!2sin!4v1702380352815!5m2!1sen!2sin"
      frameBorder="0"
      width="100%"
      height="200px"
      allowFullScreen=""
      loading="lazy"
      title="ARKONET GLOBAL Location"
      className={style.iframe1}
    ></iframe>
            </h6>
        </div>
        
      </div>
      
    </div>
  </section>
  
  
  <div className="text-center p-4" style={{"backgroundColor": "#000000","color":"white"}}>
    © {year} Copyright TAXKO. All Rights Reserved  &nbsp;&nbsp;
    
  </div>
  
</footer>
    )
}
export default Footer