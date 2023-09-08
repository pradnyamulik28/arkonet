
import React from "react";
import { Route, Routes } from 'react-router-dom';

import ClientLogin from "./ClientLogin/ClientLogin";
import ClientDocFolder from './ClientDocFolder/ClientDocFolder';
import ClientFileView from "./ClientFileView/ClientFileView";
import ClientPassCheck from "./ClientPassCheck/ClientPassCheck"

function ClientPages() {
  return (

    <Routes>
      <Route path="" element={<ClientLogin />} />
      <Route path="clientpasscheck" element={<ClientPassCheck />} />
      <Route exact path="clientdocfolder" element={<ClientDocFolder />} />
      <Route exact path="clientdocfolder/clientfileview" element={<ClientFileView />} />
    </Routes>

  );
}

export default ClientPages;
