import style from "./OurTeam.module.css"
function  OurTeam() {

    const team_mem_details = [
      {
        name: "Raj Wagh",
        position: "Chief Executive Officer",
        profile_pic: "",
        twitter_id: "",
        fb_id: "",
        linkedin_id: "",
      },
      {
        name: "My Name",
        position: "Product Manager",
        profile_pic: "",
        twitter_id: "",
        fb_id: "",
        linkedin_id: "",
      },
      {
        name: "My Name",
        position: "Technical Support",
        profile_pic: "",
        twitter_id: "",
        fb_id: "",
        linkedin_id: "",
      },
    ];
    return(
       
            <div className={style.container}>
                {/* <h2 className={`${style.heading}`}>OUR TEAM</h2>
                <span className={`${style.seperator}`}></span> */}
            <div className="row mt-3 mb-2">
                {team_mem_details.map((item)=>{
                    return (
                      <div className="col-lg-4 col-sm-4">
                        <div className={`${style.about_content_box_all} mt-3`}>
                          <div className="about_detail text-center">
                            <div className={`${style.about_icon}`}>
                              <i className="fa fa-user"></i>
                            </div>
                            <h5 className="text-dark text-capitalize mt-3 font-weight-bold">
                              {item.name}
                            </h5>
                            <p className="edu_desc mt-3 mb-0 text-muted">
                              {item.position}
                            </p>
                            <div className={`${style.social_media} mt-2`}>
                              <i class="bi bi-linkedin"></i>
                              <i className="bi-twitter-x fs-1 inverted"></i>
                              <i className="fa-brands fa-facebook-f"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
                </div>
            </div>
        
    )
}
export default OurTeam;