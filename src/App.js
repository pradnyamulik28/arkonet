import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';
import ChatBot from "../src/components/ChatBot/ChatBot"

function App() {


  return (

    <div>
      <Router>
        <Routes>

          <Route path='/admin/*' element={<Adminhome />} />
          <Route path='/client/*' element={<ClientPages />} />
        </Routes>
      </Router>
      
    <ChatBot />
    </div>

  );
}

export default App;
