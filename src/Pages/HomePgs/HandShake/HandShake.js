
import style from "./HandShake.module.css"
import handshake from "../../../Images/HandShake.png" 
import { Link } from "react-router-dom";
function HandShake()
{return(<div className={`  ${style.handshakemaindiv}`}>

<div className={` row ${style.anchermaindiv}`}>
  <div className={` col-5 ${style.ancherdiv1}`} ><Link to="/careers">‎  ‎ ‎ ‎ ‎‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ </Link></div>
  <div className={` col-2 ${style.ancherdivnull}`} ></div>
  <div  className={` col-5 ${style.ancherdiv2}`} ><Link to="/careers">‎ ‎ ‎ ‎‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ </Link></div>
  </div>

<div className={` row ${style.hsimgdiv}`}>
  <img src={handshake} alt="" className={`${style.handshakeimg}`} />
</div>



</div>)}
export default HandShake;