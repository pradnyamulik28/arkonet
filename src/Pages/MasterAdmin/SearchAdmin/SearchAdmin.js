import style from './SearchAdmin.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchAdmin = () => {
    const Navigate = useNavigate()
    const userProf = useLocation().state.userProfession;
    const storedToken = window.localStorage.getItem('jwtToken');
    // console.log(userProf)
    useEffect(() => {
        GetUserDATA();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [userdata, setuserdata] = useState([]);
    const [subendDate, setsubendDate] = useState();
    const GetUserDATA = async () => {






        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'

        };
        await fetch(`
        
        
        
        
        ${userProf === "Chartered Accountant" ||
                userProf === "Tax Consultant" ||
                userProf === "Tax Return Preparer(TRP)" ||
                userProf === "Accountant" ||
                userProf === "Certified Consultant" ||
                userProf === "Advocate" ||
                userProf === "Other" ? `${url_}/by-profession/${userProf}` :
                `${url_}/by-profession/all`
            }

    `, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                // console.log(result[0].count)
                // console.log(result[0].registration)
                setuserdata(result)



                if (result[0].substartdatebyuser === null) {
                    setsubendDate(null)
                } else {
                    if (result[0].status === true) {
                        const subEndDateObject = new Date(result[0].subendtdate);
                        const currentDate = new Date();
                        const CurrentDATENEWFORMATE = currentDate.toISOString().replace('Z', '+00:00');
                        const EndingDATENEWFORMATE = subEndDateObject.toISOString().replace('Z', '+00:00');
                        if (CurrentDATENEWFORMATE < EndingDATENEWFORMATE) {

                            setsubendDate(true)
                        } else {
                            setsubendDate(false)

                        }
                    } else {
                        setsubendDate(false)
                    }
                }
                //     if (result[0].subendtdate === 22) {
                //         setsubendDate(false)
                //         console.log("USER subendtdate", false)
                //     } else {


                //         if (result[0].status === true) {

                //             const subEndDateObject = new Date(result[0].subendtdate);
                //             const currentDate = new Date();
                //             const CurrentDATENEWFORMATE = currentDate.toISOString().replace('Z', '+00:00');
                //             const EndingDATENEWFORMATE = subEndDateObject.toISOString().replace('Z', '+00:00');
                //             if (CurrentDATENEWFORMATE < EndingDATENEWFORMATE) {

                //                 setsubendDate(true)
                //             }
                //             console.log(CurrentDATENEWFORMATE)
                //             console.log(EndingDATENEWFORMATE)


                //         } else {
                //             setsubendDate(false)

                //         }

                //     }
                //     setsubendDate(true)
                //     console.log("USER subendtdate", true)
            })
            .catch((error) => {
                console.log(error);
            })

    }
    function GoBack() {
        window.history.back(); // This will navigate to the previous page in the browser's history
    }
    const GOTOClients = (userpan) => {
        Navigate('refUser', {
            state: {
                UserPan: userpan,
                user_title: "Users"
            },
        });

    }
    const GOTOUserdata = (userid) => {
        Navigate('Userdata', {
            state: {
                UserId: userid,

            },
        });

    }
    return (


        <div className="d-flex w-100">


            <div className={`${style.workport} `}>

                {/* Top Port Starts */}
                <h2 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
                    <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
                        &#8617;&nbsp;
                    </div>
                    <b>{userProf}</b>
                    <div>
                    </div>
                </h2>
                <div className={`${style.top} `}>
                    <div className={`${style.inputbox} `}>
                        <div className={`${style.seachbox} `}>
                            <input type="search" className={`${style.inputbox} `} placeholder='Search Admin By PAN/Name'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className={`${style.seachlogo} `}>
                            <h1><i class="fa-solid fa-magnifying-glass"></i></h1>
                        </div>
                    </div>
                </div>
                {/* Top Port Ends */}

                {/* Bottom Port Starts */}
                <div className={`${style.bottom} `}>

                    <div className={`${style.drow} `}>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>Admin Name</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt5} `}>Reference</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Status</p></div>
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
                                    <div className={`${style.name} `} onClick={() => GOTOUserdata(item.registration.regId)} style={{ cursor: "pointer" }}><p className={`${style.pan} text-primary`}>{item.registration.pan}</p></div>
                                    <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.registration.mobile}</p></div>

                                    <div className={`${style.name} `} onClick={() => GOTOClients(item.registration.pan)}><p className={`${style.reference} text-primary`} style={{ cursor: "pointer" }}>{item.count}</p></div>


                                    <div className={`${style.name} `} >
                                        <p className={`${style.status} `}>
                                            <i class="fa-solid fa-circle"
                                                style={
                                                    item.substartdatebyuser === null ? { color: "#d2cccc" } :
                                                        item.status ? { color: "#32e132" } : { color: "#ff0000" }
                                                }>

                                            </i>
                                        </p>
                                    </div>
                                </div>

                            ))




                    }





                </div>
                {/* Bottom Port Ends */}


            </div>

        </div >


    );
}

export default SearchAdmin;