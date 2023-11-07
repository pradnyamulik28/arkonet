import { useEffect, useState } from "react";
import style from "./Presentation.module.css";
import ppt1 from "../../../Images/pptImages/1.jpg";
import ppt2 from "../../../Images/pptImages/2.jpg";
import ppt3 from "../../../Images/pptImages/3.jpg";
import ppt4 from "../../../Images/pptImages/4.jpg";
import ppt5 from "../../../Images/pptImages/5.jpg";
import ppt6 from "../../../Images/pptImages/6.jpg";
import ppt7 from "../../../Images/pptImages/7.jpg";
import ppt8 from "../../../Images/pptImages/8.jpg";
import ppt9 from "../../../Images/pptImages/7.jpg";
import ppt10 from "../../../Images/pptImages/8.jpg";

import ppt11 from "../../../Images/pptImages/11.jpg";
import ppt12 from "../../../Images/pptImages/12.jpg";
import ppt13 from "../../../Images/pptImages/13.jpg";
import ppt14 from "../../../Images/pptImages/14.jpg";
import ppt15 from "../../../Images/pptImages/15.jpg";
import ppt16 from "../../../Images/pptImages/16.jpg";
import ppt17 from "../../../Images/pptImages/17.jpg";
import ppt18 from "../../../Images/pptImages/18.jpg";
import ppt19 from "../../../Images/pptImages/19.jpg";
import ppt20 from "../../../Images/pptImages/20.jpg";

import ppt21 from "../../../Images/pptImages/21.jpg";
import ppt22 from "../../../Images/pptImages/22.jpg";
import ppt23 from "../../../Images/pptImages/23.jpg";
import ppt24 from "../../../Images/pptImages/24.jpg";
import ppt25 from "../../../Images/pptImages/25.jpg";
import ppt26 from "../../../Images/pptImages/26.jpg";
import ppt27 from "../../../Images/pptImages/27.jpg";
import ppt28 from "../../../Images/pptImages/28.jpg";
import ppt29 from "../../../Images/pptImages/29.jpg";
import ppt30 from "../../../Images/pptImages/30.jpg";

import ppt31 from "../../../Images/pptImages/31.jpg";
import ppt32 from "../../../Images/pptImages/32.jpg";
import ppt33 from "../../../Images/pptImages/33.jpg";
import ppt34 from "../../../Images/pptImages/34.jpg";
import ppt35 from "../../../Images/pptImages/35.jpg";
import ppt36 from "../../../Images/pptImages/36.jpg";
import ppt37 from "../../../Images/pptImages/37.jpg";
import ppt38 from "../../../Images/pptImages/38.jpg";
import ppt39 from "../../../Images/pptImages/39.jpg";
import ppt40 from "../../../Images/pptImages/40.jpg";

import ppt41 from "../../../Images/pptImages/41.jpg";
import ppt42 from "../../../Images/pptImages/42.jpg";
import ppt43 from "../../../Images/pptImages/43.jpg";
import ppt44 from "../../../Images/pptImages/44.jpg";
import ppt45 from "../../../Images/pptImages/45.jpg";
import ppt46 from "../../../Images/pptImages/46.jpg";
import ppt47 from "../../../Images/pptImages/47.jpg";
import ppt48 from "../../../Images/pptImages/48.jpg";



function Presentation() {
  const [currentSlideNo, setCurrentSlideNo] = useState(1);
  const [totalSides, setTotalSlides] = useState(0);

  const [isFullScreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      content: ppt1,
    },
    {
      content: ppt2,
    },
    {
      content: ppt3,
    },
    {
      content: ppt4,
    },
    {
      content: ppt5,
    },
    {
      content: ppt6,
    },
    {
      content: ppt7,
    },
    {
      content: ppt8,
    },
    {
      content: ppt9,
    },
    {
      content: ppt10,
    },


    {
      content: ppt11,
    },
    {
      content: ppt12,
    },
    {
      content: ppt13,
    },
    {
      content: ppt14,
    },
    {
      content: ppt15,
    },
    {
      content: ppt16,
    },
    {
      content: ppt17,
    },
    {
      content: ppt18,
    },
    {
      content: ppt19,
    },
    {
      content: ppt20,
    },



    {
      content: ppt21,
    },
    {
      content: ppt22,
    },
    {
      content: ppt23,
    },
    {
      content: ppt24,
    },
    {
      content: ppt25,
    },
    {
      content: ppt26,
    },
    {
      content: ppt27,
    },
    {
      content: ppt28,
    },
    {
      content: ppt29,
    },
    {
      content: ppt30,
    },


    {
      content: ppt31,
    },
    {
      content: ppt32,
    },
    {
      content: ppt33,
    },
    {
      content: ppt34,
    },
    {
      content: ppt35,
    },
    {
      content: ppt36,
    },
    {
      content: ppt37,
    },
    {
      content: ppt38,
    },
    {
      content: ppt39,
    },
    {
      content: ppt40,
    },



    {
      content: ppt41,
    },
    {
      content: ppt42,
    },
    {
      content: ppt43,
    },
    {
      content: ppt44,
    },
    {
      content: ppt45,
    },
    {
      content: ppt46,
    },
    {
      content: ppt47,
    },
    {
      content: ppt48,
    }
  ];

  useEffect(() => {
    init();
  }, []);

  function init() {
    setTotalSlides(slides.length);
    //console.log(totalSides);
  }

  function moveSlide(e) {
    e.preventDefault();
    console.log( e,currentSlideNo);
    if (e.target.id === "right_btn") {
      setCurrentSlideNo(currentSlideNo + 1);
    } else if (e.target.id === "left_btn" ) {
      setCurrentSlideNo(currentSlideNo - 1);
    }
  }

  function screenMode(e) {
    console.log(e.target.id)
    switch(e.target.id){
      case "full_screen":
        console.log("full_screen")
        setIsFullscreen(true);
      break;
      case "small_screen":
        console.log("small_screen")
        setIsFullscreen(false);
      break;
      default : break;
    }
    
  }

  

  return (
    <div className={style.outercontainer}>
      <div class={style.heading}>TAXKO</div>
      <div className={style.container}>
        <div
          id={
            isFullScreen
              ? `${style.presentation_area} ${style.full_screen}`
              : `${style.presentation_area}`
          }
        >
          
          <section class={style.presentation}>
            {slides.map((item, index) => (
              <div
                class={
                  currentSlideNo === index + 1
                    ? `${style.slide} ${style.show}`
                    : `${style.slide}`
                }
              >
                <img src={item.content} alt="" />
              </div>
            ))}
          </section>
          
        </div>
      </div>
      <section className={style.navigation}>
          <p>{`${currentSlideNo} of ${totalSides}`}</p>
            {/* <button
              id="full_screen"
              className={
                isFullScreen
                  ? `${style.btn_screen}`
                  : `${style.btn_screen} ${style.show}`
              }
              onClick={screenMode}
            >
              <i className="fas fa-expand" id="full_screen"></i>
            </button>

            <button
              id="small_screen"
              className={
                isFullScreen
                  ? `${style.btn_screen} ${style.show}`
                  : `${style.btn_screen}`
              }
              onClick={screenMode}
            >
              <i className="fas fa-compress" id="small_screen"></i>
            </button> */}

            <button
              id="left_btn"
              className={currentSlideNo > 1 ? `${style.btn} ${style.show}`:`${style.btn}`}
              onClick={moveSlide}
            >
              <i className="fas fa-solid fa-caret-left" id="left_btn"></i>
            </button>
            
            <button
              id="right_btn"
              className={
                currentSlideNo < totalSides ? `${style.btn} ${style.show}` : `${style.btn}`
              }
              onClick={moveSlide}
            >
              <i className="fa-solid fa-caret-right" id="right_btn"></i>
            </button>
          </section>
    </div>
  );
}
export default Presentation;
