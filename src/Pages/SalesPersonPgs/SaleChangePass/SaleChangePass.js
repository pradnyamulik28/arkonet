import React, { useState } from 'react';
import style from './SaleChangePass.module.css'
import swal from 'sweetalert2';
import { url_ } from '../../../Config';

const SaleChangePass = () => {


  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmpass: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async () => {
    const sale_mgm_pan = window.localStorage.getItem('pan');
    const storedToken = window.localStorage.getItem('jwtToken');

    if (data.newPassword === data.confirmpass) {
      const changeurl = `${url_}/changePasswordsalesman/${sale_mgm_pan}`;

      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify({
          "oldPassword": data.oldPassword,
          "newPassword": data.newPassword
        });

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const response = await fetch(changeurl, requestOptions);
        const result = await response.text();
        console.log(response.status);
        console.log(result);
        if (response.status === 401) {
          swal.fire("Failed!", `${result}`, "error");
        } else {
          swal.fire("Success", `Password changed successful.`, "success");
          setData({
            oldPassword: "",
            newPassword: "",
            confirmpass: ""
          });
        }
      } catch (error) {
        swal.fire("Failed!", `${error}`, "error");
      }

    } else {
      swal.fire("Failed!", "Password doesn't match!!", "error");
    }
  };

  return (
    <div>
      <div className="container">
        <div className={`${style.title} row m-5 mt-5 `}>Change Password</div>
        <div className={`${style.changePass} row m-4 d-flex flex-column `}>
          <label htmlFor="">Current Password</label>
          <input type="password" value={data.oldPassword} onChange={handleChange} name='oldPassword' placeholder='Enter registered password ....' autoComplete='off' />
        </div>
        <div className={`${style.changePass} row m-4 d-flex flex-column `}>
          <label htmlFor="">New Password</label>
          <input type="password" value={data.newPassword} onChange={handleChange} name='newPassword' placeholder='Enter new password ....' autoComplete='off' />
        </div>
        <div className={`${style.changePass} row m-4 d-flex flex-column `}>
          <label htmlFor="">Confirm Password</label>
          <input type="password" value={data.confirmpass} onChange={handleChange} name='confirmpass' placeholder='Enter confirm password ....' autoComplete='off' />
        </div>

        <div className={`row d-flex justify-content-center ${style.changePass}`}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>


  );
}

export default SaleChangePass;






