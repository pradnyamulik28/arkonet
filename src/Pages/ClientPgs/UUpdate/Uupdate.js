import React, { useState, useEffect } from 'react';

import InputField from '../../../components/InputField/InputField';
import styles from './Uupdate.module.css';
import DropDown from '../../../components/DropDown/DropDown';
import Uprofesion_obj from '../../../ObjData/CProf.json';
import States_obj from '../../../ObjData/States.json';
import swal from 'sweetalert';

import { url_ } from '../../../Config';
import { useParams } from 'react-router-dom';

const Uupdate = () => {

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const { id } = useParams();

  const [values, setValues] = useState({
    id: id,
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_Code: "",
    profession: "",
    state: "",
    telephone: "",
    dob: "",
    name: "",
    userid: `${user_id}`,

  })


  useEffect(() => {
    GetClient();

  }, [])



  function GetClient() {
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
          console.log(res);
          setValues({
            address: res.address,
            email: res.email,
            mobile: res.mobile,
            pan: res.pan,
            pin_Code: res.pin_Code,
            profession: res.profession,
            state: res.state,
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


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${url_}/updateClient/${id}`;
    console.log(url);
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
          swal("Success", "Data updated successfully.", "success");

          console.log(values)
        })
        .catch(error => {
          swal("Failed!", " Failed to update.!!!!", "error");
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  return (
    <div>
      <form action="/" onSubmit={handleSubmit}>
        <div className={styles.right}>
          <div className={styles.regtitle}>
            <span>CLIENT REGISTRATION FORM</span>
            <div className={styles.ubtn_submit}>
              <button type="submit" onClick={handleSubmit}>UPDATE</button>
            </div>
          </div>
          <div className={styles.regform}>
            <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={values.name} />
            <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='dob' value={values.dob} />
            <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={values.profession} />
            <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} />
            <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={values.telephone} />
            <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} />
            <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={values.email} />
            <InputField placeholder='Enter your office address' onChange={handleChange} lblname=' Addresss' name='address' value={values.address} />
            <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_code' value={values.pin_Code} />
            <DropDown value_array={States_obj} lblname='State' name='state' value={values.state} onChange={handleChange} />


            {/* <div className={`container ${styles.container} m-4`}>
              <div className="row justify-content-md-center">
                <div className="col-md-auto font-weight-bold m-3 h4">
                  FEE PAYMENTS DETAILS
                </div>
              </div>
              <div className='text-center h6'>Last updated on</div>
              <div className='text-center h6 text-primary'>20/02/2023</div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Total Bill</label>
                    <div className="col-sm-8">
                      <input type="number" className="form-control" id="inputEmail3" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className={`col-sm-3 col-form-label ${styles.green}`}>Received</label>
                    <div className="col-sm-8">
                      <input type="email" className="form-control" id="inputEmail3" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className={`col-sm-3 col-form-label ${styles.red}`}>Pending</label>
                    <div className="col-sm-8">
                      <input type="email" className="form-control" id="inputEmail3" />
                    </div>
                  </div>

                </div>
                <div className="col-2 ">
                  <ul className="list-group">
                    <li className="list-group-item bg-transparent font-weight-bold">{value1}</li>
                    <li className={`list-group-item bg-transparent font-weight-bold ${styles.green}`}>{value1}</li>
                    <li className={`list-group-item bg-transparent font-weight-bold  ${styles.red}`}>{value1}</li>
                  </ul>

                </div>
                <div className={`col-3 ${styles.center}`}>
                  <div className={styles.ubtn_submit}>
                    <button type="submit" onClick={handleSubmit}>UPDATE</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div >

      </form >
    </div >
  );
}

export default Uupdate;
