
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
import ClientHome from "./ClientHome/ClientHome";
import GstDashboard from "./GstDashboard/GstDashboard";
import GstFolder from "./GstFolder/GstFolder";
import GstMonthly from "./GstMonthly/GstMonthly"
import ClientHelp from "./ClientHelp/ClientHelp";
function ClientPages() {
  return (
    <SidebarProvider>
      <ClientSideBar />
    <Routes>        
      <Route path="" element={<ClientLogin />} />
      <Route path="clientpasscheck" element={<ClientPassCheck />} />
      <Route path="clientpasscheck/clienthome" element={<ClientHome />} />
      <Route path="clientdashboard/clientincometax" Component={ClientDocFolder} />
      <Route path="clientdashboard/clientincometax/clientfileview" element={<ClientFileView />} />
      <Route path="clientdashboard/gstdashboard" Component={GstDashboard} />
      <Route path="clientdashboard/gstdashboard/gstfolder" Component={GstFolder} />
      <Route path="clientdashboard/gstdashboard/gstfolder/gstmonthly" Component={GstMonthly} />
      <Route path="caprofile" Component={CAProfile} />
      <Route path="investnow" Component={InvestNow} />
      <Route path="clienthome" element={<ClientHome />} />
      <Route path="clientdashboard" element={<ClientDashboard />} />
      <Route path="help" Component={ClientHelp} />
    </Routes>
    </SidebarProvider>
  );
}

export default ClientPages;
