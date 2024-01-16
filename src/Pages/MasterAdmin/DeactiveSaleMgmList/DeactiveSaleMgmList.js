import style from './DeactiveSaleMgmList.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const DeactiveSaleMgmList = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const storedToken = window.localStorage.getItem('jwtToken');
  // console.log(userProf)
  useEffect(() => {
    GetUserDATA();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [isTargetExist, setisTargetExist] = useState();

  const GetUserDATA = async () => {
    let updateItem = [...userdata];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(`${url_}/listofsalesmanager/formasteradmin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setuserdata(result);
      })
      .catch((error) => {
        console.log(error);
      });

    await fetch(`${url_}/getAll/salesmanager/target`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        updateItem = result;
      })
      .catch((error) => {
        console.log(error);
      });

    if (userProf === "Sale Manager Target") {
      updateItem.map((item) => {
        document.getElementById(item.id).value = item.amount;
      });
    }
    setisTargetExist(updateItem)
  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GOTOSaleManagerdata = (userid) => {
    console.log(userid)
    // Navigate('Userdata', {
    //   state: {
    //     UserId: userid,
    //   },
    // });

  }
  const [inputValues, setInputValues] = useState(Array(userdata.length).fill(''));

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };


  async function saveSaleManagerTarget(e, id, pan, index) {
    console.log(id, pan, parseInt(inputValues[index]))
    const index1 = isTargetExist.findIndex((item) => item.id === id);

    if (inputValues[index]) {


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "salesmanid": id,
        "pan": pan,
        "date": new Date().toISOString().split('T')[0],
        "year": new Date().getFullYear(),
        "amount": parseInt(inputValues[index])
      });
      var requestOptions = {
        method: index1 !== -1 ? 'PUT' : 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          index1 !== -1 ? `${url_}/update/targer/salesmanager` : `${url_}/save/targer/salesmanager`,
          requestOptions
        );
        const result = await response.text();
        if (response.status === 200) {
          Swal.fire({ icon: "success", text: index1 !== -1 ? "Target Updated." : "Target Saved." })
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      Swal.fire({
        icon: "error",
        text: index1 !== -1 ? "No value change" : "Empty target value"
      })
    }

  }

  function confirm(e, pan) {
    const name = e.target.id;

    Swal.fire({
      title: 'Are you sure?',
      text: name === "stop" ? "Stop the sale manager.?" :
        name === "resume" ? "Resume sale manager.?" :
          name === "deactivate" && 'Remove sale manager.?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        manageStatus(name, pan)
      }
    });

  }
  async function manageStatus(name, pan) {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: (name === "stop" || name === "resume") ? 'PUT' :
        name === "deactivate" && 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        name === "stop" ? `${url_}/changestatus/salesmanager/${pan}/false` :
          name === "resume" ? `${url_}/changestatus/salesmanager/${pan}/true` :
            name === "deactivate" && `${url_}/salesmanager/delete/${pan}`,
        requestOptions
      );
      const result = await response.text();
      if (response.status === 200) {
        await Swal.fire({
          icon: "success", text: name === "stop" ? `Stopped temporarily.` :
            name === "resume" ? `Service resumed.` :
              name === "deactivate" && `Sale manager deactivated.`
        }, 3000)
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
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
              <h4><i class="fa-solid fa-magnifying-glass"></i></h4>
            </div>
          </div>
        </div>
        {/* Top Port Ends */}

        {/* Bottom Port Starts */}
        <div className={`${style.bottom} `}>

          <div className={`${style.drow} `}>
            {userProf !== "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div>}
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>Manager Name</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
            {userProf !== "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>}
            {userProf === "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Amount</p></div>}
            {userProf === "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.gdtxt6} `} style={{ "visibility": "hidden" }}>Update</p></div>}
            {userProf === "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Status</p></div>}

          </div>


          {
            userdata
              .filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.pan.toLowerCase().includes(searchQuery.toLowerCase())

              )


              .map((item, index) => (



                <div className={`${style.ddata} `}>
                  {userProf !== "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.srno} `}>{index + 1}</p></div>}
                  <div className={`${style.name} `} ><p className={`${style.an} `}>{item.name}</p></div>
                  <div className={`${style.name} `}
                    onClick={() => GOTOSaleManagerdata(item.id)} style={{ cursor: "pointer" }}>
                    <p className={`${style.pan} text-primary`}>{item.pan}</p></div>
                  {userProf !== "Sale Manager Target" && <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.mobile}</p></div>}
                  {userProf === "Sale Manager Target" && <div className={`${style.name} `} >
                    <p className={`${style.status} `}>
                      <input
                        id={item.id}
                        key={index}
                        type="text"
                        value={inputValues[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          border: "none",
                          boxShadow: "inset 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
                          paddingLeft: "5px",

                        }}
                      />
                    </p>
                  </div>}
                  {userProf === "Sale Manager Target" &&
                    <div className={`${style.btn_submit}`} onClick={(e) => { saveSaleManagerTarget(e, item.id, item.pan, index) }}><button>UPDATE</button></div>
                  }
                  {userProf === "Sale Manager Target" && <div className={`${style.name} `} >
                    <p className={`${style.status} `}>
                      <i id="deactivate" class="fa-solid fa-ban" title='Deactivate' style={{ "marginRight": "10px", "cursor": "pointer" }} onClick={(e) => { confirm(e, item.pan) }}></i>
                      {item.status === true && <i id="stop" class="fa-solid fa-circle-stop" title='Temporary Stop' style={{ "marginRight": "5px", "cursor": "pointer" }} onClick={(e) => { confirm(e, item.pan) }}></i>}
                      {item.status === false && <i id="resume" class="fa-solid fa-circle-play" title='Resume Service' style={{ "cursor": "pointer" }} onClick={(e) => { confirm(e, item.pan) }}></i>}
                    </p></div>}

                </div>

              ))
          }




        </div>
        {/* Bottom Port Ends */}


      </div>

    </div >


  );
}

export default DeactiveSaleMgmList;