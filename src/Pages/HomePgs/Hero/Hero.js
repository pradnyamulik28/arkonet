import style from "./Hero.module.css";
import video from "../../../Videos/bg_video.mp4";
import { Link } from "react-router-dom";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
function Hero() {
  return (
    <section
      className={`${style.section} hero-area-two rpb-50 rel z-1 ${style.scroll_sec}`}
    >
      <div className={style.homepage_header_wrapper}>
        <video autoplay="autoplay" loop="loop" muted="muted" className={style.video}>
          <source src={video} type="video/mp4" />
        </video>

        <div className={style.homepage_header_content}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              <div className={style.container}>
                <p className={style.first_line}> <span className={`${style.head_fs40}`}>
                <span className={style.string_highlight1}>TAXKO</span> Is India's Leading Filed Tax Data Management Platform<span className={style.string_highlight1}>.</span>
                  </span></p>
                <p className={style.second_line}>
                WE ARE ALL NEW&nbsp;
                  <span className={style.string_highlight}>
                    CLOUD BASED POST FILING &nbsp;
                  </span>
                  PLATFORM FOR CORPORATE & INDIVIDUAL TO MANAGE THEIR TAX FILLING DATA
                </p>
              </div>
            </div>
          </div>

          <Link className={style.section04}>Scroll</Link>
          <Link
            href="#card-section"
            className={`${style.ca3_scroll_down_link} ${style.ca3_scroll_down_arrow}`}
            data-ca3_iconfont="ETmodules"
            data-ca3_icon=""
          ></Link>
        </div>
      </div>
    </section>
  );
}
export default Hero;
