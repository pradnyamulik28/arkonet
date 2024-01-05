import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import NavbarComponent from "./NavbarComponent/NavbarComponent";
import Footer from "./Footer/Footer";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Careers from "./Careers/Careers";
import LandingPage from "./LandingPage/LandingPage";
import HomePgClientRegister from "./HomePgClientRegister/HomePgClientRegister";
import ChatBot from "../../components/ChatBot/ChatBot"
import WhatsappChat from "../../components/WhatsappChat/WhatsappChat";
import style from "./HomeRoute.module.css"

function HomeRoute() {
  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const subscriptionRef = useRef(null);
  const presentationRef = useRef(null);
  function openBookDemoForm() {
    window.open("https://share.hsforms.com/1Q_HmHyIsQWeBF1G1KQ3kNQqcgs4", '_blank');
  }
  return (

    <>
      <NavbarComponent scrollToRef={{ homeRef, featureRef,subscriptionRef,presentationRef }} />
      <section>
        <HomePgClientRegister />
      </section>
      <section style={{ "marginTop": "5rem" }}>
      <Routes>         
          <Route path="" element={<LandingPage />} />
          <Route path="/features" element={<LandingPage />} />
          <Route path="/subscription" element={<LandingPage />} />
          <Route path="/products" element={<LandingPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Career" element={<Careers />} />
        </Routes>
        
      </section>
      <section>
      <ChatBot />
        <WhatsappChat />
      <div>
          <p className={style.book_now} onClick={openBookDemoForm}>
            Book Demo
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default HomeRoute;
