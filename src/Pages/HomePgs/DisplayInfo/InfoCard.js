import { useState } from "react";
import style from "./InfoCard.module.css";
import taxco from "../../../Images/Taxko.jpg";
function InfoCard(props) {

  function handleClick(area){
    console.log(area);
    switch(area){
      case "Area 1":
      window.open('https://www.saraltaxoffice.com/', '_blank');  
      break;
      case "Area 2":
      window.open('https://cleartax.in/', '_blank');  
      break;
      case "Area 3":
      window.open('https://eztax.in/', '_blank');  
      break;
      case "Area 4":
      window.open('https://taxcloudindia.com/', '_blank');  
      break;
      case "Area 5":
      window.open('https://www.taxmann.com/', '_blank');  
      break;
      case "Area 6":
      window.open('https://www.taxpoint.in/', '_blank');  
      break;
      case "Area 7":
      window.open('https://www.electrocom.in/easyoffice.htm', '_blank');  
      break;
      case "Area 8":
      window.open('https://www.winmansoftware.com/', '_blank');  
      break;
      case "Area 9":
      window.open('', '_blank');  
      break;
      case "Area 10":
      window.open('https://tax2win.in/', '_blank');  
      break;
      default:break;
    }
  }
  return (
    <div className={`${style.outercontainer}`}>
      <section className={`${style.about_section} ${style.section}`}>
        <div className={`${style.container}`}>
          <div className="row">
            <div
              className={`${style.content_column} col-lg-6 col-md-12 col-sm-12 order-2`}
            >
              <div className={`${style.inner_column}`}>
                <div className={`${style.sec_title}`}>
                  <span className={`${style.title}`}>{props.info.title}</span>
                  <h2>{props.info.subtitle2}</h2>
                </div>
                {props.info.information.map((item) => (
                  <div className={`${style.text}`}>{item}</div>
                ))}
                {/* <div className={`${style.text}`}>
              1. Cloud-Based Platform:  Our platform is entirely cloud-based, 
        which means you no longer need to worry about cumbersome installations 
        or complex setups. TAXCO eliminates the need for local installations and providing you with the flexibility 
        to access your data from any device with an internet connection.
              </div>
              <div className={`${style.text}`}>
              2. User-Friendly Dashboard: We understand that simplicity is key when it comes to technology.
         That's why we've designed an intuitive and user-friendly dashboard 
         that allows users of all levels of technical expertise to navigate and utilize our platform seamlessly.
              </div> */}
                <div className={`${style.btn_box}`}>
                  <p
                    onClick={props.handlePanel}
                    className={`${style.theme_btn} ${style.btn_style_one}`}
                  >
                    HOME
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${style.image_column} col-lg-6 col-md-12 col-sm-12`}
            >
              <div className={`${style.inner_column} wow fadeInLeft`}>
                {/* <div className={`${style.author_desc}`}>
                <h2>TAXCO for Tax Professionals</h2>
                <span>Top Post-Filling Platform</span>
              </div> */}
                <figure className={`${style.image_1}`}>
                  {/* <a
                  href="#"
                  className={`${style.lightbox_image}`}
                  data-fancybox="images"
                > */}
                  <img
                    className={style.img}
                    title="Rahul Kumar Yadav"
                    src={taxco}
                    alt=""
                  />
                  {/* </a> */}
                </figure>
              </div>
            </div>
          </div>
          <div className={`${style.sec_title}`}>
            <span className={`${style.title}`}>Who we are ?</span>
            <h2>We are Post-Tax-Filing Platform</h2>
          </div>
          <div className={`${style.text}`}>
        
          </div>
          {/* <div className={`${style.text}`}>
          We take a small toolkit here and ride it well so that it is fit for
          your use. One who performs well and looks even better.
        </div> */}
        </div>
      </section>
    </div>
  );
}

export default InfoCard;
