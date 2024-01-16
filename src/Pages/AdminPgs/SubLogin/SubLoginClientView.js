import React, { useState } from 'react';
import style from './SubLogin.module.css'
import Swal from 'sweetalert2';
import { url_ } from '../../../Config';

const SubLoginClientView = (props) => {

  const ClientsData = props.CData;
  const storedToken = window.localStorage.getItem('jwtToken');
  const SubUserId = props.SubUserID;
  // console.log(ClientsData)
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  const handleCheckboxChange = (checkboxName) => {
    // Toggle checkbox state
    const isChecked = checkedCheckboxes.includes(checkboxName);
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes.filter((name) => name !== checkboxName)
      : [...checkedCheckboxes, checkboxName];

    setCheckedCheckboxes(updatedCheckboxes);
  };

  const handleLogCheckedCheckboxes = async () => {
    console.log('Checked Checkboxes:', checkedCheckboxes);
    console.log('Sub ID:', SubUserId);

    // try {
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", `Bearer ${storedToken}`);

    //   const raw = JSON.stringify({
    //     "clientIds": checkedCheckboxes,
    //     "subUserId": SubUserId
    //   });

    //   const requestOptions = {
    //     method: 'PUT',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //   };

    //   const response = await fetch(`${url_}/Assign_Client`, requestOptions);
    //   const result = await response.text();
    //   if (response.status === 200) {
    //     Swal.fire("Success.", `${result}`, "success")
    //   } else {
    //     Swal.fire("Failed!", `Failed to assign clients!!`, "error")
    //   }
    //   console.log(result);
    // } catch (error) {
    //   console.log('error', error);
    // }

  };
  return (
    <>
      <span data-toggle="modal" data-target=".bd-example-modal-lg">
        {props.children}
      </span>

      <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" style={{ overflowY: "initial !important" }}>
          <div className="modal-content">
            <div className="modal-header">
              <div className=' mt-4 mb-2 ml-3'>
                <h4><b>All Clients</b></h4>
              </div>
              <button className={`${style.close}`} type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body " style={{ height: "50vh", overflowY: "auto" }}>
              <>
                <div className='d-flex flex-column justify-content-center'>
                  <table className="table table-striped ">
                    <thead>
                      <tr style={{ backgroundColor: "#ffd401e6" }}>
                        <th scope="col" className="text-center">#</th>
                        <th scope="col" className="text-center">NAME</th>
                        <th scope="col" className="text-center">PAN</th>
                        <th scope="col" className="text-center">CATEGORY</th>
                        <th scope="col" className="text-center">Assigned To</th>

                      </tr>
                    </thead>
                    <tbody>
                      {ClientsData.map((item, index) => (

                        <tr key={index}>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              id={item.clientId}
                              checked={checkedCheckboxes.includes(item.clientId)}
                              onChange={() => handleCheckboxChange(item.clientId)}
                            />
                          </td>
                          <td className='text-center'>{item.name}</td>
                          <td className='text-center'>{item.pan}</td>
                          <td className='text-center'>{item.category}</td>
                          {item.subUserId !== null ? (
                            <td className='text-center'>SUB-Login{item.subUserId}</td>
                          ) : (
                            <td className='text-center'></td>
                          )}
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </>
            </div>
            <div className="modal-footer">

              <div className='mt-3 d-flex justify-content-center w-100'>
                <button className={`${style.buysublogin_btn} d-flex justify-content-center`} onClick={handleLogCheckedCheckboxes}><b>Assign Clients</b></button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubLoginClientView;
