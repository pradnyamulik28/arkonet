import style from "./AboutUs.module.css"
import company_img from "../../../Images/company.jpg"
import OurTeam from "../OurTeam/OurTeam";
function  AboutUs(props) {
    return(
        <div className={style.outercontainer}>
        <section className={`${style.section_all}`} id="about">
             <h2 className={`${style.heading}`}>ABOUT US</h2>
      <span className={`${style.seperator}`}></span>
            <div className={style.container}>
                <div className={style.row}>
                    <div className="col-lg-12">
                        <div className={`${style.section_title_all} text-center`}>
                            <h3 className="font-weight-bold">Welcome To <span className="text-custom">TAXKO</span></h3>
                            <p className={`${style.section_subtitle} mx-auto text-muted`}>TAXKO is complete could based storage platform. 
                            <br/></p>
                            <div className="">
                                <i className=""></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`row vertical_content_manage mt-5`}>
                    <div className="col-lg-6 col-sm-12 col-s-12">
                        <div className={`${style.about_header_main} mt-3`}>
                            {/* <div className="about_icon_box">
                                <p className="text_custom font-weight-bold">TAXKO is simply dummy text</p>
                            </div> */}
                            <h4 className={`${style.about_heading} text-capitalize font-weight-bold mt-4`}>TAXKO is India's leading Filed Tax Data Management Platform</h4>
                            <p className="text-muted mt-3"><b>Our mission</b> is to simplify finances, save money and time for millions of Indian tax professionals alongwith associated businesses and people. TAXKO is a flagship product designed and developed by ARKONET. ARKONET is a technology company that builds trusted, useful and insightful platforms for clients in India and international regions. ARKONET is a leading and most trusted IT service provider company in India.</p>

                            <p className="text-muted mt-3"> <b>We have vision</b> of developing a software to make the Tax practicing professional life easier like Chartered Accountant/ Tax /Consultant/ Tax Return Preparer/ Accountant/ Certified Consultants/ Advocate or any person files Income Tax Return, GST or any other indirect tax practice in India and abroad.</p>
                            {/* <p class={style.btn_style} onClick={(e)=>{e.preventDefault()
                            props.handleScroll("ourteam");
                            }}>Our Team</p> */}
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-s-12">
                        <div className={`${style.img_about} mt-3`}>
                           <img src={company_img} alt="company_image" />
                        </div>
                    </div>
                </div>

                {/* <div className={style.ourteam}>
            <OurTeam />
            </div> */}
            </div>
        </section>
        </div>
    )
}
export default AboutUs;