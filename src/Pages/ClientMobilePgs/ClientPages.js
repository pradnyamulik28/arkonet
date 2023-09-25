
import React from "react";
import { Route, Router, Routes } from 'react-router-dom';

import ClientLogin from "./ClientLogin/ClientLogin";
import ClientDocFolder from './ClientDocFolder/ClientDocFolder';
import ClientFileView from "./ClientFileView/ClientFileView";
import ClientPassCheck from "./ClientPassCheck/ClientPassCheck";
import CAProfile from "./CAProfile/CAProfile";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import InvestNow from "./InvestNow/InvestNow";
import { SidebarProvider } from "./ClientSideBar/SidebarContext";
import ClientSideBar from "./ClientSideBar/ClientSideBar";

function ClientPages() {
  return (
    <SidebarProvider>
      <ClientSideBar />
    <Routes>        
      <Route path="" element={<ClientLogin />} />
      <Route path="clientpasscheck" element={<ClientPassCheck />} />
      <Route path="clientpasscheck/clientdocfolder" element={<ClientDocFolder />} />
      <Route path="clientpasscheck/clientdocfolder/clientfileview" element={<ClientFileView />} />
      <Route path="caprofile" Component={CAProfile} />
      <Route path="clientdashboard" Component={ClientDashboard} />
      <Route path="investnow" Component={InvestNow} />
    </Routes>
    </SidebarProvider>
  );
}

export default ClientPages;
