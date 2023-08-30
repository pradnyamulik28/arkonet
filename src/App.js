import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';

function App() {
  return (

    <div>
      <Router>
        <Routes>
        <Route path='/*' element={<Adminhome />} />
          {/* <Route path='/admin/*' element={<Adminhome />} /> */}
          {/* <Route path='/client/*' element={<ClientPages />} /> */}
        </Routes>
      </Router>
    </div>

  );
}

export default App;
