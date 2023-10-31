import React from 'react';
import style from './NotificationPage.module.css'

const NotificationPage = () => {
  return (
    <div>
      <div className='d-flex justify-content-between mt-4 mb-5'>
        <h2>Help</h2>
        <h6 className={`mr-5 ${style.help_btn}`}><button type="button">CREAT NEW TICKET</button></h6>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Quarry</th>
              <th scope="col">Details</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PAVAN</td>
              <td>Income Tax</td>
              <td>Details</td>
              <td>View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotificationPage;
