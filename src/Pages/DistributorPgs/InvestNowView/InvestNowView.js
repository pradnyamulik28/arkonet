import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url_ } from '../../../Config';


const InvestNowView = () => {
 
  const { title } = useParams();
  useEffect(() => {

    InvestNowMailView();
  }, []);

  
  const distributor_mail = window.localStorage.getItem('email');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [InvestNowClientdata, setInvestNowClientdata] = useState([]);
  
  const InvestNowMailView = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/distrubutor/Invest/allrecords?InvestNow_Email=${distributor_mail}&category=${title}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setInvestNowClientdata(result)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <div className='text-center mt-4 mb-5'>
        <h3 className='display-3'><b>{title}</b></h3>

      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Subject</th>
              <th scope="col">Date</th>

            </tr>
          </thead>
          <tbody>
            {InvestNowClientdata.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.subject}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvestNowView;
