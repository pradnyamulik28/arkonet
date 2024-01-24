
import React, { useState } from 'react';
import style from './Help.module.css'
import { useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useEffect } from 'react';
const Help = () => {
  const Navigate = useNavigate();


  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [HelpClientdata, setHelpClientdata] = useState([]);

  useEffect(() => {
    GetTotalClientEmail();

  }, []);

  const GetTotalClientEmail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/help/allrecords?userId=${user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setHelpClientdata(result)
      })
      .catch(error => console.log('error', error));
  }

  const Goto = () => {
    Navigate('createnewticket'
      // , {
      //   state: {
      //     ClientID: clientid,
      //     Year: yearRange
      //   },
      // }
    )
  }
  const GOTO = (name, quarry, details, mdate) => {
    Navigate('helpclientmailview'
      , {
        state: {
          ClientName: name,
          ClientQuarry: quarry,
          ClientDetails: details,
          MailDate: mdate
        },
      }
    )
  }
  return (
    <div>
      <div className='d-flex justify-content-between mt-5 mb-4'>
        <h3>Help</h3>
        <h6 className={`mr-5 ${style.help_btn}`}><button onClick={Goto}> CREATE NEW TICKET</button></h6>
      </div>
      <div>
        <table className={`table table-striped ${style.helpTable}`}>
          <thead class="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Quarry</th>
              <th scope="col">Details</th>

              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {HelpClientdata.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{(item.query).replace("in GST, for the", "GST,")}</td>
                <td className={style.details}>{(item.detail).slice(0, 60)}</td>
                <td onClick={() => GOTO(item.name, item.query, item.detail, item.date)} style={{ color: "blue", cursor: "pointer" }}>View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Help;

