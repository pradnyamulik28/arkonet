import React, { useEffect, useState } from 'react';
import style from './SubscriptionPlan.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';

const SubscriptionPlan = () => {

  const Navigate = useNavigate();
  const location=useLocation();
  const userPAN=localStorage.getItem("pan");

  //console.log(location.pathname)
  const [isVisiting,setIsVisiting]=useState(false);
  const [clientCount,setClientCount]=useState(0);
  const [isPaid,setIsPaid]=useState(false);
  const [plans, setPlans] = useState([]);

  const storedToken=localStorage.getItem("jwtToken")
  useEffect(()=>{
    if(
      location.pathname==="/subscriptionplan" || location.pathname==="/"
    ){
      setIsVisiting(true)
      // getSubscriptionPlan(true);
    }
    else{
      checkNoOfClients();
    // getSubscriptionPlan(false);
    }    
    getSubscriptionPlan();
    
  },[isVisiting,isPaid,clientCount])


  async function getSubscriptionPlan() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(`${url_}/subscriptionPacks`, requestOptions);
      const result = await response.json();
      if (response.status === 200) {
        
       if(isPaid||isVisiting)
        {
          setPlans(result)
        }
        else if(!isVisiting && !isPaid){
          const finalPlanArray=result.filter((item)=>{
            return !item.subtype.includes("Extra")
          })
          //console.log(finalPlanArray)
          setPlans(finalPlanArray);
        }        
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function checkNoOfClients() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/checkstatus/sufficient/${userPAN}`,
        requestOptions
      );
      const result = await response.json();
      if (response.status === 200) {
        
        setClientCount(parseInt(result.count));
        // setClientCount(800);
        setIsPaid(result.isPaid);
        // setIsPaid(true);
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event, index) => {
    

    const planHigherClient=plans[index].subtype.split("-")[1];
    // console.log(clientCount,planHigherClient)
    if(clientCount>planHigherClient){
      swal.fire(
        {
          icon:"info",
          text:`Your existing client count ${clientCount} is which is higher than selected plan. Please select higher plan.`
        }
      )
    }
    else{if (selectedCheckbox === index) {
      setSelectedCheckbox(null);
    } else {
      setSelectedCheckbox(index);
    }}
  };

  const GOTO = (title) => {
    
    if(selectedCheckbox===null){
      swal.fire("Please select a plan.")
      
    }
    else{
      console.log(plans[selectedCheckbox])
      Navigate('subcription',
      {state:{subs_pack:plans[selectedCheckbox].subtype,
        subs_amount:plans[selectedCheckbox].subscriptionprice,
        no_of_client:plans[selectedCheckbox].accesscliet
      }})
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
    <div style={{ margin: "10px 70px" }} className={(location.pathname==="/subscriptionplan" || location.pathname==="/")&&style.box_shadow}>
      <div className={`${style.Subplan_title} text-center mt-4 mb-2`}>
        <h5><b>SUBSCRIPTION PLAN</b></h5>
        {(
      location.pathname==="/subscriptionplan" || location.pathname==="/"
    )&&<span className={`${style.seperator}`}></span>}
      </div>

      <div className={`${style.Subplan_para} text-center display-6 mt-1`}>
        <p>
        In this digital world, subscribe to TAXKO at less than your printing paper cost. Serve your clients in a more efficient manner. Access anytime and anywhere.
        </p>
      </div>
      <div className={`${style.sub_table}`}>
        <table class="table table-striped ">
          <thead>
            <tr>
              {!isVisiting&&<th scope="col" class="text-center"></th>}
              <th scope="col" class="text-center">TOTAL CLIENTS</th>
              <th scope="col" class="text-center">SUBSCRIPTIONS</th>

            </tr>
          </thead>
          <tbody>
            {plans.map((item, index) => (
              <tr key={index}>
                {!isVisiting&&<td scope="row" class="text-center">
                  <input type="checkbox" name={item.subsplan} id="" checked={selectedCheckbox === index}
                  onChange={(e) => handleCheckboxChange(e, index)}  value={item.value} /></td>}
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
