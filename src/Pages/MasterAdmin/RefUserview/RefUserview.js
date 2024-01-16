import style from './RefUserview.module.css';
import SideBar from '../MasterSideBar/MasterSideBar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const RefUserview = () => {
    const Navigate = useNavigate()
    const user_pan = useLocation().state.UserPan;
    const user_id = useLocation().state.UserID;
    const usertitle = useLocation().state.user_title;
    const storedToken = window.localStorage.getItem('jwtToken');

    useEffect(() => {
        GetUserDATA();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [userdata, setuserdata] = useState([]);
    const [fetch_url, setfetch_url] = useState();
    const GetUserDATA = async () => {




        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if (usertitle === "Users") {
            fetch(`${url_}/findByreferenceid/${user_pan}`, requestOptions)

                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setuserdata(result)
                })
                .catch(error => console.log('error', error));

        } else {
            fetch(`${url_}/getSubUSersByUserid/${user_id}`, requestOptions)

                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setuserdata(result)
                })
                .catch(error => console.log('error', error));

        }



    }
    function GoBack() {
        window.history.back(); // This will navigate to the previous page in the browser's history
    }

    return (


        <div className="d-flex w-100">


            <div className={`${style.workport}`}>

                {/* Top Port Starts */}
                <h2 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
                    <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
                        &#8617;&nbsp;
                    </div>
                    <b>{usertitle !== "Users" ? "Sub Users" : "Users"}</b>
                    <div>
                    </div>
                </h2>

                {usertitle !== "Users" ? (
                    <>
                        <div className={`${style.top}`}>
                            <div className={`${style.inputbox}`}>
                                <div className={`${style.seachbox}`}>
                                    <input type="search" className={`${style.inputbox}`} placeholder='Search By PAN/Name'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                <div className={`${style.seachlogo}`}>
                                    <h4><i class="fa-solid fa-magnifying-glass"></i></h4>
                                </div>
                            </div>
                        </div>
                        {/* Top Port Ends */}

                        {/* Bottom Port Starts */}
                        <div className={`${style.bottom}`}>

                            <div className={`${style.drow}`}>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt1}`}>Sr. No</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt2}`}>Name</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt3}`}>PAN</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt4}`}>Mobile</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt4}`}>Email</p></div>
                            </div>




                            {




                                userdata.filter(item =>
                                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.pan.toLowerCase().includes(searchQuery.toLowerCase())

                                )


                                    .map((item, index) => (



                                        <div className={`${style.ddata} `}>
                                            <div className={`${style.name} `} ><p className={`${style.srno} `}>{index + 1}</p></div>
                                            <div className={`${style.name} `} ><p className={`${style.an} `}>{item.name}</p></div>
                                            <div className={`${style.name} `} style={{ cursor: "pointer" }}><p className={`${style.pan}`}>{item.pan}</p></div>
                                            <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.mobile}</p></div>
                                            <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.email}</p></div>



                                        </div>

                                    ))




                            }



                        </div>
                        {/* Bottom Port Ends */}
                    </>
                ) : (
                    <>
                        <div className={`${style.top}`}>
                            <div className={`${style.inputbox}`}>
                                <div className={`${style.seachbox}`}>
                                    <input type="search" className={`${style.inputbox}`} placeholder='Search Admin By PAN/Name'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                <div className={`${style.seachlogo}`}>
                                    <h4><i class="fa-solid fa-magnifying-glass"></i></h4>
                                </div>
                            </div>
                        </div>
                        {/* Top Port Ends */}

                        {/* Bottom Port Starts */}
                        <div className={`${style.bottom}`}>

                            <div className={`${style.drow}`}>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt1}`}>Sr. No</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt2}`}>Admin Name</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt3}`}>PAN</p></div>
                                <div className={`${style.name}`} ><p className={`${style.gdtxt4}`}>Mobile</p></div>
                                {/* <div className={`${style.name}`} ><p className={`${style.gdtxt5}`}>Reference</p></div> */}
                                <div className={`${style.name}`} ><p className={`${style.gdtxt6}`}>Status</p></div>
                            </div>




                            {




                                userdata.filter(item =>
                                    item.registration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.registration.pan.toLowerCase().includes(searchQuery.toLowerCase())

                                )


                                    .map((item, index) => (



                                        <div className={`${style.ddata} `}>
                                            <div className={`${style.name} `} ><p className={`${style.srno} `}>{index + 1}</p></div>
                                            <div className={`${style.name} `} ><p className={`${style.an} `}>{item.registration.name}</p></div>
                                            <div className={`${style.name} `} style={{ cursor: "pointer" }}><p className={`${style.pan}`}>{item.registration.pan}</p></div>
                                            <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.registration.mobile}</p></div>

                                            {/* <div className={`${style.name} `} onClick={() => GOTOClients(item.registration.pan)}><p className={`${style.reference} text-primary`} style={{ cursor: "pointer" }}>{item.count}</p></div> */}


                                            <div className={`${style.name} `} ><p className={`${style.status} `}><i class="fa-solid fa-circle" style={item.substartdatebyuser === null ? { color: "#d2cccc" } : { color: item.status ? "#32e132" : "#ff0000" }}></i></p></div>
                                        </div>

                                    ))




                            }



                        </div>
                        {/* Bottom Port Ends */}
                    </>
                )}

            </div>

        </div>


    );
}

export default RefUserview;