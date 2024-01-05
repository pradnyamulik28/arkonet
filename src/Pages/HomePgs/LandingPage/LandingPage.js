import Cards from "../Cards/Cards";
import Hero from "../Hero/Hero";
import Parallax from "../Parallax/Parallax";
import Presentation from "../Presentation/Presentation";
import SubsciptionPlans from "../SubsciptionPlans/SubsciptionPlans";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();

  useEffect(() => {
    
    // console.log(location.pathname);
    switch (location.pathname) {
      case "/":
        homeRef.current.scrollIntoView({ behavior: "smooth", block: 'start'  });
        
        break;
      case "/features":
        const targetPosition = featureRef.current.offsetTop - 15 ;
        //const targetPosition = contentRef.current.offsetTop - menuRef.current.clientHeight;

        featureRef.current.scrollIntoView({ behavior: "smooth", top: targetPosition,  });
        
        break;
      case "/subscription":
        subscriptionRef.current.scrollIntoView({ behavior: "smooth", block: 'start'  });
        break;
      case "/products":
        presentationRef.current.scrollIntoView({ behavior: "smooth", block: 'start'  });
        break;

      default:
     
    }
  }, [location]);

  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const subscriptionRef = useRef(null);
  const presentationRef = useRef(null);

  return (
    <>
      <section ref={homeRef}><Hero /></section>
      <section ><Parallax /></section>
      <section ref={featureRef}><Cards /></section>
      <section ref={presentationRef}><Presentation /></section>
      <section ref={subscriptionRef}><SubsciptionPlans /></section>
    </>
  );
}
export default LandingPage;
