import style from '../SearchAdmin/SearchAdmin.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const storedToken = window.localStorage.getItem('jwtToken');
  console.log(userProf)
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
    await fetch(`
        
        
        
        
        ${userProf === "Today's Subscription" ? `${url_}/subscriptions/today` :
        userProf === "Yesterday's Subscription" ? `${url_}/subscriptions/yestarday` :
          userProf === "Week's Subscription" ? `${url_}/subscriptionslist/week` :
            userProf === "Present Year's Subscription" ? `${url_}/subscriptionslist/year` :
              userProf === "Last Year's Subscription" ? `${url_}/subscriptionslist/previousyear` :
                userProf === "Today's Renewal" ? `${url_}/Renewal/today` :
                  userProf === "Tomorrow's Renewal" ? `${url_}/Renewal/tommarow` :
                    userProf === "Week's Renewal" ? `${url_}/Renewal/week` :
                      userProf === "Month's Renewal" ? `${url_}/Renewal/month` :
                        userProf === "3 Months's Renewal" ? `${url_}/Renewal/threemonth` :
                          userProf === "6 Months's Renewal" ? `${url_}/Renewal/sixmonth` :
                            userProf === "Distributor List" ? `${url_}/all/distributor` :

                              null}

    `, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (userProf === "Distributor List") {
          const filteredData = result.filter(item => item.status === true);
          setuserdata(filteredData)
        } else {
          setuserdata(result)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GOTOUserdata = (userid) => {
    console.log(userid)
    Navigate('Userdata', {
      state: {
        UserId: userid,

      },
    });

  }
  const GotoDistributorData = (distributorid, distributorpan) => {
    Navigate('distributordata', {
      state: {
        DistributorID: distributorid,
        DistributorPAN: distributorpan,

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
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>{userProf === "Distributor List" ? "Distributor" : "Admin Name"}</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Status</p></div>
          </div>


          {
            userdata
              .filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.pan.toLowerCase().includes(searchQuery.toLowerCase())

              )


              .map((item, index) => (



                <div className={`${style.ddata} `}>
                  <div className={`${style.name} `} ><p className={`${style.srno} `}>{index + 1}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.an} `}>{item.name}</p></div>
                  <div className={`${style.name} `}
                    onClick={
                      userProf === "Distributor List" ?
                        () => GotoDistributorData(item.id, item.pan) :
                        () => GOTOUserdata(item.userid)
                    } style={{ cursor: "pointer" }}>
                    <p className={`${style.pan} text-primary`}>{item.pan}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.mobile}</p></div>

                  {
                    userProf === "Distributor List" ?
                      (
                        <div className={`${style.name} `} ><p className={`${style.status} `}><i class="fa-solid fa-circle" style={{ color: item.status ? "#32e132" : "#ff0000" }}></i></p></div>
                      ) : (
                        <div className={`${style.name} `} ><p className={`${style.status} `}><i class="fa-solid fa-circle" style={{ color: item.paid ? "#32e132" : "#ff0000" }}></i></p></div>
                      )
                  }
                </div>

              ))
          }




        </div>
        {/* Bottom Port Ends */}


      </div>

    </div >


  );
}

export default UserList;