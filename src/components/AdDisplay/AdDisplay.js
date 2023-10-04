import style from "./AdDisplay.module.css"
import {AdDetails} from "../../ObjData/AdDetails";
import { useEffect,useState } from "react";
export default function AdDisplay(props){

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the ad every 5 seconds (adjust as needed)
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % AdDetails.length);
    }, 4000); // 4000 milliseconds (4 seconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

return(
    <div
    className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Adport}`}
  >
    <div className={`${style.changeimage}`}>
      <img src={AdDetails[currentAdIndex].img_src} alt={!AdDetails[currentAdIndex].alt_msg?"ad_img":AdDetails[currentAdIndex].alt_msg} />
    </div>
    <div className={`${style.details}`}>
      <div className={`${style.ST}`}>
        <h5 className={`${style.blinking_text}`}>{AdDetails[currentAdIndex].ad_title}</h5>
      </div>
      <h6>Ask HOW?</h6>
      <div className={`${style.contact}`}>
        <h6>Call On</h6>
        <h6>{AdDetails[currentAdIndex].ad_phoneNo}</h6>
      </div>
    </div>
  </div>
)
}