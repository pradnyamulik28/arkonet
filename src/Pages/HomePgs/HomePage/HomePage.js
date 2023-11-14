
import style from "./HomePage.module.css";
import company from "../../../Images/company.jpg";
import save from "../../../Images/save.jpg";
import introduction from "../../../Images/introduction.jpg";

function HomePage() {
    
  return (
    <div className={style.container}>
    <div className={` ${style.mainrow}`}>
 
     <div id="carouselExampleControls" className={`carousel slide ${style.slider} `} data-ride="carousel">
   <div class={`carousel-inner ${style.fadinganime}`}>
     <div class="carousel-item active">
       <img class="d-block w-100" src={introduction} alt="First slide"/>
     </div>
     <div class="carousel-item">
       <img class="d-block w-100" src={save} alt="Second slide"/>
     </div>
     <div class="carousel-item">
       <img class="d-block w-100" src={company} alt="Third slide"/>
     </div>
   </div>
   <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="sr-only">Previous</span>
   </a>
   <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="sr-only">Next</span>
   </a>
 </div>
 
 
     <div className={`${style.para}`}>
     <p className={`${style.p}`}>
     TAXKO is a flagship product designed and developed by ARKONET. ARKONET is a technology company that builds trusted, useful and insightful platforms for clients in India and international regions. 
     ARKONET is the leading and most trusted IT service provider in India.
     </p>
       <p className={`${style.p}`}>
       TAXKO is the best cloud based storage platform for all corporates and individuals to access and manage Tax Filing data. 
       We have a vision of developing software to make a tax practising professional's life easier, 
       like Chartered Accountant/ Tax /Consultant/ Tax Return Preparer/ Accountant/ Certified Consultants/ Advocate or any person who files Income Tax Return, 
       GST or any other indirect tax practice in India and abroad. Our mission is to simplify finances, save money and time for millions of Indian tax professionals along with associated businesses and people.  </p>
     </div>    
     
     
     
     </div>
     </div>
  );
}
export default HomePage;
