import React, { useState, useEffect } from 'react';

import InputField from '../../../components/InputField/InputField';
import InputType from '../URegistration/InputType';
import styles from './Uupdate.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import Uprofesion_obj from '../../../ObjData/CProf.json';
import States_obj from '../../../ObjData/States.json';
import swal from 'sweetalert2';

import { url_ } from '../../../Config';
import { Navigate, useParams } from 'react-router-dom';

const Uupdate = () => {
  const user_id = window.localStorage.getItem('user_id');
  const user_pan = window.localStorage.getItem('pan');
  const storedToken = window.localStorage.getItem('jwtToken');
  const { id } = useParams();
  const currentYear = new Date().getFullYear();
  const fyyear = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`

  const [mailList,setMailList]=useState(
    [      
      {
        "val":"Other",
        "option_name":"Other"
      }    
    ]
  )
  const [values, setValues] = useState({
    id: id,
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_code: "",
    profession: "",
    state: "",
    invest_now_email:null,
    telephone: "",
    dob: "",
    name: "",
    userid: `${user_id}`,
  })

  const [ClientPayment, setClientPayment] = useState({
    total_bill: 0,
    received_bill: 0,
    discount: 0

  })

  const [totalPayment, settotalpayment] = useState()
  const [receivedPayment, setreceivedPayment] = useState()
  const [pendingPayment, setpendingPayment] = useState()
  const [DiscountPayment, setDiscountPayment] = useState()
  const [paymentlastupdate, setpaymentlastupdate] = useState()


  useEffect(() => {
   
    GetClient();
    GetClientPayment();
  }, [])

  function GetClientPayment() {
    try {


      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`${url_}/sumOFPaymentClient/${user_id}/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setpendingPayment(result.pendingPayment);
          setreceivedPayment(result.receivedPayment);
          settotalpayment(result.totalPayment);
          setpaymentlastupdate(result.lastUpdateDate);
          setDiscountPayment(result.discountPayment);

          console.log(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }


  async function GetClient() {
    const mailList1=await fetchMailList();
    console.log(mailList1)
    try {

      fetch(`${url_}/getClientById/${user_id}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          const mailListvalues=mailList1.map((item)=>item.val)
          // console.log(res);
          if(mailListvalues.includes(res.invest_now_email))
          {
            // console.log("exist")
            setInvestNowType("dropdown")
          }
          else{
            // console.log("dont exist")
            setInvestNowType("text")
          }
          setMailList(mailList1)
          setValues({
            address: res.address,
            email: res.email,
            mobile: res.mobile,
            pan: res.pan,
            pin_code: res.pin_code,
            profession: res.profession,
            state: res.state,
            invest_now_email:res.invest_now_email,
            telephone: res.telephone,
            dob: res.dob,
            name: res.name,
            userid: `${user_id}`,
          })

        })
        .catch(error => {


          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }
const [investnowtype,setInvestNowType]=useState("dropdown")

  const handleChange = (e) => {
    if(e.target.name=== "invest_now_email"){
          
          
          if(investnowtype==="dropdown"&&e.target.value==="Other")
          {            
            setInvestNowType("text");
              if(e.target.value==="Other"){
                setValues({ ...values, [e.target.name]: "" });
                e.target.value = "";
              }              
          }
          else if(investnowtype==="dropdown" && e.target.value!=="Other"){
            setInvestNowType("dropdown");
            setValues({ ...values, [e.target.name]: e.target.value });
          }
          else{
            setValues({ ...values, [e.target.name]: e.target.value });
          }
        
      }
      else{
    setValues({ ...values, [e.target.name]: e.target.value });
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${url_}/updateClient/${id}`;
    console.log(values);
    try {

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }, 

        body: JSON.stringify(values),
      })
        .then(res => {
          if(res.status==200)
         { swal.fire("Success", "Data updated successfully.", "success");
          window.location.reload();
          
        }
          // console.log(values)
          else{
          swal.fire("Failed!", " Failed to update.!!!!", "error");

          }
        })
        .catch(error => {
          swal.fire("Failed!", " Failed to update.!!!!", "error");
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const handlepaymentChange = (e) => {
    setClientPayment({ ...ClientPayment, [e.target.name]: e.target.value });
  };

  const handelPaymentSaveDetails = async (e) => {
    try {
      e.preventDefault();
      // console.log(ClientPayment.total_bill)
      // console.log(ClientPayment.received_bill)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "userid": user_id,
        "clientid": id,
        "totalPayment": ClientPayment.total_bill,
        "receivedPayment": ClientPayment.received_bill,
        "year": fyyear
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/Client_Payment_Details`, requestOptions);
      const result = await response.text();
      console.log(result);
      if (response.status === 200) {
        const noti = await swal.fire("Success", "Payment Saved.", "success")
        window.location.reload()
        setClientPayment({
          total_bill: "",
          received_bill: ""

        })
      } else {
        swal.fire("Failed!", "Failed to save payment.", "error")
      }
    } catch (error) {
      console.log('error', error);
    }
  };







  const handelPaymentUpdateDetails = async (e) => {



    try {
      e.preventDefault();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/updateClientPaymentDetails/${user_id}/${id}/${ClientPayment.received_bill}/${ClientPayment.discount}/${ClientPayment.total_bill}`, requestOptions);
      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        const noti = await swal.fire("Success", "Payment updated.", "success")
        window.location.reload()
        // setClientPayment({

        //   received_bill: ""

        // })
      } else if (result.status === "NOT_FOUND") {
        swal.fire("Failed!", `${result.message}`, "error")
      }

      console.log(ClientPayment.received_bill)
    } catch (error) {
      console.log('error', error);
    }
  };


  
  async function fetchMailList(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`${url_}/Invest_now/get_all/by-pan/${user_pan}`, requestOptions);
      const result = await response.json();
      
      const updateItems=[...mailList]
      result.map((item)=>{      
        updateItems.push({
          id: item.id,
          pan: item.pan,
          val: item.investNow_Email,
          option_name: item.investNow_Email,
        });
      })
      return updateItems;
      // console.log(updateItems)
  // setMailList(updateItems)
    }catch(error){
        console.log(error)
      }
  }


  function viewMailList(){
    setInvestNowType("dropdown")
  }

  return (
    <div>
      <form >
        <div className={styles.right}>
          <div className={`${styles.regtitle} `}>

            <span className='d-flex align-items-center'>
              <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
                &#8617;&nbsp;
              </div>

              CLIENT UPDATE FORM
            </span>
            <div className={styles.ubtn_submit}>
              <button type="submit" onClick={handleSubmit}>UPDATE</button>
            </div>
          </div>
          <div className={styles.regform}>
            <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={values.name} />
            <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='dob' value={values.dob} type="date"/>
            <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={values.profession} />
            <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} disabled={true} />
            <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={values.telephone} />
            <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} />
            <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={values.email} />
            <InputField placeholder='Enter your office address' onChange={handleChange} lblname=' Addresss' name='address' value={values.address} />
            <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_code' value={values.pin_code} />
            <DropDown value_array={States_obj} lblname='State' name='state' value={values.state} onChange={handleChange} />
            <div ><InputType                
                labelname="InvestNow Email"
                name="invest_now_email"
                type={investnowtype}
                placeholder="Enter your investnow email"
                value={values.invest_now_email}               
                onChange={handleChange}
                mandatory={false}
                mailList={mailList}

              />
              <p onClick={viewMailList} className={styles.viewmail} >View Mail List</p>
              </div>
            <div className={`container ${styles.container} m-4`}>
              <div className="row justify-content-md-center">
                <div className="col-md-auto font-weight-bold m-3 h4">
                  FEE PAYMENTS DETAILS
                </div>
              </div>
              <div className='text-center h6'>Last updated on</div>
              <div className='text-center h6 text-primary'>{paymentlastupdate}</div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Total Bill</label>
                    <div className="col-sm-8">
                      <input type="text" className="form-control" id="inputEmail3" name='total_bill' value={ClientPayment.total_bill} onChange={handlepaymentChange} autoComplete='off' />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className={`col-sm-3 col-form-label ${styles.green}`}>Received</label>
                    <div className="col-sm-8">
                      <input type="text" className="form-control" id="inputEmail3" name='received_bill' value={ClientPayment.received_bill} onChange={handlepaymentChange} autoComplete='off' />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className={`col-sm-3 col-form-label ${styles.red}`}>Pending</label>
                    {/* <div className="col-sm-8">
                      <input type="email" className="form-control" id="inputEmail3" />
                    </div> */}
                  </div>

                </div>
                <div className="col-2 ">
                  <ul className="list-group">
                    <li className="list-group-item bg-transparent font-weight-bold">{totalPayment}</li>
                    <li className={`list-group-item bg-transparent font-weight-bold ${styles.green}`}>{receivedPayment}</li>
                    <li className={`list-group-item bg-transparent font-weight-bold  ${styles.red}`}>{pendingPayment}</li>
                  </ul>

                </div>
                <div className={`col-4 ${styles.center}`}>

                  <div className=" row">
                    <div className={styles.discount_input}>
                      <h6 className='mt-2'>Enter discount amount</h6>
                      <div className='d-flex row'>
                        <input type="text" name='discount' value={ClientPayment.discount} onChange={handlepaymentChange} autoComplete='off' />
                        <span className=" bg-transparent font-weight-bold ml-2 d-flex align-items-center justify-content-center text-success" style={{ border: "1px solid gray", borderRadius: "5px", width: "5rem" }}>{DiscountPayment}</span>
                      </div>

                    </div>
                  </div>

                  <div className={`${styles.ubtn_submit} mt-5`}>
                    {totalPayment === 0 ?
                      (
                        <button type="submit" onClick={handelPaymentSaveDetails}>SAVE</button>
                      ) : (
                        <button type="submit" onClick={handelPaymentUpdateDetails}>UPDATE</button>
                      )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div >

      </form >
    </div >
  );
}

export default Uupdate;
