import { useState } from "react";
import style from "./InfoCard.module.css";
import taxco from "../../../Images/Taxko.jpg";
import flow_chart from "../../../Images/flow_chart.jpg";
function InfoCard(props) {
  return (
    <div className={`${style.outercontainer}`}>
      <section className={`${style.about_section} ${style.section}`}>
        {/* <div className={`${style.container}`}> */}
          <div className={style.row}>
            <div
              className={`${style.content_column} col-lg-6 col-md-6 col-sm-6 order-2`}
            >
              <div className={`${style.inner_column}`}>
                <div className={`${style.sec_title}`}>
                  <span className={`${style.title}`}>{props.info.title}</span>
                  <h2>{props.info.subtitle2}</h2>
                </div>
                {props.info.information.map((item) => (
                  <div className={`${style.text}`}>{item}</div>
                ))}
              
                <div className={`${style.btn_box}`}>
                  <p
                    onClick={props.handlePanel}
                    className={`${style.theme_btn} ${style.btn_style_one}`}
                  >
                    BACK
                  </p>
                </div>
              </div>
            </div>

            <div className={`${style.image_column} col-lg-6 col-md-6 col-sm-6`}>
              <div className={`${style.inner_column} wow fadeInLeft`}>
              
                <figure className={`${style.image_1}`}>
                 
                  <img className={style.img} title="" src={taxco} alt="" />
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
          <img title="" src={flow_chart} alt="" />
          </div>
        
          
        {/* </div> */}
      </section>
    </div>
  );
}

export default InfoCard;
