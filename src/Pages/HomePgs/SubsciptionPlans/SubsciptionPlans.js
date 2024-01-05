import style from "./SubsciptionPlans.module.css"
// import "./owlstyle.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { url_ } from '../../../Config';
import { useEffect, useState } from "react";

function SubsciptionPlans()
{
    const subscriptionPlans=[
    {
      subtype:"1-250",
      subscriptionprice:"4000",
      accesscliet:250
    },
   
    
]

const [plans, setPlans] = useState([]);



  const settings = {
    
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // initialSlide: 0,

    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

useEffect(()=>{
  getSubscriptionPlan()
},[])

  async function getSubscriptionPlan() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(`${url_}/subscriptionPacks`, requestOptions);
      const result = await response.json();
      if (response.status === 200) {
        
       
          const finalPlanArray=result.filter((item)=>{
            const subtype=item.subtype.toLowerCase();
            // console.log(subtype)
            return !subtype.includes("Extra".toLowerCase())
          })
          console.log(finalPlanArray)
          setPlans(finalPlanArray);
                
      }
    } catch (error) {
      console.log(error);
    }
  }

return(
    <>
    <section>
      <div className={`${style.plancontainer}`}>
      <div className="row">
        <div className={`col-lg-4 col-xl-4 col-md-12 col-sm-12 col-12 ${style.title}`}>
        <div className={`${style.custom_coursepage_title}`}>
        <h1 style={{ "line-height": "1.5" }}>TAXKO Subscription</h1>
            <h4
              style={{
                "font-weight": "200",
                "letter-spacing": "1px",
                opacity: "0.6",
              }}
            >
              Affordable Plans
            </h4>
            </div>
        </div>
        <div className="col-lg-8 col-xl-8 col-md-12 col-sm-12 col-12">
        <Slider {...settings}>
        {plans.map((item)=>{
            return(
                
                <div className={`${style.table} basic"`}>
                <div className={style.price_section}>
                    <div className={style.price_area}>
                        <div className={style.inner_area}>
                            <span className={style.text}>
                              ₹
                            </span>
                            <span className={style.price}>{item.subscriptionprice}</span>
                        </div>
                    </div>
                </div>
                <div className={style.package_name}>
         
                </div>
                <div className={style.features}>
                    <li>
                        <span className={style.list_name}>Plan type {item.subtype}</span>
                        
                    </li>
                    <li>
                        <span className={style.list_name}>Client Access {item.accesscliet}</span>
                        
                    </li>
                   
                    
                </div>
            </div>
            
            )
        })}
     </Slider>
        </div>
      </div>
      </div>
      

    </section>



    {/* <div className={style.grid}>
  <div className={style.grid__item}>
    <div className={style.content}>
      <div className={style.content_inside}>
        <h2>2:1</h2>
        <p>Centered</p>
      </div>
    </div>
  </div>
  <div className={style.grid__item}>
    <div className={style.content}>
      <div className={style.content_inside}>
        <h2>1:1</h2>
        <p>Lower Left</p>
      </div>
    </div>
  </div>  
</div> */}
    
    {/* <section className={`${style.container}`}>
    <div className={`${style.custom_coursepage_title} col-md-4 mt-3 mb-3`}>
            <h1 style={{ "line-height": "1.5" }}>TAXKO Subscription</h1>
            <h4
              style={{
                "font-weight": "200",
                "letter-spacing": "1px",
                opacity: "0.6",
              }}
            >
              Affordable Plans
            </h4>
          </div>
    <div className={`${style.items} col-md-6 mt-3 mb-3`} >
     <Slider {...settings}>
        {subscriptionPlans.map((item)=>{
            return(
                
                <div className={`${style.table} basic"`}>
                <div className={style.price_section}>
                    <div className={style.price_area}>
                        <div className={style.inner_area}>
                            <span className={style.text}>
                              ₹
                            </span>
                            <span className={style.price}>{item.price}</span>
                        </div>
                    </div>
                </div>
                <div className={style.package_name}>
         
                </div>
                <div className={style.features}>
                    <li>
                        <span className={style.list_name}>Plan type {item.title}</span>
                        
                    </li>
                    <li>
                        <span className={style.list_name}>Client Access {item.numClients}</span>
                        
                    </li>
                   
                    
                </div>
            </div>
            
            )
        })}
     </Slider>
     </div>

     
     </section> */}
    </>
    )
}
export default SubsciptionPlans;