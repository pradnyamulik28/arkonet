import style from './MasterLogIn.module.css';
import mlogo from '../../../Images/masterlogo.jpg';
import IntroPage from '../IntroPage/IntroPage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { url_ } from '../../../Config';

const MasterLogIn = ({ setLoggedIn }) => {
    const Navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": formdata.username,
                "password": formdata.password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`${url_}/authenticate/admin`, requestOptions);
            const result = await response.json();


            if (response.status === 200) {

                const jwtToken = result.token;


                localStorage.setItem('jwtToken', jwtToken);

                localStorage.setItem('LogedIn', 'true');


                // console.log(result)
                Navigate('admindashboard');
                setLoggedIn(true);

            }

        } catch (error) {
            Swal.fire("Failed!", `Invalid username or password!!`, "error");
            setFormdata({
                username: "",
                password: ""
            });
        }
    };


    return (

        <div className={`${style.main_view} d-flex`}>

            <>
                {/* <SideBar /> */}

                <div className={`${style.workport}`}>

                    <div className={`${style.top}`}>

                        <div className={`${style.masterlogo}`}>
                            <img src={mlogo} alt="" />
                        </div>

                        <div className={` ${style.inputboxes}`}>
                            <label htmlFor="opts1" className={`${style.label1}`}>
                                User ID<p className={`${style.p}`}>&#42;</p>
                            </label>
                            <input type="text" className={`${style.ddmenu1}`} id="opts1" placeholder='Master username' onChange={handleChange} name='username' value={formdata.username} autoComplete='off' />
                            <label htmlFor="opts2" className={`${style.label1}`}>
                                Password <p className={`${style.p}`}>&#42;</p>
                            </label>
                            <input type="password" className={`${style.ddmenu1}`} id="opts2" placeholder='Master password' onChange={handleChange} name='password' value={formdata.password} autoComplete='off' />
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


            </>

            {/* className={`${style.name}`} */}

        </div>

    );
}

export default MasterLogIn;