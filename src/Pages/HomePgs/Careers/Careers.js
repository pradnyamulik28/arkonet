import style from "./Careers.module.css";
import img1 from "../../../Images/distributor.jpeg";
import img2 from "../../../Images/Benefits.jpeg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import SaleApplicationForm from "../SaleApplicationForm/SaleApplicationForm";

function Careers(props) {
  useEffect(()=>{
    window.scrollTo(0,0)
    
  },[])
  return (
    <div className={style.about}>
      <section
        class={`${style.breadcrumbs_custom} ${style.bgimage} ${style.section}`}
        data-preset='{"title":"Breadcrumbs","category":"header","reload":false,"id":"breadcrumbs"}'
      >
        <div class={`container ${style.container}`}>
          <div class="breadcrumbs-wrapper">
            <h2 class={style.breadcrumbs_custom_title}>Careers at TAXKO</h2>
            <ul class={style.breadcrumbs_custom_path}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li class={style.active}>Careers</li>
            </ul>
          </div>
        </div>
      </section>
      <section style={{"padding":"10px"}}>
        <div className="container mt-3 mb-3">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5">
              <div className="col-12">
                <img
                  src={img1}
                  style={{ width: "100%", borderRadius: "10px","margin":"5px 0" }}
                  alt=""
                />
                <img
                  src={img2}
                  style={{ width: "100%", borderRadius: "10px" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7">
              <div className={`row ${style.career}`}>
                <h2>Joining our team means...</h2>
                <p>
                  Becoming part of a success-driven culture that rewards
                  ambition, fosters collaboration, and celebrates achievements.
                </p>

                <h2>Opportunities Await You:</h2>
                <ul>
                  <li>
                    <strong>Career Options :</strong> Join us as a Sales Manager
                    and unlock the potential for unlimited earnings with a fixed
                    income plus enticing incentives based on achieving targets.
                    Alternatively, become a Distributor and earn a percentage on
                    every sale you generate. Choose the path that suits your
                    ambition and enjoy a rewarding journey with us!
                  </li>

                  <li>
                    <strong>Lucrative Compensation :</strong> We believe in
                    recognizing and rewarding your hard work. Our competitive
                    compensation packages and attractive commission structures
                    ensure that your efforts translate into financial success.
                  </li>

                  <li>
                    <strong>Autonomy and Flexibility:</strong> Enjoy the freedom
                    to shape your success. We believe in empowering our team
                    members with autonomy and flexibility, allowing you to
                    unleash your full potential.
                  </li>
                </ul>

                <p>
                  Embark on a rewarding journey with TAXKO. Be part of a team
                  that values innovation, integrity, and results. Elevate your
                  career in sales and distribution with us.
                </p>

                <p>
                  Ready to take the next step?{" "}
                  <Link
                    to="/distributor/distributor_reg"
                    className={`${style.cta_button} ${style.link}`}
                  >
                    Become Distributor
                  </Link>{" "}
                  and unleash your potential with TAXKO!
                </p>

                
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={style.section2}>
          <div className={`${style.joinus} mt-3 mb-3`}>
            <h2>Are you ready to join sales team ?</h2>
            <div className={style.loginbtn} data-toggle="modal" data-target="#salemanagerform">Upload Resume/CV</div>
          </div>
        </div>
      </section>
      
      <section>
<SaleApplicationForm />

      </section>
    </div>
  );
}
export default Careers;
