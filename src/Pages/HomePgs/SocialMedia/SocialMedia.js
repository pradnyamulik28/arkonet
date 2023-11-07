import style from "./SocialMedia.module.css"
function SocialMedia(){

   function socialonClick(e){

    console.log(e.target.id)
    e.preventDefault();
    switch(e.target.id){
      case "facebook":
       window.open("https://www.facebook.com/arkonetglobal", '_blank');  
      break;
      case "instagram":
       window.open("https://www.instagram.com/arkonetglobal/?igshid=YmMyMTA2M2Y%3D", '_blank');  
      break;
      case "linkedin":
       window.open("https://www.linkedin.com/company/arkonetglobal/", '_blank');  
      break;
      case "twitter":
       window.open("https://twitter.com/arkonetglobal?s=11&t=_tXcbzY9oJ0xsskd5YCcMw", '_blank');  
      break;
      default:break;
    }
   }

return(
    <div className={style.social_media}>
         <h6 >Follow us on</h6>
    <div class={style.icons_container}>           

            <div className={`${style.icon} ${style.facebook}`} id="facebook">
              <div class={`${style.tooltip}`}>Facebook</div>              
              <span>
                <i id="facebook" className="fa-brands fa-facebook-f" onClick={socialonClick}></i>
              </span>
              
            </div>

            <div className={`${style.icon} ${style.twitter}`} id="twitter">
              <div class={`${style.tooltip}`}>Twitter</div>
              
              <span>
                <i id="twitter" className="bi-twitter-x inverted" onClick={socialonClick}></i>
              </span>
              
            </div>

            <div className={`${style.icon} ${style.instagram}`} id="instagram">
              <div class={`${style.tooltip}`}>Instagram</div>
              
              <span>
                <i id="instagram" className="fa-brands fa-instagram" onClick={socialonClick}></i>
              </span>
              
            </div>

            <div className={`${style.icon} ${style.linkedin}`} id="linkedin">
              <div class={`${style.tooltip}`}>Linkedin</div>
              
              <span>
                <i id="linkedin" className="bi bi-linkedin" onClick={socialonClick}></i>
              </span>
              
            </div>

            {/* <div className={`${style.icon} ${style.youtube}`}>
              <div class={`${style.tooltip}`}>YouTube</div>
              
              <span>
                <i className="fab fa-youtube" onClick={socialonClick}></i>
              </span>
              
            </div> */}


            {/* <div className={`${style.icon} ${style.github}`}>
            <div class={`${style.tooltip}`}>
               Github
            </div>
            <span >
            <i className="fab fa-github"></i>
            </span>
            </div> */}

            
          </div>
          </div>


)
        };
        export default SocialMedia;