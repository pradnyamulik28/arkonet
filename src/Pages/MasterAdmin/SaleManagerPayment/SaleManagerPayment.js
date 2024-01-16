import style from './SaleManagerPayment.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const SaleManagerPayment = () => {
  const Navigate = useNavigate()
  const userProf = useLocation().state.userProfession;
  const storedToken = window.localStorage.getItem('jwtToken');
  useEffect(() => {
    GetUserDATA();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [distributorAmount, setdistributorAmount] = useState({
    amount: ""
  });
  const GetUserDATA = async () => {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'

    };
    await fetch(`${url_}/list/allpaid/amount`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.filter((item) => item.pan !== 'XXXXX1111X'))

        const filteredData = result.filter((item) => item.pan !== 'XXXXX1111X');
        setuserdata(filteredData)
        setisTargetExist(filteredData);


      })
      .catch((error) => {
        console.log(error);
      })

  }


  async function updateResponse(res) {
    if (res === 200) {
      await Swal.fire("Success.", "Amount updated successfully.", "success");
      setdistributorAmount({
        amount: ""
      })
      window.location.reload()
    } else {
      await Swal.fire("Failed.", "Failed to update amount!!", "error");
      window.location.reload();
    }
  }

  const DistriPayment = async (distriPAN, distriAMOUNT) => {


    console.log(distriPAN, distriAMOUNT)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/update/everydistrubutor/incomecount/${distriPAN}/${distriAMOUNT}`, requestOptions);
      updateResponse(response.status)

      // if (response.status === 200) {
      //   const result = await response.json();
      //   // console.log(result)
      //   // await Swal.fire("Success.", "Amount updated successfully.", "success");
      //   setdistributorAmount({
      //     amount: ""
      //   })

      // } else {
      //   await Swal.fire("Failed.", "Failed to update amount!!", "error");
      //   // window.location.reload();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const [inputValues, setInputValues] = useState(Array(userdata.length).fill(''));

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleButtonClick = () => {


    const filledValuesWithNames = userdata.reduce((result, user, index) => {
      const inputValue = inputValues[index] || 0; // If input value is falsy, set it to 0
      result.push({ name: user.distibutor.pan, value: inputValue });
      return result;
    }, []);
    console.log(filledValuesWithNames)

    function Printdata(data) {
      data.forEach(item => {
        console.log(`${item.name}: ${item.value}`);
        DistriPayment(item.name, item.value)
      });
    }
    Printdata(filledValuesWithNames);
  };

  const [isTargetExist, setisTargetExist] = useState();

  async function saveSaleManagerPayment(e, pan, index) {
    // console.log( pan, parseInt(inputValues[index]),isTargetExist);

    const index1 = isTargetExist.findIndex((item) => item.salesman_pan === pan);
    console.log(index1)

    if (inputValues[index]) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        pan: pan,
        totalpaid: parseInt(inputValues[index]),
      });
      var requestOptions = {
        method: index1 !== -1 ? "PUT" : "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          index1 !== -1
            ? `${url_}/save/updated/slasemanager/amount`
            : `${url_}/save/salesmanager/paidamount`,
          requestOptions
        );
        const result = await response.text();
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            text: index1 !== -1 ? "Payment Updated." : "Payment Saved.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: index1 !== -1 ? "No value change" : "Empty value",
      });
    }
  }

  return (


    <div className="d-flex w-100">


      <div className={`${style.workport} `}>

        {/* Top Port Starts */}
        <h4 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
          <div >
          </div>
          <b>Sale Manager's Payment</b>
          <div>
          </div>
        </h4>
        <div className={`${style.top} `}>
          <div className={`${style.inputbox} `}>
            <div className={`${style.seachbox} `}>
              <input type="search" className={`${style.inputbox} `} placeholder='Search Admin By PAN/Name'
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
            {/* <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div> */}
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>Name</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Total Earning</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Paid</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Unpaid</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Amount</p></div>
            <div className={`${style.btn_submit}`} style={{ "visibility": "hidden" }}><button>SAVE</button></div>
          </div>

          {
            userdata
              .filter(item =>
                item.saleman_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.salesman_pan.toLowerCase().includes(searchQuery.toLowerCase())

              )
              .map((item, index) => (
                <div className={`${style.ddata} `}>
                  <div className={`${style.name} `} ><p className={`${style.an} `}>{item.saleman_name}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.pan} `}>{item.salesman_pan}</p></div>
                  <div className={`${style.name} `}><p className={`${style.amount} `}>{item.Total_incetative_amunt}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.amount} `}>{item.totalpaidamount}</p></div>


                  <div className={`${style.name} `} ><p className={`${style.amount} `}>{item.Total_incetative_amunt - item.totalpaidamount}</p></div>
                  <div className={`${style.name} `} >
                    <p className={`${style.inputamount} `}>

                      <input
                        key={index}
                        type="text"
                        value={inputValues[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}

                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          border: "none",
                          boxShadow: "inset 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
                          paddingLeft: "5px",
                        }}
                      />
                    </p>
                  </div>
                  <div
                    className={`${style.btn_submit}`}
                    onClick={(e) => {
                      saveSaleManagerPayment(e, item.salesman_pan, index);
                    }}
                  >
                    <button>SAVE</button>
                  </div>
                </div>

              ))
          }
        </div>
      </div>
    </div >


  );
}

export default SaleManagerPayment;