import React, { useState, useEffect } from 'react';
import InputField from '../../../components/InputField/InputField';
import style from './SubLogin.module.css'
import PaymentGateway from '../../../PaymentGateway'
import Swal from 'sweetalert2';
import { url_ } from '../../../Config';

const SubLoginRegister = (props) => {

  const storedToken = window.localStorage.getItem('jwtToken');
  const user_id = window.localStorage.getItem('user_id');
  const End_Date = window.localStorage.getItem('End_Date');

  // const End_Date = window.localStorage.getItem('End_Date');
  const U_Name = window.localStorage.getItem('user_name');
  const U_Mobile = window.localStorage.getItem('mobile');
  const U_Email = window.localStorage.getItem('email');
  const U_Pan = window.localStorage.getItem('pan');

  const [NumberofLogin, setNumberofLogin] = useState(null);
  const [AmountofLogin, setAmountofLogin] = useState(0);
  const [startDate, setStartDate] = useState("");
  const UserDays = props.DaysRemaining;
  // const UserDays = 365;

  const handleNoChange = (e) => {
    const newNumber = e.target.value;
    setNumberofLogin(newNumber);
    // setUserDays(CalculateRemainingDays(End_Date))


    const AmountToPay = 1000 / 365;
    const totalAmountToPay = (Math.fround(AmountToPay) * UserDays)

    // console.log(Math.fround(AmountToPay))
    // console.log(Math.round(totalAmountToPay))



    // const SingleDayforSUBLogin = 2.7 * UserDays
    // const PlanforSUBLogin = SingleDayforSUBLogin * newNumber
    setAmountofLogin(totalAmountToPay)
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = now.getDate().toString().padStart(2, '0');

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    setStartDate(formattedDate + '+00:00')
    // console.log(formattedDate + '+00:00')
  };





  const handlePlaceOrder = async () => {

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "userid": user_id,
        "totalClients": NumberofLogin,
        "endDate": End_Date,
        "startDate": startDate,
        "userpan": U_Pan

      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };



      const response = await fetch(`${url_}/saveCA_Users`, requestOptions);
      const result = await response.json();
      // console.log(result);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return (
    <>


      <span data-toggle="modal" data-target="#exampleModal" >
        {props.children}
      </span>


      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div className=' mt-4 mb-2 ml-3'>
                <h4><b>BUY LOGIN</b></h4>
              </div>
              <button className={`${style.close}`} type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <>
                <div className='d-flex justify-content-center'>
                  <input type="text" placeholder='Enter no. of logins...' name='NumberofLogin' value={NumberofLogin} onChange={handleNoChange} autoComplete='off' />
                </div>
                <hr />
                <h5>Order Details:</h5>
                <div className='d-flex justify-content-center'>
                  <div style={{ width: "90%" }}>
                    <div className='row'>
                      <span className='col-4'>Name</span>
                      <span className='col-2'>:</span>
                      <span className='col-6'>{U_Name}</span>
                    </div>
                    <div className='row'>
                      <span className='col-4'>Mobile</span>
                      <span className='col-2'>:</span>
                      <span className='col-6'>{U_Mobile}</span>
                    </div>
                    <div className='row'>
                      <span className='col-4'>Email</span>
                      <span className='col-2'>:</span>
                      <span className='col-6'>{U_Email}</span>
                    </div>
                    <div className='row'>
                      <span className='col-4'>No. of Logins</span>
                      <span className='col-2'>:</span>
                      <span className='col-6'>{NumberofLogin}</span>
                    </div>
                    <div className='row'>
                      <span className='col-4'>Price</span>
                      <span className='col-2'>:</span>
                      <span className='col-6'>1000/-</span>
                    </div>
                    <div className='row'>
                      <span className='col-4'>Payable Amount</span>
                      <span className='col-2'>:</span>
                      <span className='col-6'>{Math.round(AmountofLogin)}/- {`(${UserDays} Days)`}</span>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div class="modal-footer">
              {NumberofLogin === null || NumberofLogin === '' ? (
                <div className='mt-3 d-flex justify-content-center w-100'>
                  <button className={`${style.buysublogin_btn} d - flex justify - content - center`} onClick={() => {
                    Swal.fire(
                      {
                        icon: "warning",
                        text: `Number of login can't be empty!!`
                      }
                    )

                  }}> <b>Place Order</b></button >
                </div >
              ) : (

                <div className='mt-3 d-flex justify-content-center w-100'>
                  <PaymentGateway

                    ClientContact={U_Mobile}
                    ClientEmail={U_Email}
                    ClientName={U_Name}
                    ClientPan={U_Pan}
                    Amount={Math.round(AmountofLogin)}
                    FunctionToExcute={handlePlaceOrder}
                  >
                    <button className={`${style.buysublogin_btn} d-flex justify-content-center`}><b>Place Order</b></button>
                  </PaymentGateway>
                </div>
              )}
            </div >
          </div >
        </div >
      </div >
    </>
  );
}

export default SubLoginRegister;
