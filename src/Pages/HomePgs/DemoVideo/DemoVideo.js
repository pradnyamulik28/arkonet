import style from "./DemoVideo.module.css";
function DemoVideo() {
  return (
    <>
      <h2 className={`${style.heading}`}>TAXKO Demo</h2>
      <span className={`${style.seperator}`}></span>
      <div className={style.outer}>
      <div className={style.video_wrapper}>
        <div className={style.video_container} id={style.video_container}>
          <video
            controls
            id="video"
            preload="metadata"
            poster="//cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/poster.jpg"
          >
            <source
              src="//cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4"
              type="video/mp4"
            />
          </video>

          <div className={style.play_button_wrapper}>
            <div
              title="Play video"
              className={style.play_gif}
              id={style.circle_play_b}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
export default DemoVideo;
