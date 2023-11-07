import style from "./DemoVideo.module.css";
import { useRef,useState } from "react";
import Presentation from "../Presentation/Presentation";
function DemoVideo() {


  

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };


  return (
    <div className={style.container}>
      {/* <h2 className={`${style.heading}`}>TAXKO Demo</h2>
      <span className={`${style.seperator}`}></span> */}
      {/* <div className={style.outer}>
      <div className={style.video_wrapper}>
        <div className={style.video_container} id={style.video_container}>
          <video
            controls
            id="video"
            preload="metadata"
            poster="//cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/poster.jpg"
            ref={videoRef}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
          >
            <source
              src="//cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4"
              type="video/mp4"
            />
          </video>

          
        </div>
      </div>
      </div> */}

    {/* <div style={{"width":"100%","height":"fit-content"}}> */}
      <Presentation />
      {/* </div> */}
    </div>
  );
}
export default DemoVideo;
