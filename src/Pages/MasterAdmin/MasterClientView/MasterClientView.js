import style from '../SearchAdmin/SearchAdmin.module.css';
import SideBar from '../MasterSideBar/MasterSideBar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const MasterClientView = () => {
  const Navigate = useNavigate()
  const ccategory = useLocation().state.ClientCategory;
  const storedToken = window.localStorage.getItem('jwtToken');

  useEffect(() => {
    GetClientDATA();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [Clientdata, setClientdata] = useState([]);
  // const [fetch_url, setfetch_url] = useState();

  const GetClientDATA = async () => {





    // switch (ccategory) {
    //   case "Income Tax":
    //     setfetch_url(`${url_}/clients-by-categories/Income_tax,Both`)
    //     break;
    //   case "GST":
    //     setfetch_url(`${url_}/clients-by-categories/GST,Both`)
    //     break;

    //   default:
    //     Swal.fire("Please try again!!!")
    // }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'

    };
    await fetch(`
    ${ccategory === "Income Tax" ? `${url_}/clients-by-categories/Income_tax,Both` :
        ccategory === "GST" ? `${url_}/clients-by-categories/GST,Both` :
          ccategory === "All" ? `${url_}/listofallclients/allclient` :
            null}
        
        `, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        console.log(result)
        const uniquePANs = new Set();

        const filteredData = result.users.filter(item => {
          if (uniquePANs.has(item.pan)) {
            return false;
          }
          uniquePANs.add(item.pan);
          return true;
        });
        setClientdata(filteredData)
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
      {/* <SideBar /> */}

      <div className={`${style.workport}`}>

        {/* Top Port Starts */}
        <h2 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <b>{ccategory} Clients</b>
          <div>
          </div>
        </h2>
        <div className={`${style.top}`}>
          <div className={`${style.inputbox}`}>
            <div className={`${style.seachbox}`}>
              <input type="search" className={`${style.inputbox}`} placeholder='Search Clients By PAN/Name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className={`${style.seachlogo}`}>
              <h1><i class="fa-solid fa-magnifying-glass"></i></h1>
            </div>
          </div>
        </div>
        {/* Top Port Ends */}

        {/* Bottom Port Starts */}
        <div className={`${style.bottom}`}>

          <div className={`${style.drow}`}>
            <div className={`${style.name}`} ><p className={`${style.gdtxt1}`}>Sr. No</p></div>
            <div className={`${style.name}`} ><p className={`${style.gdtxt2}`}>Client Name</p></div>
            <div className={`${style.name}`} ><p className={`${style.gdtxt3}`}>PAN</p></div>
            <div className={`${style.name}`} ><p className={`${style.gdtxt4}`}>Mobile</p></div>

          </div>




          {Clientdata.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pan.toLowerCase().includes(searchQuery.toLowerCase())
          )


            .map((item, index) => (

              <div className={`${style.ddata}`}>
                <div className={`${style.name}`} ><p className={`${style.srno}`}>{index + 1}</p></div>
                <div className={`${style.name}`} ><p className={`${style.an}`}>{item.name}</p></div>
                <div className={`${style.name}`} ><p className={`${style.pan}`}>{item.pan}</p></div>
                <div className={`${style.name}`} ><p className={`${style.mobile}`}>{item.mobile}</p></div>
                {/* <div className={`${style.name}`} ><p className={`${style.reference} text-primary`} style={{ cursor: "pointer" }}>View</p></div> */}
              </div>

            ))}



        </div>
        {/* Bottom Port Ends */}


      </div>

    </div>


  );
}

export default MasterClientView;