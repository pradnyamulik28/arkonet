import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';

function App() {


  useEffect(() => {
    // Add an event listener to clear local storage when the user leaves the page
    window.addEventListener('beforeunload', () => {
      localStorage.clear();
    });

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.clear();
      });
    };
  }, []);
  return (

    <div>
      <Router>
        <Routes>

          <Route path='/admin/*' element={<Adminhome />} />
          <Route path='/client/*' element={<ClientPages />} />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
