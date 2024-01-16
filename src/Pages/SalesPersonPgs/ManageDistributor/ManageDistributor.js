// import style from '../SearchAdmin/SearchAdmin.module.css';
import style from "./ManageDistributor.module.css"
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ManageDistributor = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const storedToken = window.localStorage.getItem('jwtToken');
  console.log(userProf)
  useEffect(() => {
    GetDistributorList();
  }, []);
  const salesmanager_id=localStorage.getItem("salesmanager_id")

  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setuserdata] = useState([]);
  const GetDistributorList = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'

    };
    console.log(`${url_}/distrubutorby/salespersonid/${salesmanager_id}`)
    await fetch(`${url_}/distrubutorby/salespersonid/${salesmanager_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        const filteredData = result.filter(item => item.status === false);
        setuserdata(filteredData)

      })
      .catch((error) => {
        console.log(error);
      })

  }

  async function BlockDistributor(distid) {
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${storedToken}`);

    // var requestOptions = {
    //   method: 'PUT',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // try {
    //   const response = await fetch(`${url_}/update/distributor/${distid}/true`, requestOptions);

    //   if (response.status === 200) {
    //     await Swal.fire("Success.", "Distributor approved successfully.", "success");
    //     window.location.reload();
    //   } else {
    //     await Swal.fire("Failed!", "Failed to approve distributor.", "error");
    //     window.location.reload();

    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }


  async function ApproveDistributor(distid) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/update/distributor/${distid}/true`, requestOptions);

      if (response.status === 200) {
        await Swal.fire("Success.", "Distributor approved successfully.", "success");
        window.location.reload();
      } else {
        await Swal.fire("Failed!", "Failed to approve distributor.", "error");
        window.location.reload();

      }
    } catch (error) {
      console.log(error);
    }
  }



  return (


    <div className="d-flex w-100">


      <div className={`${style.workport} `}>

        {/* Top Port Starts */}
        <h4 className=' mt-2 d-flex justify-content-around align-items-center w-100'>

          <b>Distributor Requests</b>

        </h4>
        <div className={`${style.top} `}>
          <div className={`${style.inputbox} `}>
            <div className={`${style.seachbox} `}>
              <input type="search" className={`${style.inputbox} `} placeholder='Search by PAN/Name'
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
            <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}> Name</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Action</p></div>
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
                  <div className={`${style.name} `}><p className={`${style.pan} `}>{item.pan}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.mobile}</p></div>

                  <div className={`${style.name} d-flex flex-column`} >
                    <p className={` `}>
                    <i className={`bi bi-check-circle-fill mr-2 ${style.approve}`} onClick={() => ApproveDistributor(item.id)}></i>
                      <i className={`bi bi-x-circle-fill ${style.reject}`} onClick={() => BlockDistributor(item.id)}></i>
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

export default ManageDistributor;