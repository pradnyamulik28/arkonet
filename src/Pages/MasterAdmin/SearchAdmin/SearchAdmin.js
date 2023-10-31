import style from './SearchAdmin.module.css';

function SearchAdmin(){
    return(

<div className={`${style.workport}`}>

{/* Top Port Starts */}
<div className={`${style.top}`}>
    <div className={`${style.inputbox}`}>
    <div className={`${style.seachbox}`}>
    <input type="search" className={`${style.inputbox}`} placeholder='Search Admin' name="" id="" />
    </div>
    <div className={`${style.seachlogo}`}>
    <h1><i class="fa-solid fa-magnifying-glass"></i></h1>
    </div>
    </div>
</div>
{/* Top Port Ends */}

{/* Bottom Port Starts */}
<div className={`${style.bottom}`}>

<div  className={`${style.drow}`}>
    <div className={`${style.name}`} ><p className={`${style.gdtxt1}`}>Sr. No</p></div>
    <div className={`${style.name}`} ><p className={`${style.gdtxt2}`}>Admin Name</p></div>
    <div className={`${style.name}`} ><p className={`${style.gdtxt3}`}>PAN</p></div>
    <div className={`${style.name}`} ><p className={`${style.gdtxt4}`}>Mobile</p></div>
    <div className={`${style.name}`} ><p className={`${style.gdtxt5}`}>Reference</p></div>
    <div className={`${style.name}`} ><p className={`${style.gdtxt6}`}>Status</p></div>
</div>


<div  className={`${style.ddata}`}>
    <div className={`${style.name}`} ><p className={`${style.srno}`}>1</p></div>
    <div className={`${style.name}`} ><p className={`${style.an}`}>Sanjay Kapoorr</p></div>
    <div className={`${style.name}`} ><p className={`${style.pan}`}>AAAAA0000A</p></div>
    <div className={`${style.name}`} ><p className={`${style.mobile}`}>9800010000</p></div>
    <div className={`${style.name}`} ><p className={`${style.reference}`}>View</p></div>
    <div className={`${style.name}`} ><p className={`${style.status}`}><i class="fa-solid fa-circle" style={{color: "#1eff00"}}></i></p></div>
</div>

<div  className={`${style.ddata}`}>
    <div className={`${style.name}`} ><p className={`${style.srno}`}>2</p></div>
    <div className={`${style.name}`} ><p className={`${style.an}`}>Srinivas K.</p></div>
    <div className={`${style.name}`} ><p className={`${style.pan}`}>AAAAA0000A</p></div>
    <div className={`${style.name}`} ><p className={`${style.mobile}`}>9800010000</p></div>
    <div className={`${style.name}`} ><p className={`${style.reference}`}>View</p></div>
    <div className={`${style.name}`} ><p className={`${style.status}`}><i class="fa-solid fa-circle" style={{color: "#1eff00"}}></i></p></div>
</div>

<div  className={`${style.ddata}`}>
    <div className={`${style.name}`} ><p className={`${style.srno}`}>3</p></div>
    <div className={`${style.name}`} ><p className={`${style.an}`}>Chetan Agreawal</p></div>
    <div className={`${style.name}`} ><p className={`${style.pan}`}>AAAAA0000A</p></div>
    <div className={`${style.name}`} ><p className={`${style.mobile}`}>9800010000</p></div>
    <div className={`${style.name}`} ><p className={`${style.reference}`}>View</p></div>
    <div className={`${style.name}`} ><p className={`${style.status}`}><i class="fa-solid fa-circle" style={{color: "red"}}></i></p></div>
</div>

<div  className={`${style.ddata}`}>
    <div className={`${style.name}`} ><p className={`${style.srno}`}>4</p></div>
    <div className={`${style.name}`} ><p className={`${style.an}`}>Shivani Patil</p></div>
    <div className={`${style.name}`} ><p className={`${style.pan}`}>AAAAA0000A</p></div>
    <div className={`${style.name}`} ><p className={`${style.mobile}`}>9800010000</p></div>
    <div className={`${style.name}`} ><p className={`${style.reference}`}>View</p></div>
    <div className={`${style.name}`} ><p className={`${style.status}`}><i class="fa-solid fa-circle" style={{color: "#1eff00"}}></i></p></div>
</div>




</div>
{/* Bottom Port Ends */}


</div>

// {/* className={`${style.name}`} */}




    );
}

export default SearchAdmin;