import style from './MasterLogIn.module.css';
import mlogo from '../../../Images/masterlogo.jpg';
import IntroPage from '../IntroPage/IntroPage';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

function MasterLogIn() {
    const Navigate = useNavigate();
    const [showIntoro, setShowIntoro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntoro(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const [formdata, setFormdata] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = () => {
        console.log("click")
        Navigate('dashboard');
    }

    return (

        <div className={`${style.workport}`}>
            {showIntoro && <IntroPage />}


            <div className={`${style.top}`}>

                <div className={`${style.masterlogo}`}>
                    <img src={mlogo} alt="" />
                </div>

                <div className={` ${style.inputboxes}`}>
                    <label htmlFor="opts1" className={`${style.label1}`}>
                        User ID<p className={`${style.p}`}>&#42;</p>
                    </label>
                    <input type="text" className={`${style.ddmenu1}`} id="opts1" placeholder='Master USER ID' onChange={handleChange} name='username' value={formdata.username} />
                    <label htmlFor="opts2" className={`${style.label1}`}>
                        Password <p className={`${style.p}`}>&#42;</p>
                    </label>
                    <input type="password" className={`${style.ddmenu1}`} id="opts2" onChange={handleChange} name='password' value={formdata.password} />
                </div>

                <div className={`${style.buttonport}`}>
                    <button className={`${style.button1}`} type="submit" onClick={handleSubmitLogin}>Login</button>
                </div>

            </div>


            <div className={`${style.bottom}`}>
                <div className={`${style.copyright}`}>
                    <div className={`${style.textual}`}><p>Follow Us On</p></div>
                    <div className={`${style.handles}`}>
                        <div className={`${style.insta}`}><h5><i class="fa-brands fa-instagram"></i></h5></div>
                        <div className={`${style.x}`}><h5><i class="fa-brands fa-x-twitter"></i></h5></div>
                        <div className={`${style.fb}`}><h5><i class="fa-brands fa-facebook-f"></i></h5></div>

                    </div>

                </div>

            </div>



        </div>

        // {/* className={`${style.name}`} */}



    );
}

export default MasterLogIn;