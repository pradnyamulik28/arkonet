import style from "./Careers.module.css";
import distributor_img from "../../../Images/distributor.jpeg";
import benefit_img from "../../../Images/Benefits.jpeg";
import { Link } from "react-router-dom";
function Careers() {
  return (
    <div className={style.outercontainer}>
      <section className={`${style.section_all}`}>
        <header className={style.header}>
          <h2>
            <i class="rating__icon rating__icon--star fa fa-star"></i>&nbsp;
            Join Our Dynamic Team at TAXKO &nbsp;
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </h2>
        </header>
        <p>
          <Link to="/distributor/" className={style.login_link}>
            Distributor? Login here
          </Link>{" "}
        </p>

        {/* <img src={distributor_img} alt="distributor_img" /> */}

        <div className={` ${style.mainrow}`}>
          <div
            id="carouselExampleControls"
            className={`carousel slide ${style.slider} `}
            data-ride="carousel"
          >
            <div class={`carousel-inner ${style.fadinganime}`}>
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src={distributor_img}
                  alt="First slide"
                />
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src={benefit_img}
                  alt="Second slide"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <h2>Joining our team means...</h2>
        <p>
          Becoming part of a success-driven culture that rewards ambition,
          fosters collaboration, and celebrates achievements.
        </p>

        <h2>Opportunities Await You:</h2>
        <ul>
          <li>
            <strong>Lucrative Compensation:</strong> We believe in recognizing
            and rewarding your hard work. Our competitive compensation packages
            and attractive commission structures ensure that your efforts
            translate into financial success.
          </li>

          <li>
            <strong>Autonomy and Flexibility:</strong> Enjoy the freedom to
            shape your success. We believe in empowering our team members with
            autonomy and flexibility, allowing you to unleash your full
            potential.
          </li>
        </ul>

        <p>
          Embark on a rewarding journey with TAXKO. Be part of a team that
          values innovation, integrity, and results. Elevate your career in
          sales and distribution with us.
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
        <p>
          <Link to="/distributor/" className={style.login_link}>
            Distributor? Login here
          </Link>{" "}
        </p>
      </section>
    </div>
  );
}
export default Careers;
