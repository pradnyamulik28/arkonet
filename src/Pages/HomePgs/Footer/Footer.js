import style from "./Footer.module.css";
import arkonet from "../../../Images/Arkonet_Logo.png";
import { Link } from "react-router-dom";
import TermsPolicy from "../TermsPolicy/TermsPolicy";
import { useState } from "react";

function Footer() {
  const year=new Date().getFullYear();
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
      default:break;
    }
   }
  return (

    <div className={`${style.mainfooter}`}>

      <div className={` row ${style.upperFooter}`}>

        <div cslassName={` ${style.column1}`}>
        <div className={`${style.paragraph}`}>
            <p>
            Developed & Managed By
            </p>
          </div>
          <div className={`${style.imgArkonet}`}>
            <img src={arkonet} alt="" />
          </div>
          <div className={`${style.paragraph}`}>
          <p>Version 1.0</p>
            <p>
            
              At ARKONET, we're more than just a digital platform - we're your trusted partner in the world of financial and Accounting Management
            </p>
          </div>
        </div>

        <TermsPolicy isOpen={isTermOpen} onClose={()=>{setisTermOpen(false)}} name={termOrPrivacy}/>

        <div className={`${style.column2}`}>
            <div className={`${style.colTile}`}><p classname={`${style.ptitle}`}>Quick Links</p></div>
            <div className={`${style.ancher}`}><Link onClick={()=>{setTermOrPrivacy("Disclaimer");setisTermOpen(true);}}>Disclaimer</Link></div>
            <div className={`${style.ancher}`}><Link onClick={()=>{setTermOrPrivacy("Privacy Policy");setisTermOpen(true);}}>Privacy Policy</Link></div>
            <div className={`${style.ancher}`}><Link onClick={()=>{setTermOrPrivacy("Terms Of Service");setisTermOpen(true);}}>Terms of Service </Link></div>
            <div className={`${style.ancher}`}><Link onClick={()=>{setTermOrPrivacy("Payment Terms of Service");setisTermOpen(true);}}>Payment Terms of Service</Link></div>
            <div className={`${style.ancher}`}><Link onClick={()=>{setTermOrPrivacy("Payment Privacy Policy");setisTermOpen(true);}}>Payment Privacy Policy</Link></div>
            <div className={`${style.ancher}`}><Link onClick={()=>{setTermOrPrivacy("Refund Policy");setisTermOpen(true);}}>Refund Policies</Link></div>
        </div>

        <div className={`${style.column3}`}>

        <div className={`${style.colTile}`}><p classname={`${style.ptitle}`}>Contact US</p></div>
        <div className={`${style.contact}`}><a href="mailto:inquiry@taxko.in" ><i class="fa-regular fa-envelope"></i>inquiry@taxko.in</a></div>
        <div className={`${style.contact}`}><a href="tel:+91 9820105056" ><i class="fa-solid fa-mobile-screen-button"></i>+91 9820105056</a></div>

        <div className={`${style.links}`}>
            <div className={`${style.linkTitle}`}><pr>Follow us</pr></div>
            <div className={`${style.logos}`}>
            <div><i id="facebook" class="fa-brands fa-facebook-f" onClick={socialonClick}></i></div>
            <div><i id="instagram" class="fa-brands fa-instagram" onClick={socialonClick}></i></div>
            <div><i id="twitter" class="bi-twitter-x inverted" onClick={socialonClick}></i></div>
            <div><i id="linkedin" className="bi bi-linkedin" onClick={socialonClick}></i></div>
            </div>
        </div>

        </div>

        <div className={`${style.column4}`}>
        <div className={`${style.colTile}`}><p classname={`${style.ptitle}`}>Location</p></div>
        <div className={`${style.colmap}`}>
  <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15285.62609528768!2d74.241994!3d16.706556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1012292d39783%3A0x817c1a1da55d15f6!2sARKONET%20GLOBAL!5e0!3m2!1sen!2sin!4v1702380352815!5m2!1sen!2sin"
  frameBorder="0"
  width="100%"
  height="200px"
  allowFullScreen=""
  loading="lazy"
  title="ARKONET GLOBAL Location"
></iframe>

</div>


        </div>

      </div>

      <div className={`${style.lowerFooter}`}>

      <div className={`$.style.leftFooter`}>
        <a href="##" className={`$.style.leftFootertext`}>©{year} TAXKO. All Rights Reserved</a>
      </div>
      <div className={`$.style.rightFooter`}>
      <a href="##" className={`$.style.leftFootertext`}>Privacy Policy</a>
      </div>

      </div>
    </div>
  );
}
export default Footer;
