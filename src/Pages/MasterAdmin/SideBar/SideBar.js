import style from "./SideBar.module.css";
import taxko from "../../../Images/Taxko.jpg";
import arkonet from "../../../Images/Arkonet.jpg";
function SideBar(){
    return(
<div className={`${style.workport}`}>

<div className={`${style.header}`}>
    <a href="##" className={`${style.ancher}`}>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-angle-left"></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</a>
</div>


<div className={`${style.logo}`}>
<img src={taxko} alt="" />
</div>


<div className={`${style.Dashboard}`}>
<a href="##" className={`${style.active}`} ><p>Dashboard</p></a>
<a href="##" className={`${style.a1}`} ><p>Admins</p></a>
<a href="##" className={`${style.a1}`} ><p>Clients</p></a>
<a href="##" className={`${style.a1}`} ><p>Subscription</p></a>
<a href="##" className={`${style.a1}`} ><p>Invest Now</p></a>
<a href="##" className={`${style.a1}`} ><p>Service Requests</p></a>
</div>


<div className={`${style.copyright}`}>
      <div className={`${style.dev}`}><p>Developed & Managed By</p></div>
      <div className={`${style.logoimage}`}><img src={arkonet} alt="" /></div>
      <div className={`${style.version}`}><p>Version 1.0</p></div>
    </div>

</div>

    );
}

export default SideBar;