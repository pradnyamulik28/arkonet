import style from './ViewDistributors.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ViewDistributors = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const storedToken = window.localStorage.getItem('jwtToken');
  const distributor_pan = localStorage.getItem("pan")


  useEffect(() => {
    GetUserDATA();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [fetch_url, setfetch_url] = useState();
  const [subendDate, setsubendDate] = useState();

  const GetUserDATA = async () => {


const salesmanager_id=localStorage.getItem("salesmanager_id")



    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'

    };

    await fetch(`${url_}/distrubutorby/salespersonid/${salesmanager_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        const filteredData = result.filter((item) => {
          if (new Date(item.subendtdate) < (new Date().getDate())) {
            return false
          }
          else {
            return true
          }
        })
        // console.log(filteredData)
        setuserdata(filteredData)


      })
      .catch((error) => {
        console.log(error);
      })

  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
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
              <h2><i class="fa-solid fa-magnifying-glass"></i></h2>
            </div>
          </div>
        </div>
        {/* Top Port Ends */}

        {/* Bottom Port Starts */}

        <div style={{ backgroundColor: "#fefbec", borderRadius: "1.5rem", marginTop: "20px", width: "95%", height: "100%" }} className='d-flex justify-content-center'>


          <div style={{ overflow: "auto", width: "95%" }} className={`${style.VUtable}`}>
            <table>
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

                {/* <tr>
                  <td>1</td>
                  <td>Pavan Jidimath</td>
                  <td>PAVAN1999M</td>
                  <td>9307110950</td>
                  <td>
                    <i class="fa-solid fa-circle" style={{ color: true ? "#32e132" : "#ff0000" }}></i>
                  </td>
                </tr> */}

              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div >


  );
}

export default ViewDistributors;