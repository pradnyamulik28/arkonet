import React, { useState } from 'react';
import style from './ChangePass.module.css'
import swal from 'sweetalert';
import { url_ } from '../../../Config';

const ChangePass = () => {


  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmpass: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const user_id = window.localStorage.getItem('user_id');
    const storedToken = window.localStorage.getItem('jwtToken');




    if (data.newPassword === data.confirmpass) {



      const changeurl = `${url_}/changePassword/${user_id}`;

      try {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var formdata = new FormData();
        formdata.append("oldPassword", `${data.oldPassword}`);
        formdata.append("newPassword", `${data.newPassword}`);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch(changeurl, requestOptions)
          .then(response => {
            response.json();
            console.log(response.status)
            if (response.status === 200) {
              swal("Success.", "Password changed successfully.", "success");
              setData({
                oldPassword: "",
                newPassword: "",
                confirmpass: ""
              })
              console.log(data)
            } else {
              swal("Failed", "Failed to change password!!", "error");

            }
          })

          .catch(error => console.log('error', error));



      } catch (error) {
        console.warn("Error on function calling...")
      }



    } else {
      swal("Failed!", "Passsword doesn't match!!", "error");

    }
  }

  return (
    <div>
      <div className="container">
        <div className={`${style.title} row m - 5 mt - 5 `}>Change Password</div>
        <div className="row m-4 d-flex flex-column">
          <label htmlFor="">Current Password</label>
          <input type="password" value={data.oldPassword} onChange={handleChange} name='oldPassword' placeholder='Enter registered password ....' autoComplete='off' />
        </div>
        <div className="row m-4 d-flex flex-column">
          <label htmlFor="">New Password</label>
          <input type="password" value={data.newPassword} onChange={handleChange} name='newPassword' placeholder='Enter new password ....' autoComplete='off' />
        </div>
        <div className="row m-4 d-flex flex-column">
          <label htmlFor="">Confirm Password</label>
          <input type="password" value={data.confirmpass} onChange={handleChange} name='confirmpass' placeholder='Enter confirm password ....' autoComplete='off' />
        </div>

        <div className={`row d - flex justify - content - center ${style.changePass}`}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>


  );
}

export default ChangePass;
