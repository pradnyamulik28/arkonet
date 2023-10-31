import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";

import HomePage from "./HomePage/HomePage"
import SubscriptionPlan from "../AdminPgs/SubscriptionPlan/SubscriptionPlan";
import ContactUs from "./ContactUs/ContactUs";
import Konwledge from "./Knowledge/Knowledge";

import style from "./HomeRoute.module.css";
import arkpnet from "../../Images/Arkonet.jpg";
import taxko from "../../Images/Taxko.jpg";

import ClientAccount from "./ClientAccount/ClientAccount";
import Registration from "../AdminPgs/Registration/Registration";
import InfoCard from "./InfoCard/InfoCard";
import DemoVideo from "./DemoVideo/DemoVideo";
import Presentation from "./Presentation/Presentation";


function HomeRoute() {
  const navigate = useNavigate();

  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const subscriptionRef = useRef(null);
  const contactRef = useRef(null);
  const sliderRef = useRef(null);
  const videoRef = useRef(null);
  const presentationRef = useRef(null);

  const [isPanelActive, setIsPanelActive] = useState(false);

  const [slideInformation, setSlideInformation] = useState(null);

  const handleClick = (id, slideInfo) => {
    setIsPanelActive(false);
    switch (id) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "feature":
        featureRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "subscribe":
        subscriptionRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "demovideo":
        videoRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "abouttaxco":
        presentationRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "slider":
        console.log(slideInfo);
        sliderRef.current?.scrollIntoView({ behavior: "smooth" });
        setSlideInformation(slideInfo);
        setIsPanelActive(true);
        break;
      default:
        break;
    }

    // ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  function handlePanel() {
    setIsPanelActive(!isPanelActive);
  }
  return (
    <>
      <div className={` ${style.mainrow}`}>
        <div className={`${style.header}`}>
          <div className={`${style.leftyear}`}>
            <img src={taxko} alt="" />
          </div>

          <div className={`${style.rightear}`}>
            <div className={`${style.righteartop} row`}>
              <div className="col-4">
                <h4 className={`${style.h4}`}>
                  LOGIN
                  <i
                    class="fa-solid fa-caret-right"
                    style={{ color: "#a0a7af" }}
                  ></i>
                </h4>
              </div>
              <div className="col-4">
                <button
                  className={`${style.grey}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin");
                  }}
                >
                  <Link>TAX PROFESSIONAL</Link>
                </button>
              </div>
              <div className="col-4">
                <button
                  className={`${style.yellow}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/client");
                  }}
                >
                  <Link>TAX PAYER</Link>
                </button>
              </div>
            </div>

            <div className={`${style.rightearbottom}`}>
              <div className="col-4">
                <h6 className={`${style.h6}`}>
                  New on TAXKO?
                  <i
                    class="fa-solid fa-caret-right"
                    style={{ color: "#a0a7af" }}
                  ></i>
                </h6>
              </div>
              <div className="col-4">
                <button className={`${style.grey}`}>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("admin/User_registration");
                    }}
                  >
                    CREATE NEW ACCOUNT
                  </Link>
                </button>
              </div>
              <div className="col-4">
                <ClientAccount />
              </div>
            </div>
          </div>
        </div>

        <div className={`${style.neckbar}`}>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                handleClick("home");
              }}
              id="home"
            >
              HOME
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                handleClick("feature");
              }}
              id="feature"
            >
              FEATURES
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                handleClick("subscribe");
              }}
              id="subscribe"
            >
              SUBSCRIPTION PLAN
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.dropdown}`}>
            <a href="##" className={`${style.dropbtn} ${style.neckancher}`}>
              PRODUCTS
            </a>
            <div className={`${style.dropdowncontent} ${style.dropdown1}`}>
              <Link onClick={(e) => {
                    handleClick("abouttaxco");
                  }}
                  id="abouttaxco"
                
                className={`${style.dropbtn1} ${style.neckancher} ${style.acherline}`}
              >
                TAXKO
              </Link>
              <a
                href="##"
                className={`${style.dropbtn1} ${style.neckancher} ${style.acherline}`}
              >
                TAXKO ENTERPRISE
              </a>
              <Link className={`${style.ddancher}`}>REVIEWS</Link>
              
              
              {/* <div className={`${style.dropdowncontent2}`}></div> */}
            </div>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                handleClick("demovideo");
              }}
              id="demovideo"
            >
              DEMO
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                handleClick("contact");
              }}
              id="contact"
            >
              CONTACT US
            </Link>
          </div>
        </div>

        {!isPanelActive && (
          <>
            <HomePage />
            <br />
            <div ref={featureRef}>
              <Konwledge handleScroll={handleClick} />
            </div>
            <br />
            <div ref={subscriptionRef}>
              <SubscriptionPlan />
            </div>
            <br />
            <div ref={videoRef}>
              <DemoVideo />
            </div>
            <br />
            <div ref={presentationRef}>
              <Presentation />
            </div>
            <br />
            <div ref={contactRef}>
              <ContactUs />
            </div>
            <br />
          </>
        )}
        {isPanelActive && slideInformation && (
          <div ref={sliderRef}>
            <InfoCard
              handlePanel={handlePanel}
              isClose={isPanelActive}
              info={slideInformation}
            />
          </div>
        )}

        <Routes>
          <Route path="admin/User_registration" element={<Registration />} />
        </Routes>

        <div className={`${style.copyright}`}>
          <div className={`${style.dev}`}>
            <p>Developed & Managed By</p>
          </div>
          <div className={`${style.logoimage}`}>
            <img src={arkpnet} alt="" />
          </div>
          <div className={`${style.version}`}>
            <p>Version 1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeRoute;
