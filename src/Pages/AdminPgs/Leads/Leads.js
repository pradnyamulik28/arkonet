import styles from '../IncomeClient/IncomeClient.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import { url_ } from '../../../Config';
import RadioInput from '../../../components/RadioField/RadioInput';
import InputField from '../../../components/InputField/InputField';
import Swal from 'sweetalert2';

const Leads = () => {
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [cdata, setCdata] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [formdata, setFormdata] = useState({
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_code: "",
    profession: "",
    state: "",
    invest_now_email: "",
    telephone: "",
    category: "",
    dob: "",
    name: "",
    residential_status: "",
    userid: "",

  });

  const TempClient = useCallback(() => {




    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`${url_}/getTempClientByUserid/${user_id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          setCdata(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }, [user_id, storedToken]);




  useEffect(() => {
    TempClient();
  }, [TempClient]);


  const UserDataList = (clickedObject) => {

    // console.log(clickedObject);
    // console.log(clickedObject.id);
    setFormdata({
      address: clickedObject.address,
      email: clickedObject.email,
      mobile: clickedObject.mobile,
      pan: clickedObject.pan,
      pin_code: clickedObject.pin_code,
      profession: clickedObject.profession,
      state: clickedObject.state,
      invest_now_email: clickedObject.invest_now_email,
      telephone: clickedObject.telephone,
      category: clickedObject.category,
      dob: clickedObject.dob,
      name: clickedObject.name,
      residential_status: clickedObject.residential_status,
      userid: clickedObject.userid,
    })
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is null, and set it to an empty string if true
    const updatedValue = value === null ? "" : value;

    setFormdata({ ...formdata, [name]: updatedValue });
  }


  const handleSubmit = async () => {
    // console.log(formdata)
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${storedToken}`);

      const raw = JSON.stringify({
        name: formdata.name,
        dob: formdata.dob,
        profession: formdata.profession,
        pan: formdata.pan,
        telephone: formdata.telephone,
        mobile: formdata.mobile,
        email: formdata.email,
        address: formdata.address,
        pin_code: formdata.pin_code,
        state: formdata.state,
        residential_status: formdata.residential_status,
        category: formdata.category,
        userid: user_id,
        invest_now_email: formdata.invest_now_email
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`${url_}/createclient`, requestOptions);
      const result = await response.text();
      console.log(result);
      if (response.status === 200) {
        Swal.fire("Success!", `${result}`, "success");
        setFormdata({
          address: "",
          email: "",
          mobile: "",
          pan: "",
          pin_code: "",
          profession: "",
          state: "",
          telephone: "",
          category: "",
          dob: "",
          name: "",
          residential_status: "",
          userid: "",
          invest_now_email: ""
        });

      } else {
        Swal.fire("Failed!", `${result}`, "error");
      }
    } catch (error) {
      console.error('error', error);
    }


  }
  return (
    <div>
      <div>
        <form>
          <div className=" m-4 d-flex justify-content-center">
            {/* <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
              &#8617;&nbsp;
            </div> */}
            <div className="col-9">
              <input
                type="text"
                className={`form-control ${styles.round}`}
                placeholder="Search Client by Name/PAN"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className={styles.search}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
            {/* <div className="col-2">
              <div className={`${styles.Cbtn_submit}`}>
                <Link to='clientreg'><input type="submit" value="ADD CLIENT" /></Link>
              </div>
            </div> */}
          </div>
        </form>
      </div>

      <div className={`container m-8 ${styles.container}`}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Client Name</th>
              <th scope="col">PAN</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cdata
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.pan.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((items, index) => (
                <tr key={index}>
                  <td>{items.id}</td>
                  <td>{items.name}</td>
                  <td className='' style={{ cursor: "pointer" }}>{items.pan}</td>
                  <td>{items.mobile}</td>

                  <td >

                    <h6 data-toggle="modal" data-target="#myModal" onClick={() => UserDataList(items)} className={`${styles.LCbtn_add_submit}`}>ADD</h6>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>




      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">


              <div className='mr-5 ml-5'>
                <div className="d-flex justify-content-around">
                  <RadioInput name='category' label='Income Tax' onChange={handleChange} value='Income_Tax' checked={formdata.category === 'Income_Tax'} manadatory='*' disabled={true} />
                  <RadioInput name='category' label='GST' onChange={handleChange} value='GST' checked={formdata.category === 'GST'} manadatory='*' disabled={true} />
                  <RadioInput name='category' label='Both' onChange={handleChange} value='Both' checked={formdata.category === 'Both'} manadatory='*' disabled={true} />
                </div>
                <div>
                  <InputField lblname='Name' placeholder='Enter your Name' name='name' onChange={handleChange} value={formdata.name} disabled={true} />
                  <InputField lblname='PAN' placeholder='Enter your PAN' name='pan' onChange={handleChange} value={formdata.pan} disabled={true} />
                  <InputField lblname='DOB' placeholder='Enter your DOB in YYYYY-MM-DD' name='dob' onChange={handleChange} value={formdata.dob} disabled={true} />
                  <InputField lblname='Profession' name='profession' onChange={handleChange} value={formdata.profession} disabled={true} />
                  <InputField lblname='Telephone' placeholder='Enter your Telephone' name='telephone' onChange={handleChange} value={formdata.telephone} disabled={true} />
                  <InputField lblname='Mobile' placeholder='Enter your Mobile' name='mobile' onChange={handleChange} value={formdata.mobile} disabled={true} />
                  <InputField lblname='Email' placeholder='Enter your Email' name='email' onChange={handleChange} value={formdata.email} disabled={true} />
                  <InputField lblname='Address' placeholder='Enter your address' name='address' onChange={handleChange} value={formdata.address} disabled={true} />
                  <InputField lblname='Pincode' placeholder='Enter your pincode' name='pin_code' onChange={handleChange} value={formdata.pin_code} disabled={true} />
                  <InputField lblname='State' name='state' onChange={handleChange} value={formdata.state} disabled={true} />
                  <InputField lblname='InvestNow Email' name='invest_now_email' onChange={handleChange} value={formdata.invest_now_email} disabled={true} />
                  <InputField lblname='Residential Status' name='residential_status' onChange={handleChange} value={formdata.residential_status} disabled={true} />
                </div>

              </div>


            </div>
            <div class="modal-footer d-flex justify-content-center">
              <div className={styles.LCbtn_submit} >
                <button type="submit" onClick={handleSubmit}>SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Leads;
