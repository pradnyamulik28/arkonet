import style from "./InvestNowPage.module.css";
import HI from "../../../Images/cards.png";
import LI from "../../../Images/coininhand.png";
import MF from "../../../Images/percentageraise.png";
import NPS from "../../../Images/sackinhand.png";
import FD from "../../../Images/ticksack.png";
import { Link, useNavigate } from "react-router-dom";
import AdDisplay from "../../../components/AdDisplay/AdDisplay"
import Swal from "sweetalert2";


const InvestNow = () => {
  const subscription_status=localStorage.getItem('subscription_status');

  const Navigate = useNavigate();

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');


  const Invest_Now = [{
    img_src: FD,
    img_alt: "fixed_deposit_",
    text: "Fixed Deposit",
    classname: style.fd
  },
  {
    img_src: NPS,
    img_alt: "national_pension_scheme",
    text: "National Pension Scheme",
    classname: style.nps
  },
  {
    img_src: MF,
    img_alt: "mutual_fund",
    text: "Mutual Fund",
    classname: style.mf
  },
  {
    img_src: LI,
    img_alt: "life_insurance",
    text: "Life Insurance",
    classname: style.li
  },
  {
    img_src: HI,
    img_alt: "health_insurance",
    text: "Health Insurance",
    classname: style.hi
  }
  ]


  const Goto = (alt_name, title) => {
//     if(subscription_status==="grace_period")
//     {
//       Swal.fire({
//         icon:"error",
//         text:"Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."})
        
//     }

//     else if(subscription_status==="not_subscribed")
//     {
//       Swal.fire({
//         icon:"error",
//         text:"Subscribe to avail this service."})
        
//     }
// else{
//     Navigate(`investNowview/${alt_name}/${title}`, {
//       state: {Investnowtitle: title,},
//     })
//   }
Navigate(`investNowview/${alt_name}/${title}`, {
  state: {
    Investnowtitle: title,
   
  },
})

  }

  return (
    <div className={`${style.row}`}>
      {/* Background */}


      {/* Mobile Viewport */}
      <div
        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 ${style.mobileport}`}
      >
        {/* Headbar Starts*/}
        {/* <div className={`${style.headerbar}`}>
          <div className={`${style.leftear}`}>
            <Link
              to=""
              state={{ clientid: localStorage.getItem("clientId") }}
              style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
            >

              <i className="fa-solid fa-angle-left"></i> &nbsp;&nbsp;InvestNow
            </Link>
            <NotificationBell />
            no_of_notifications={no_of_notifications}
          </div>
        </div> */}
        {/* Headbar Ends ....................................................................................................... */}

        {/* Ad Starts */}
        <AdDisplay />
        {/* Ad Ends......................................................................................................... */}

        <div className={`row ${style.components}`}>
          {Invest_Now.map((item) => {
            return (
              <div
                className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${style.cards}`}
                id={item.text}
              >
                <a href="##" className={item.classname}>
                  <img src={item.img_src} alt={item.img_alt} onClick={() => Goto(item.img_alt, item.text)} />
                  <p>{item.text} </p>
                </a>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default InvestNow;
