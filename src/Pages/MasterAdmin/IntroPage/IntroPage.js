import style from "./IntroPage.module.css";
import intro from '../../../Images/firstpage.jpg'

function IntroPage() {
    return (
        <div className={`${style.firstpage}`}>
            <img src={intro} className={`${style.introimg}`} alt="" />
        </div>
    );
}
export default IntroPage;