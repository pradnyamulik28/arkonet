import React, { useState, useEffect } from 'react';
import style from './ManageSubscriptionPack.module.css'
import { url_ } from '../../../Config';
import swal from 'sweetalert2';

const ManageSubscriptionPack = () => {



  useEffect(() => {
    GetSubPlan();
  }, []);

  const storedToken = localStorage.getItem("jwtToken");
  const [SubPlans, setSubPlans] = useState([])
  const [AddSubPlanData, setAddSubPlanData] = useState({
    AccessClients: "",
    SubPrice: "",
    SubType: ""

  });
  const [EditSubPlanData, setEditSubPlanData] = useState({
    AccessClients: "",
    SubPrice: "",
    SubType: "",
    id: ""
  });



  const handleChange = (e) => {
    setAddSubPlanData({ ...AddSubPlanData, [e.target.name]: e.target.value });
  };

  const EdithandleChange = (e) => {
    setEditSubPlanData({ ...EditSubPlanData, [e.target.name]: e.target.value });

  };


  const GetSubPlan = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/subscriptionPacks`, requestOptions);
      const result = await response.json();
      // console.log(result);
      setSubPlans(result)
    } catch (error) {
      console.log('error', error);
    }
  };


  const SaveSubPlan = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "subtype": AddSubPlanData.SubType,
        "accesscliet": AddSubPlanData.AccessClients,
        "subscriptionprice": AddSubPlanData.SubPrice
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/addnew/saveSubscriptionPack`, requestOptions);
      const result = await response.json();
      console.log(result);
      if (response.status === 201) {
        await swal.fire("Success.", `Plan saved successfully.`, "success")
        // console.log(result);
        window.location.reload()


      } else {
        await swal.fire("Failed.", "Failed to add plan. Please try again!!", "error")
        // console.log(AddSubPlanData);
        window.location.reload()

      }
    } catch (error) {
      console.log('error', error);
    }
  };



  const UpdateSubPlan = async (PlanId) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "subtype": EditSubPlanData.SubType,
        "accesscliet": EditSubPlanData.AccessClients,
        "subscriptionprice": EditSubPlanData.SubPrice
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/update/saveSubscriptionPack/${PlanId}`, requestOptions);
      const result = await response.text();
      // console.log(result);
      if (response.status === 200) {
        await swal.fire("Success.", `Plan updated successfully.`, "success")
        // console.log(result);
        window.location.reload()



      } else {
        swal.fire("Failed.", "Failed to update plan. Please try again!!", "error")
        // console.log(result);
        window.location.reload()

      }
    } catch (error) {
      console.log('error', error);
    }
  }


  const DeleteSubPlan = async (PlanId) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/delete/saveSubscriptionPack/${PlanId}`, requestOptions);
      const result = await response.text();
      // console.log(result);
      if (response.status === 200) {
        await swal.fire("Success.", `${result}`, "success")
        // console.log(result);
        window.location.reload()


      } else {
        swal.fire("Failed.", "Failed to delete plan. Please try again!!", "error")
        // console.log(result);
        window.location.reload()

      }
    } catch (error) {
      console.log('error', error);
    }
  }


  const GetSubPlanById = async (PlanId) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/subscriptionPacks/byid/${PlanId}`, requestOptions);
      const result = await response.json();
      // console.log(result);
      setEditSubPlanData({
        AccessClients: result.accesscliet,
        SubPrice: result.subscriptionprice,
        SubType: result.subtype

      });
    } catch (error) {
      console.log('error', error);
    }
  }


  return (
    <div>

      <div className={`${style.box_shadow}`}>
        <div className={`${style.Subplan_title} text-center`}>
          <h5><b>SUBSCRIPTION PLAN</b></h5>
          <span className={`${style.seperator}`}></span>
        </div>
        <div className={`${style.add_plan_btn} d-flex justify-content-center mb-2`}>
          <span data-toggle="modal" data-target="#exampleModalCenter1">ADD PLAN</span>

        </div>

        <div>



          <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle" >Add Plan</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="col">
                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Access Client</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputEmail3" placeholder="Enter total clients" onChange={handleChange} name='AccessClients' value={AddSubPlanData.AccessClients} />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Price</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputEmail3" placeholder="Enter price" onChange={handleChange} name='SubPrice' value={AddSubPlanData.SubPrice} />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Subtype</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputEmail3" placeholder="Enter client range " onChange={handleChange} name='SubType' value={AddSubPlanData.SubType} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                  <button type="button" class="btn btn-warning" onClick={() => SaveSubPlan()}><b>Submit</b></button>
                </div>
              </div>
            </div>
          </div>

        </div>



        <div className={`${style.sub_table}`}>
          <table class="table table-striped ">
            <thead>
              <tr>
                <th scope="col" class="text-center">TOTAL CLIENTS</th>
                <th scope="col" class="text-center">SUBSCRIPTIONS</th>
                <th scope="col" class="text-center">Action</th>

              </tr>
            </thead>
            <tbody>

              {SubPlans.map((items, index) => (

                <tr key={index}>
                  <td className='text-center'>{items.subtype}</td>
                  <td className='text-center'>{items.subscriptionprice}/-</td>
                  <td className='text-center d-flex justify-content-center' style={{ cursor: "pointer" }}>
                    <div className='mr-3 text-primary' onClick={() => GetSubPlanById(items.id)}>

                      <span data-toggle="modal" data-target="#exampleModalCenter2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                      </span>
                    </div>

                    <div className='text-danger' onClick={() => DeleteSubPlan(items.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </div>
                  </td>





                  <div>



                    <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Edit Plan</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="col">
                                <div class="form-group row">
                                  <label for="inputEmail3" class="col-sm-4 col-form-label">Access Client</label>
                                  <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail3" onChange={EdithandleChange} name='AccessClients' value={EditSubPlanData.AccessClients} />
                                  </div>
                                </div>
                                <div class="form-group row">
                                  <label for="inputEmail3" class="col-sm-4 col-form-label">Price</label>
                                  <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail3" onChange={EdithandleChange} name='SubPrice' value={EditSubPlanData.SubPrice} />
                                  </div>
                                </div>
                                <div class="form-group row">
                                  <label for="inputEmail3" class="col-sm-4 col-form-label">Subtype</label>
                                  <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail3" onChange={EdithandleChange} name='SubType' value={EditSubPlanData.SubType} />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer d-flex justify-content-center">
                            {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                            <button type="button" class="btn btn-warning" onClick={() => UpdateSubPlan(items.id)}><b>Update</b></button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div >



    </div >
  );
}

export default ManageSubscriptionPack;
