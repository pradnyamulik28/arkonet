import style from "./Parallax.module.css"

function Parallax(){
return (

    <div className={style.parallaxcontainer}>
    
    <div className={style.bgimg1}>
      <div className={style.caption}>
      <span className={style.border}>WELLCOME TO TAXKO</span>
      </div>
    </div>
    
    <div className={style.intro}>
      <h3 style={{"textAlign":"center","fontWeight":"bold"}}>Introduction</h3>
      <p>TAXKO is a flagship product designed and developed by ARKONET. ARKONET is a technology company that builds trusted, useful and insightful platforms for clients in India and international regions. ARKONET is the leading and most trusted IT service provider in India.</p>

        <p>TAXKO is the best cloud based storage platform for all corporates and individuals to access and manage Tax Filing data. We have a vision of developing software to make a tax practising professional's life easier, like Chartered Accountant/ Tax /Consultant/ Tax Return Preparer/ Accountant/ Certified Consultants/ Advocate or any person who files Income Tax Return, GST or any other indirect tax practice in India and abroad. Our mission is to simplify finances, save money and time for millions of Indian tax professionals along with associated businesses and people.</p>
    </div>
    
    <div className={style.bgimg2}>
      <div className={style.caption}>
      <span className={style.border} style={{"background-color":"transparent","font-size":"25px","color": "#000","fontWeight":"700"}}>OUR MISSION</span>
      </div>
    </div>
    
    <div style={{"position":"relative"}}>
      <div className={style.scroll}>
      <p>Our mission is to simplify finances, save money and time for millions of Indian tax professionals alongwith associated businesses and people. TAXKO is a flagship product designed and developed by ARKONET. ARKONET is a technology company that builds trusted, useful and insightful platforms for clients in India and international regions. ARKONET is a leading and most trusted IT service provider company in India.</p>
      </div>
    </div>
    
    <div className={style.bgimg3}>
      <div className={style.caption}>
      <span className={style.border} style={{"background-color":"transparent","font-size":"25px","color": "#f0f0f0","fontWeight":"700"}}>OUR VISION</span>
      </div>
    </div>
    
    <div style={{"position":"relative"}}>
      <div className={style.scroll}>
      <p>We have vision of developing a software to make the Tax practicing professional life easier like Chartered Accountant/ Tax /Consultant/ Tax Return Preparer/ Accountant/ Certified Consultants/ Advocate or any person files Income Tax Return, GST or any other indirect tax practice in India and abroad.</p>
      </div>
    </div>
    
    <div className={style.bgimg4}>
      <div className={style.caption}>
      <span className={style.border}>FEATURES</span>
      </div>
    </div>
    
    
    </div>
)
}
export default Parallax;