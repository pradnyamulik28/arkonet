
import style from "./GstFileView.module.css";
import pdf from "../../../Images/pdf.png";
import { Link, useLocation,useNavigate } from "react-router-dom";

function GstFileView() {

  const year=useLocation().state.year;
  const gstCategory=useLocation().state.gstCategory;
  const navigate=useNavigate();
  return (
<div className={`row ${style.row1}`}>
<div className={`${style.allport}`}>

{/* Headbar Starts*/}
<div className={`${style.headerbar}`}>
<div className={`${style.leftear}`}>
<Link onClick={(e) => {
                          e.preventDefault();
                          navigate(-1,{state:{year:year}});
                        }} style={{ fontSize: "2rem" , margin: "0.5rem", color: "black"}}> 
<i class="fa-solid fa-angle-left" style={{ fontSize: "1.5rem" , color: "grey"}} ></i> &nbsp;GST</Link>
<h6 style={{ color: "#596fa4", marginLeft: "2.5rem"}}>{gstCategory}</h6>

</div>
<div className={`${style.rightear}`}>
<h4>
{/* <img src={fd} alt="fd"  style={{ fontSize: "2rem",width: "2rem" }} /> */}
</h4>
</div>
</div>
{/* Headbar Ends ....................................................................................................... */}

{/* ABD Starts*/}
<div className={`${style.abd}`}>
<div className={`${style.leftbear}`}>
{/* <p className={`${style.p3}`}>My Folders</p> */}
</div>
<div className={`${style.rightbear}`}>
<div className={`${style.licon}`}>
<button type="button" class={` ${style.btn}`}>Select</button>
</div>
<div className={`${style.ricon}`}>
<h2><i class="fa-solid fa-share-from-square"></i></h2>
</div>
</div>
</div>
{/* ABD Ends ....................................................................................................... */}


{/* Cards Starts*/}
<div className={`row ${style.row2}`}>

<div className={`col-12 ${style.doc1}`}>
<img src={pdf} className={`${style.pdf}`} alt="" />
</div>

<div className={`col-12 ${style.doc2}`}>
<img src={pdf} className={`${style.pdf}`} alt="" />
</div>


</div>
{/* Cards Ends ....................................................................................................... */}


</div>
</div>

  );
}

export default GstFileView;
