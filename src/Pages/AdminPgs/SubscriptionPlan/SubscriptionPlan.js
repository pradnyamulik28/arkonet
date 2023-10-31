import React, { useEffect, useState } from 'react';
import style from './SubscriptionPlan.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';

const SubscriptionPlan = () => {
  const location=useLocation();
  console.log(location.pathname)
  const [isVisiting,setIsVisiting]=useState(false);

  const storedToken=localStorage.getItem("jwtToken")
  useEffect(()=>{
    if(
      location.pathname==="/subscriptionplan" || location.pathname==="/"
    ){
      setIsVisiting(true)
    }



    getSubscriptionPlan();
  },[location.pathname])
  const Navigate = useNavigate()
  const [plans,setPlans] = useState([
    // {
    //   total_clients: "1-250",
    //   subscription: "4,000",
    //   subsplan: "regular",
    //   value:"1-250"
    // },
    // {
    //   total_clients: "251-500",
    //   subscription: "6,000",
    //   subsplan: "regular",
    //   value:"251-500"
    // },
    // {
    //   total_clients: "501-1000",
    //   subscription: "9,000",
    //   subsplan: "regular",
    //   value:"501-1000"
    // },
    // {
    //   total_clients: "1001-1500",
    //   subscription: "12,000",
    //   subsplan: "regular",
    //   value:"1001-1500"
    // },
    // {
    //   total_clients: "1501-2000",
    //   subscription: "15,000",
    //   subsplan: "regular",
    //   value:"1501-2000"
    // },
    // {
    //   total_clients: "2001-3000",
    //   subscription: "20,000",
    //   subsplan: "regular",
    //   value:"2001-3000"
    // },
    // {
    //   total_clients: "3001-4000",
    //   subscription: "25,000",
    //   subsplan: "regular",
    //   value:"3001-4000"
    // },
    // {
    //   total_clients: "4001-5000",
    //   subscription: "30,000",
    //   subsplan: "regular",
    //   value:"4001-5000"
    // },
    // {
    //   total_clients: "Extra 50",
    //   subscription: "800",
    //   subsplan: "additional",
    //   value:"50"
    // },
    // {
    //   total_clients: "Extra 100",
    //   subscription: "1600",
    //   subsplan: "additional",
    //   value:"100"
    // },


  ])




  async function getSubscriptionPlan(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

fetch(`${url_}/subscriptionPacks`, requestOptions)
  .then(response => response.json())
  .then(result => {//console.log(result)
    setPlans(result);
  })
  .catch(error => console.log('error', error));

  }




  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event, index) => {
    if (selectedCheckbox === index) {
      setSelectedCheckbox(null);
    } else {
      setSelectedCheckbox(index);
    }
  };

  const GOTO = (title) => {
    
    if(selectedCheckbox===null){
      swal.fire("Please select a plan.")
      
    }
    else{
      console.log(plans[selectedCheckbox])
      Navigate('subcription')
    }
    
    //   , {
    //   state: {
    //     clientId: clientid,
    //     Year: year,
    //     Title: title
    //   },
    // })

  }
  return (
    <div style={{ margin: "0 70px" }}>
      <div className={`${style.Subplan_title} text-center mt-4 mb-2`}>
        <h2><b>SUBSCRIPTION PLAN</b></h2>
        {(
      location.pathname==="/subscriptionplan" || location.pathname==="/"
    )&&<span className={`${style.seperator}`}></span>}
      </div>
      <div className={`${style.Subplan_para} text-center display-6 mt-1`}>
        <p>
          In this digital world, subscribe TAXKO at less than your printing paper cost. Serve your clients with more efficient manner. Access anytime & anywhere.
        </p>
      </div>
      <div className={`${style.sub_table}`}>
        <table class="table table-striped ">
          <thead>
            <tr>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center">TOTAL CLIENTS</th>
              <th scope="col" class="text-center">SUBSCRIPTIONS</th>

            </tr>
          </thead>
          <tbody>
            {plans.map((item, index) => (
              <tr key={index}>
                <td scope="row" class="text-center">
                  <input type="checkbox" name={item.subsplan} id="" checked={selectedCheckbox === index}
                  onChange={(e) => handleCheckboxChange(e, index)}  value={item.value} /></td>
                <td className='text-center'>{item.subtype}</td>
                <td className='text-center'>&#8377;{item.subscriptionprice}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>

        <div className='d-flex justify-content-end'>
          <p className={style.Subplan_para}>
            Above prices are exclusive of GST
          </p>
        </div>
        {!isVisiting&&<div className={`d-flex justify-content-center ${style.sub_paybtn}`}>
          <button onClick={GOTO}>PAY NOW</button>
        </div>}
      </div>
    </div>
  );
}

export default SubscriptionPlan;
