import React from 'react';

const UDashboard = () => {

  var userid = window.localStorage.getItem('userid');
  var username = window.localStorage.getItem('username');
  var token = window.localStorage.getItem('token');

  return (
    <>
      <div className="container">
        <h3>User ID :{userid}</h3>
        <h1>Name :{username}</h1>
        <h1>Token :{token}</h1>
        <button>Client Registr ation</button>
      </div>
    </>
  );
}

export default UDashboard;
