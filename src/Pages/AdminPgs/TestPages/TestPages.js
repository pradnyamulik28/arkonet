import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

import style from './TestPages.module.css'
const TestPages = () => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log('Start Date:', start);
    console.log('End Date:', end);
  };
  const fetchUserSubscriptionData = async () => {
    try {
      setStartDate(new Date(2023, 10, 12))
      setEndDate(new Date(2023, 10, 20))
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchUserSubscriptionData();
  }, []);

  const formatDate = (date) => {
    if (date) {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    return '';
  };

  return (
    <div>
      <div >
        <h2>Extra Large Modal</h2>
        {/* <!-- Button to Open the Modal --> */}
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
          Open modal
        </button>

        {/* <!-- The Modal --> */}
        <div class="modal fade" id="myModal">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">

              {/* <!-- Modal Header --> */}
              {/* <div class="modal-header">
                <small type="button" class="close" data-dismiss="modal">&times;</small>
              </div> */}

              {/* <!-- Moda body --> */}
              <div class="modal-body">




                <div >
                  <div className='d-flex flex-column align-items-center'>
                    <div>
                      <div className='d-flex flex-column align-items-center '>
                        <h2> <b>ADD DAYS</b></h2>
                        <h6 className='mt-2'>Today</h6>
                        <h6><b>24/05/2023</b></h6>
                      </div>
                    </div>
                    <div className='d-flex justify-content-around w-75'>
                      <div className={`${style.inputs}`}>
                        <h6>How many days to add?</h6>
                        <input type="text" name="" id="" />
                      </div>
                      <div className={`${style.inputs}`}>
                        <h6>How many clients to add?</h6>
                        <input type="text" name="" id="" />
                      </div>
                    </div>
                    <div>
                      <h6>
                        OR
                      </h6>
                    </div>
                    <div className='d-flex'>
                      <div className={`${style.inputs} mr-5 d-flex flex-column align-items-center mt-3 `}>
                        <h6 className='mb-3 mt-4'>Select Date Range</h6>
                        <input type="date" />
                        <h5 className='mt-4 mb-4 '>to</h5>
                        <input type="date" name="" id="" />
                      </div>
                      <div>

                        <div style={{ border: "2rem solid #bfbfbfe6", borderRadius: "10px" }} className='mt-4'>

                          <DatePicker
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            monthsShown={2}
                            className={`${style}`} // Apply your custom class here
                          />
                        </div>
                      </div>


                    </div>
                    <div className={`${style.Sub_btn} d-flex justify-content-center  mt-4 w-100`} >
                      <button>SUBMIT</button>
                    </div>
                  </div>
                </div>



              </div>



            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default TestPages;
