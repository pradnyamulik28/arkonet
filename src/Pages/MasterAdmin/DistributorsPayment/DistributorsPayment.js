import style from './DistributorsPayment.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const DistributorsPayment = () => {
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
    await fetch(`${url_}/master/everydistrubutor/incomecount`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)

        const filteredData = result.filter(item => item.distibutor.status === true);
        setuserdata(filteredData)

      })
      .catch((error) => {
        console.log(error);
      })

  }
  // const distributorPaymenthandleChange = (e) => {
  //   const { name, value } = e.target;
  //   setdistributorAmount({ ...distributorAmount, [e.target.name]: value.replace(/\D/g, "") });
  //   e.target.value = value.replace(/\D/g, "");
  // }

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
    // const filledValuesWithNames = userdata.reduce((result, user, index) => {
    //   if (inputValues[index] !== '') {
    //     result.push({ name: user.distibutor.pan, value: inputValues[index] });
    //   }
    //   return result;
    // }, []);

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

  return (


    <div className="d-flex w-100">


      <div className={`${style.workport} `}>

        {/* Top Port Starts */}
        <h2 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
          <div >
          </div>
          <b>Distributor's Payment</b>
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
            {/* <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div> */}
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>Name</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>PAN</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>Total Earning</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Paid</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Unpaid</p></div>
            <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Amount</p></div>
          </div>


          {
            userdata
              .filter(item =>
                item.distibutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.distibutor.pan.toLowerCase().includes(searchQuery.toLowerCase())

              )


              .map((item, index) => (



                <div className={`${style.ddata} `}>
                  {/* <div className={`${style.name} `} ><p className={`${style.srno} `}>{index + 1}</p></div> */}
                  <div className={`${style.name} `} ><p className={`${style.an} `}>{item.distibutor.name}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.an} `}>{item.distibutor.pan}</p></div>
                  <div className={`${style.name} `}><p className={`${style.pan} `}>{item.totalEarning}</p></div>
                  <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.paid}</p></div>


                  <div className={`${style.name} `} ><p className={`${style.status} `}>{item.unpaid}</p></div>
                  <div className={`${style.name} `} >
                    <p className={`${style.status} `}>
                      {/* <input type="text" name="amount" id=""
                        onChange={distributorPaymenthandleChange}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          border: "none",
                          boxShadow: "inset 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
                          paddingLeft: "5px",

                        }} /> */}
                      <input
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
                  </div>
                  {/* <div className={`${style.name} `} >
                    <p className={`${style.status} `}>
                      <div className={`${style.btn_submit} mt-4`}>
                        <button type="submit" onClick={() => DistriPayment(item.distibutor.pan)}>
                          UPDATE
                        </button>
                      </div>
                    </p>
                  </div> */}

                </div>

              ))
          }



        </div>

        {/* Bottom Port Ends */}
        <div className={`${style.btn_submit} mt-4`}>
          <button onClick={handleButtonClick}>UPDATE PAYMENT</button>
        </div>

      </div>

    </div >


  );
}

export default DistributorsPayment;