import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



import ClientLogin from '../ClientMobilePgs/ClientLogin/ClientLogin'

const ClientPages = () => {
  return (
    <div>
      <Router>

        <div className="container-fluid">
          <div className="row">


            <Routes>
              <Route path="/" element={<ClientLogin />} />

            </Routes>




          </div>
        </div>

      </Router>
    </div>
  );
}

export default ClientPages;
