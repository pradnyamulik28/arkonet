import style from './ViewCA.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ViewCA = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const userCategory = useLocation().state.userCategory;
  const storedToken = window.localStorage.getItem('jwtToken');
  const sale_mgm_pan = localStorage.getItem("pan")
  const salesmanager_id = localStorage.getItem("salesmanager_id")


  useEffect(() => {
    GetUserDATA();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [myCAData, setMyCAData] = useState([]);
  const [distCAData, setDistCAData] = useState([]);
  const [fetch_url, setfetch_url] = useState();
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
        
    ${userProf === "All C.A" ? `${url_}/forsalesmanager/combined-lists-CA?pan=${sale_mgm_pan}&id=${salesmanager_id}` :
      // userProf === "Today's Subscription" ? `${url_}/Renewal/today/salesmanger/SSSSS2222S/3` :
      //   userProf === "Yesterday's Subscription" ? `${url_}/distrubutor/subscriptionslist/yestarday/${sale_mgm_pan}` :
      //     userProf === "Week's Subscription" ? `${url_}/distrubutor/subscriptionslist/week/${sale_mgm_pan}` :
      //       userProf === "Present Year's Subscription" ? `${url_}/distrubutor/subscriptionslist/year/${sale_mgm_pan}` :
      //         userProf === "Last Year's Subscription" ? `${url_}/distrubutor/subscriptionslist/previousyear/${sale_mgm_pan}` :
                userProf === "Today's Renewal" ? `${url_}/Renewal/today/salesmanger/${sale_mgm_pan}/${salesmanager_id}` :
                  userProf === "Tomorrow's Renewal" ? `${url_}/Renewal/tomorrow/salesmanager/${sale_mgm_pan}/${salesmanager_id}` :
                    userProf === "Week's Renewal" ? `${url_}/Renewal/week/salesmanager/${sale_mgm_pan}/${salesmanager_id}` :
                      userProf === "Month's Renewal" ? `${url_}/Renewal/month/salesmanger/${sale_mgm_pan}/${salesmanager_id}` :
                        userProf === "3 Months's Renewal" ? `${url_}/Renewal/threemonth/salesmanager/${sale_mgm_pan}/${salesmanager_id}` :
                          userProf === "6 Months's Renewal" ? `${url_}/Renewal/sixmonth/salesmanager/${sale_mgm_pan}/${salesmanager_id}` :
                          userProf === "category" ? `${url_}/salesmanager/users/displayBothLists/by-profession?profession=${userCategory}&pan=${sale_mgm_pan}&id=${salesmanager_id}`:
                            null}

    `, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
console.log(result)
        const MyCA=result.salesmanager_personal_ca.length>0?
        result.salesmanager_personal_ca.filter((item) => {
          if (new Date(item.subendtdate) < new Date().getDate()) return false;
          else return true;
        }):[]
        console.log(result.salesmanager_personal_ca)
        setMyCAData(MyCA);

        const DistCA=result.Salesmanager_distributor_ca.length>0?
        result.Salesmanager_distributor_ca.filter((item) => {
          if (new Date(item.subendtdate) < new Date().getDate()) return false;
          else return true;
        }):[]
        // console.log(result.Salesmanager_distriubutor_ca)
        setDistCAData(DistCA);

        setuserdata(MyCA);
      })
      .catch((error) => {
        console.log(error);
      })

  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const [activeTab, setActiveTab] = useState(0);

  const [tabs,SetTabs] = useState([
    { title: 'My CA' },
    { title: 'Distributor CA',},
  ]);

  function handleTabClick (index){
    setActiveTab(index);
    if(index===0){
        setuserdata(myCAData)
    }
    else{
        setuserdata(distCAData)
    }          
  }


  return (


    <div className="d-flex w-100">


      <div className={`${style.workport} `}>

        {/* Top Port Starts */}
        <h4 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <b>{userProf==="category"?userCategory:userProf}</b>
          <div>
          </div>
        </h4>
        <div className={`${style.top} `}>
          <div className={`${style.inputbox} `}>
            <div className={`${style.seachbox} `}>
              <input type="search" className={`${style.inputbox} `} placeholder='Search By PAN/Name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className={`${style.seachlogo} `}>
              <h4><i class="fa-solid fa-magnifying-glass"></i></h4>
            </div>
          </div>
        </div>
        {/* Top Port Ends */}

        {/* Bottom Port Starts */}

        <div style={{ backgroundColor: "#fefbec", borderRadius: "1.5rem", marginTop: "20px", width: "95%", height: "100%" }} className='d-flex justify-content-center'>


          <div style={{ overflow: "auto", width: "100%" }} className={`${style.VUtable}`}>
          <div className={`${style.tab_bar}`}>
        {tabs.map((tab, index) => (
            <div key={index}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(index)
              }} 
            className={index===activeTab?`${style.tab} ${style.active}`:`${style.tab}`}>{tab.title}</div>
        ))}
        {/* <div className={`${style.tab} ${style.active}`}>TAXKO</div>
        <div className={`${style.tab}`}>Sale Manager</div>         */}
        </div>
            <table style={{"width":"100%"}}>
              <thead>
                <tr className='text-warning'>
                  <th>Sr. No</th>
                  <th>CA Name</th>
                  <th>PAN</th>
                  <th>Mobile</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {




                  userdata
                    .filter(item =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.pan.toLowerCase().includes(searchQuery.toLowerCase())

                    )


                    .map((item, index) => (


                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.pan}</td>
                        <td>{item.mobile}</td>
                        {/* <td>
                          <i class="fa-solid fa-circle" style={{ color: item.paid ? "#32e132" : "#ff0000" }}></i>
                        </td> */}
                      </tr>

                    ))
                }

              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div >


  );
}

export default ViewCA;