import React, { useEffect, useState } from 'react';
import style from './FamilyGroup.module.css'
import Swal from 'sweetalert2';
import { url_ } from '../../../Config';

const FamilyGroup = () => {
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [ClientsData, setClientsData] = useState([]);
  const [familyCount, setFamilyCount] = useState();
  useEffect(() => {
    GetData();
  }, [fetch]);

  const GetData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const ClientsDataResponse = await fetch(`${url_}/getClientByUserid/${user_id}`, requestOptions);
      const ClientsDataResult = await ClientsDataResponse.json();
      // console.log(ClientsDataResult);
      setClientsData(ClientsDataResult)

      await fetch(`${url_}/getClientByUserid/${user_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          setClientsData(result)
        })
        .catch((error) => {
          console.log(error);
        })
      await fetch(`${url_}/countFamilyIds/${user_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          setFamilyCount(result)
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Sorting the newArray by category in ascending order
  const newArraySorted = ClientsData.sort((a, b) => {
    const familyIdA = a.familyId || ''; // Handle cases where familyId is null or undefined
    const familyIdB = b.familyId || '';

    // Compare familyIds
    return familyIdA.localeCompare(familyIdB);
  });

  // console.log(newArraySorted);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);


  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (clientId, item) => {
    const isChecked = checkedCheckboxes.includes(clientId);

    // Update the array of selected items
    const updatedSelectedItems = isChecked
      ? selectedItems.filter((selectedItem) => selectedItem.clientId !== clientId)
      : [...selectedItems, item];
    // console.log(updatedSelectedItems);
    // Toggle checkbox state
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes.filter((id) => id !== clientId)
      : [...checkedCheckboxes, clientId];
    // console.log(updatedCheckboxes);
    setCheckedCheckboxes(updatedCheckboxes);
    setSelectedItems(updatedSelectedItems);
  };







  ///////////////////////////////////////////////////////////////////////////////////

  const [isActive1, setIsActive1] = useState(false);

  const [checkedCheckboxes_p, setCheckedCheckboxes_p] = useState([]);
  const [remainingDatas, setRemainingDatas] = useState([]);

  const handleCheckboxChange_p = (checkboxName) => {
    // Toggle checkbox state
    const isChecked = checkedCheckboxes_p.includes(checkboxName);
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes_p.filter((name) => name !== checkboxName)
      : [...checkedCheckboxes_p, checkboxName];
    const remainingData = selectedItems.filter((item) => !updatedCheckboxes.includes(item.clientId));
    setCheckedCheckboxes_p(updatedCheckboxes);
    setRemainingDatas(remainingData)
    // console.log(updatedCheckboxes)
    // console.log(remainingData)
  };
  ///////////////////////////////////////////////////////////////////////////////////
  const [isActive2, setIsActive2] = useState(false);
  const [checkedCheckboxes_s, setCheckedCheckboxes_s] = useState([]);

  const handleCheckboxChange_s = (checkboxName) => {
    // Toggle checkbox state
    const isChecked = checkedCheckboxes_s.includes(checkboxName);
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes_s.filter((name) => name !== checkboxName)
      : [...checkedCheckboxes_s, checkboxName];
    // console.log(updatedCheckboxes)
    setCheckedCheckboxes_s(updatedCheckboxes);

  };

  const SetFamilyIdToClients = async () => {

    // console.log('Checked Checkboxes:', checkedCheckboxes);
    // console.log(`Family${familyCount + 1}`)
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "clientIds": checkedCheckboxes,
        "familyIds": `Family${familyCount + 1}`
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/SaveFamily`, requestOptions)
      if (response.status === 200) {
        const secondFunctionResponse = await handleSetPrimarySecondaryClients();
        if (secondFunctionResponse === 200) {
          console.log(secondFunctionResponse === 200)
          await Swal.fire("Success!", "Family grouped successfully.", "success")
          window.location.reload();
        } else {
          await Swal.fire("Failed!", "Failed to group family!", "error")
          window.location.reload();
        }
      } else {
        Swal.fire("Failed!", "Failed to update family!", "error")
      }
    } catch (error) {
      console.log(error)
    }




  }
  const handleSetPrimarySecondaryClients = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "primaryclientIds": checkedCheckboxes_p,
        "setPrimaryRelation": "Primary_Member",
        "secondaryclientIds": checkedCheckboxes_s,
        "setSecondaryRelation": "Secondary_Member"
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      const response = await fetch(`${url_}/setFamilyrelation`, requestOptions)
      return response.status
    } catch (error) {

    }

    // console.log("Primary Clients:", checkedCheckboxes_p);
    // console.log("secondary Clients:", checkedCheckboxes_s);
  };



  return (
    <>
      <div style={{ width: "98%" }}>
        <div >
          <div className='d-flex flex-column align-items-center mt-4 mb-3'>
            <h2 className='d-flex justify-content-center'><b>Family Group's</b></h2>


          </div>
        </div>
        <hr style={{ backgroundColor: "#d9d3d3", height: "1px", borderRadius: "5px" }} />

        <div style={{ height: "70vh", overflowY: "auto" }}>
          <>
            <div className='d-flex flex-column justify-content-center'>
              <table className="table table-striped ">
                <thead>
                  <tr style={{ backgroundColor: "#ffd401e6" }}>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col" className="text-center">NAME</th>
                    <th scope="col" className="text-center">PAN</th>
                    <th scope="col" className="text-center">Family ID</th>
                    <th scope="col" className="text-center">Family Order</th>
                  </tr>
                </thead>
                <tbody>


                  {newArraySorted.map((item, index) => (

                    <tr >
                      <td className="text-center">
                        <input
                          type="checkbox"
                          id={item.clientId}
                          checked={checkedCheckboxes.includes(item.clientId)}
                          onChange={() => handleCheckboxChange(item.clientId, item)}
                        />
                      </td>
                      <td className='text-center'>{item.name}</td>
                      <td className='text-center'>{item.pan}</td>
                      <td className='text-center'>{item.familyId}</td>
                      <td className='text-center'>{item.fRelation}</td>

                    </tr>
                  ))}



                </tbody>
              </table>
            </div>
          </>
        </div>


        <div className='mt-3 d-flex justify-content-center w-100'>
          {checkedCheckboxes.length === 0 ? (
            <button className={`${style.Family_Group_btn} d-flex justify-content-center`} onClick={() => Swal.fire("Please select atleast one client !")} ><b>NEXT</b></button>
          ) : (
            <button className={`${style.Family_Group_btn} d-flex justify-content-center`} data-toggle="modal" data-target="#exampleModal"><b>NEXT</b></button>
          )}
        </div>
      </div>



      <>


        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Set Priority..</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ height: "auto", overflowY: "auto" }}>

                <>

                  {/* First dropdown */}
                  <div className={`${style.wrapper} ${isActive1 ? 'active' : ''}`}>
                    <div className={style.select_btn} onClick={() => setIsActive1(!isActive1)}>
                      <span>{checkedCheckboxes_p.length === 0 ? "Select Primary Members" : `${checkedCheckboxes_p.length} Selected`}</span>
                      {isActive1 ?
                        <i className="uil uil-angle-down"></i>
                        :
                        <i className="uil uil-angle-up"></i>}
                    </div>
                    {isActive1 && <>
                      <div className={style.content}>

                        <ul className={style.options}>

                          {selectedItems.map((P_items, index) => (
                            <li>
                              <div>
                                <input
                                  type="checkbox"
                                  id={P_items.clientId}
                                  checked={checkedCheckboxes_p.includes(P_items.clientId)}
                                  onChange={() => handleCheckboxChange_p(P_items.clientId)}
                                  className='mr-3'
                                />
                                <label htmlFor={P_items.clientId}>{P_items.name}</label>
                              </div>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </>}
                  </div>
                </>


                <>
                  {/* Second dropdown */}

                  <div className={`${style.wrapper} ${isActive2 ? 'active' : ''}`}>
                    <div className={style.select_btn} onClick={() => setIsActive2(!isActive2)}>
                      <span>{checkedCheckboxes_s.length === 0 ? "Select Secondary Members" : `${checkedCheckboxes_s.length} Selected`}</span>

                      {isActive2 ?
                        <i className="uil uil-angle-down"></i>
                        :
                        <i className="uil uil-angle-up"></i>}
                    </div>
                    {isActive2 && <>
                      <div className={style.content}>

                        <ul className={style.options}>

                          {remainingDatas.map((S_items, index) => (
                            <li>
                              <div>
                                <input
                                  type="checkbox"
                                  id={S_items.clientId}
                                  checked={checkedCheckboxes_s.includes(S_items.clientId)}
                                  onChange={() => handleCheckboxChange_s(S_items.clientId)}
                                  className='mr-3'
                                />
                                <label htmlFor={S_items.clientId}>{S_items.name}</label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>}
                  </div>
                </>




              </div>
              <div class="modal-footer">
                <div className='mt-3 d-flex justify-content-center w-100'>
                  <button className={`${style.Family_Group_btn} d-flex justify-content-center`} onClick={SetFamilyIdToClients}><b>Group Famiy</b></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>


    </>
  );
}

export default FamilyGroup;
