import style from "./AdminDetails.module.css";

function AdminDetails(){
    return(
<div className={`${style.workport}`}>

{/* Left col starts */}
<div className={`${style.leftcol}`}>

<div className={`${style.ltop}`}>
<div className={`${style.ltopcontaint}`}>
    <h5 classname={`${style.itopheadersmall}`}>ADMIN</h5>
    <h6 classname={`${style.itoppara}`}>Total Admin</h6>
    <h3 classname={`${style.itopheaderlarge}`}>789</h3>
    <p classname={`${style.itopshrink}`}>As on date</p>
</div>
</div>

<div className={`${style.lbottom}`}>
<div className={`${style.lbotcontaint}`}>
<div className={`${style.rt}`} ><h2 className={`${style.lboth2}`}>ADMIN DETAILS</h2></div>
    <div className={`${style.tabular}`}>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><h4>Admin Details</h4></div>
            <div className={`${style.value}`}></div>
        </div>

        
        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Chartered Account Details</p></div>
            <div className={`${style.value}`}><p>345</p></div>
        </div>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Tax Consultant</p></div>
            <div className={`${style.value}`}><p>276</p></div>
        </div>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Tax Return Preparer</p></div>
            <div className={`${style.value}`}><p>65</p></div>
        </div>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Accountant</p></div>
            <div className={`${style.value}`}><p>44</p></div>
        </div>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Certified Consultant</p></div>
            <div className={`${style.value}`}><p>9</p></div>
        </div>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Advocate</p></div>
            <div className={`${style.value}`}><p>29</p></div>
        </div>

        <div className={`${style.sinrow}`}>
            <div className={`${style.title}`}><p>Other</p></div>
            <div className={`${style.value}`}><p>19</p></div>
        </div>


    </div>
</div>
</div>
</div>
{/* Left Col ends */}



{/* Right Col starts */}
<div className={`${style.rightcol}`}>

<div className={`${style.Rtop}`}>
    <div className={`${style.rtt}`}>
    <h5 classname={`${style.client}`}>CLIENT</h5>
    </div>
    <div className={`${style.rtm}`}>
        <div className={`${style.rtabular}`} >
            <div className={`${style.rtcol1}`}>
                <div className={`${style.title}`}><p className={`${style.pb}`}>Total Client</p></div>
                <div className={`${style.value}`}><p className={`${style.pv}`}>3,52,259</p></div>
            </div>
            <div className={`${style.rtcol2}`}>
            <div className={`${style.title}`}><p className={`${style.pg}`}>Income Tax</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>3,05,415</p></div>
            </div>
            <div className={`${style.rtcol3}`}>
            <div className={`${style.title}`}><p className={`${style.pbl}`}>GST</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>91,691</p></div>
            </div>
        </div>
    </div>
    <div className={`${style.rtb}`}><p>As on Date</p></div>
</div>



{/* .......................... */}
<div className={`${style.Rmiddle}`}>
    
<div className={`${style.rmt}`}>
    <h5 classname={`${style.rtoph5}`}>SUBSCRIPTION</h5>
    </div>
    <div className={`${style.rmm}`}>
        <div className={`${style.rtabular}`} >
            <div className={`${style.rmcol1}`}>
                <div className={`${style.title}`}><p className={`${style.p}`}>Today</p></div>
                <div className={`${style.value}`}><p className={`${style.pv}`}>9</p></div>
            </div>
            <div className={`${style.rmcol2}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>Yestrday</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>15</p></div>
            </div>
            <div className={`${style.rmcol3}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>Week</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>46</p></div>
            </div>
        </div>
    </div>

    <div className={`${style.rmb}`}>
        <div className={`${style.rtabular}`} >
            <div className={`${style.rmcol1}`}>
                <div className={`${style.title}`}><p className={`${style.p}`}>2023-24</p></div>
                <div className={`${style.value}`}><p className={`${style.pv}`}>318</p></div>
            </div>
            <div className={`${style.rmcol2}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>2022-23</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>1069</p></div>
            </div>
        </div>
    </div>


</div>
{/* .......................... */}



<div className={`${style.Rbottom}`}>
<div className={`${style.rbt}`}>
    <h5 classname={`${style.renewal}`}>RENEWAL</h5>
    </div>

<div className={`${style.rbm}`}>
        <div className={`${style.rtabular}`} >
            <div className={`${style.rbcol1}`}>
                <div className={`${style.title}`}><p className={`${style.p}`}>Today</p></div>
                <div className={`${style.value}`}><p className={`${style.pvr}`}>3</p></div>
            </div>
            <div className={`${style.rbcol2}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>Yestrday</p></div>
            <div className={`${style.value}`}><p className={`${style.pvdr}`}>6</p></div>
            </div>
            <div className={`${style.rbcol3}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>Week</p></div>
            <div className={`${style.value}`}><p className={`${style.pvy}`}>23</p></div>
            </div>
        </div>
    </div>

    <div className={`${style.rbb}`}>
        <div className={`${style.rtabular}`} >
            <div className={`${style.rbcol1}`}>
                <div className={`${style.title}`}><p className={`${style.p}`}>Month</p></div>
                <div className={`${style.value}`}><p className={`${style.pv}`}>64</p></div>
            </div>
            <div className={`${style.rbcol2}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>3 Months</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>248</p></div>
            </div>
            <div className={`${style.rbcol3}`}>
            <div className={`${style.title}`}><p className={`${style.p}`}>6 Months</p></div>
            <div className={`${style.value}`}><p className={`${style.pv}`}>411</p></div>
            </div>
        </div>
    </div>

</div>

</div>
{/* Right Col ends */}

{/* className={`${style.name}`} */}

</div>

    );
}

export default AdminDetails;