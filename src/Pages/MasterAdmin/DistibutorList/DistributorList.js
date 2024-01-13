import style from './DistibutorList.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const DistibutorList = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const storedToken = window.localStorage.getItem('jwtToken');
  console.log(userProf)
  useEffect(() => {
    GetUserDATA();
  }, []);


  const [activeTab, setActiveTab] = useState(0);

  const [tabs,SetTabs] = useState([
    { title: 'TAXKO' },
    { title: 'SALE MANAGER',},
  ]);


  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [allDistributor, setallDistributor] = useState([]);
  const GetUserDATA = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'

    };
    await fetch(`${url_}/all/distributor`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (userProf === "Distributor List") {
          const filteredData = result.filter(item => item.status === true);
          setuserdata(filteredData.filter(item =>item.salesmanid===1))
          setallDistributor(filteredData)
        } else {
          setuserdata(result)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  function GoBack() {
    window.history.back(); 
  }
  const GotoDistributorData = (distributorid, distributorpan) => {
    Navigate('distributordata', {
      state: {
        DistributorID: distributorid,
        DistributorPAN: distributorpan,

      },
    });

  }


  function handleTabClick (index){
    setActiveTab(index);
    if(index===0){
        setuserdata(allDistributor.filter(item =>item.salesmanid===1))
    }
    else{
        setuserdata(allDistributor.filter(item =>item.salesmanid!==1))
    }          
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
              <input type="search" className={`${style.inputbox} `} placeholder='Search By PAN/Name'
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
          <div className={`${style.drow} `}>
            <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>{userProf === "Distributor List" ? "Distributor" : "Admin Name"}</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Status</p></div>
            {(userProf === "Distributor List"&&activeTab===1)&&<div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Manager ID</p></div>}

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
                    onClick={() => GotoDistributorData(item.id, item.pan) }
                     style={{ cursor: "pointer" }}>
                    <p className={`${style.pan} text-primary`}>{item.pan}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.mobile}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.status} `}><i class="fa-solid fa-circle" style={{ color: item.status ? "#32e132" : "#ff0000" }}></i></p></div>
            {(userProf === "Distributor List"&&activeTab===1)&&<div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.salesmanid}</p></div>}

                </div>

              ))
          }




        </div>
        {/* Bottom Port Ends */}


      </div>

    </div >


  );
}

export default DistibutorList;