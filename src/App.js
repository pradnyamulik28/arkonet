import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';

function App() {
  return (
    // <div >
    //   <Adminhome />
    //   <ClientPages />
    // </div>
    <div>
      <Router>
        <Switch>

          <Route path='/admin' element={<Adminhome />} />
          <Route path='/client' element={<ClientPages />} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
