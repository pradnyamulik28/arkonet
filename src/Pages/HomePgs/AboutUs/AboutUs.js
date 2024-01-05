import { Link } from "react-router-dom";
import style from "./AboutUs.module.css";
import img1 from "../../../Images/introduction.jpg";
import img2 from "../../../Images/save.jpg";
import img3 from "../../../Images/company.jpg";
import img4 from "../../../Images/flow_chart1.jpg";

import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function AboutUs(props) {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const images=[
    img1,
    img2,
    img3,
    img4
  ]

  const [isPaused, setPaused] = useState(false);
  const settings = {
    pauseOnHover: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: !isPaused,
    speed: 12000,
    autoplaySpeed: 0,
    cssEase: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  
  return (
    <div className={style.about}>
      <section
        className={`${style.breadcrumbs_custom} ${style.bgimage} ${style.section}`}
        data-preset='{"title":"Breadcrumbs","category":"header","reload":false,"id":"breadcrumbs"}'
      >
        <div className={`container ${style.container}`}>
          <div className="breadcrumbs-wrapper">
            <h2 className={style.breadcrumbs_custom_title}>About Us</h2>
            <ul className={style.breadcrumbs_custom_path}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className={style.active}>About Us</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={`row justify-content-center mt-3 mb-3`}>
        
          <div className={`${style.carousel} mb-5`}>
            <Slider {...settings}>
              {images.map((img) => {
                return <img src={img} alt=""/>;
              })}
            </Slider>
          </div>
          <div className={style.carousel}>
          <div className={style.sec_title}>
              <h2>
                All new cloud based storage platform for corporate &amp;
                individual to manage their tax filling data
              </h2>
              <hr className={style.hr} />
            </div>
            <div className={style.text}>
              <p>
                TAXKO stands out as a premier cloud-based storage platform,
                offering an efficient way for both corporate entities and
                individuals to access and manage their tax filing data.
                Developed by ARKONET, a trusted technology company, TAXKO
                emerges as a flagship product designed to simplify the lives of
                tax practitioners, including Chartered Accountants, Tax
                Consultants, Tax Return Preparers, Accountants, Certified
                Consultants, Advocates, and anyone engaged in income tax return,
                GST, or other indirect tax practices in India and abroad.
              </p>
            </div>

            <div className={`${style.text} mt-3`}>
                  
                    <p>
                      Pre-filing of tax returns like income tax returns (direct
                      tax) and Goods & Service Tax (GST) (Indirect Tax) are
                      primary taxation segments in India.
                    
                      Post-filing of tax returns is considered in customer
                      service. Managing client data, filed documents, handover
                      of filed documents to the client, maintaining filing
                      status, tracking of filed return status for clients, etc.
                      But currently, there are no players in this segment.
                    
                      TAXKO is going to bridge this gap by providing a platform
                      that will connect tax professionals with their clients.
                    </p>
                  
                </div>
        </div>

        
      </section>

      <section className={style.about_section}>
        

        <div className="container mt-3 mb-3">
          
        </div>
      </section>

      <section class={style.team_section1}>
        <div class={`${style.core_value} container`}>
          <div class={`row p1 ${style.boxrow2}`}>
            <div class="col-md-6 col-lg-6">
              <div class={`${style.block2}`}>
                <div class={style.text}>
                  <h4> Core Values</h4>
                  <hr />
                  <p>
                    <span className={style.tag}>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Innovation:{" "}
                    </span>{" "}
                    Constantly innovating to enhance platforms and make tax
                    management more efficient.
                  </p>
                  <p>
                    <span className={style.tag}>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Reliability:{" "}
                    </span>
                    Building TAXKO on a foundation of trust, offering reliable
                    solutions for tax practitioners and businesses.
                  </p>
                  <p>
                    <span className={style.tag}>
                      {" "}
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Accessibility:{" "}
                    </span>{" "}
                    Ensuring cloud-based applications for accessibility anytime,
                    anywhere, fostering a seamless user experience.
                  </p>
                  <p>
                    <span className={style.tag}>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Collaboration:{" "}
                    </span>{" "}
                    Believing in collaborative growth, working closely with
                    users to meet evolving tax management needs.
                  </p>

                  <p></p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <div class={`${style.block2} mob-top`}>
                <div class={style.text}>
                  <h4>Unique Selling Proposition (USP)</h4>
                  <hr />
                  <p>
                    TAXKO stands out as a premier cloud-based storage platform
                    with the following key features:
                  </p>
                  <p></p>
                  <p>
                    <span className={style.tag}>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Post-Filing Customer Service:{" "}
                    </span>{" "}
                    Recognizing the importance of post-filing in customer
                    service, TAXKO excels in the tax filing landscape.
                  </p>
                  <p>
                    <span className={style.tag}>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Budget-Friendly Packages:{" "}
                    </span>{" "}
                    Providing a range of cost-effective packages, catering to
                    diverse user needs.
                  </p>
                  <p>
                    <span className={style.tag}>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Exceptional Service:{" "}
                    </span>{" "}
                    Once part of the TAXKO system, users can expect unwavering
                    support and an exceptional experience.
                  </p>

                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AboutUs;
