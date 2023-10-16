
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
import GstMonthly from "./GstMonthly/GstMonthly";
import GstFileView from "./GstFileView/GstFileView";
import ClientHelp from "./ClientHelp/ClientHelp";
import ClientPassChange from "./ClientPassChange/ClientPassChange";
import PaymentDetails from "./PaymentDetails/PaymentDetails";
import KYC from "./KYC/KYC";



function ClientPages() {
  return (
    <SidebarProvider>
      <ClientSideBar />
    <Routes>        
      <Route path="" element={<ClientLogin />} />
      <Route path="clientpasscheck" element={<ClientPassCheck />} />
      <Route path="clientpasscheck/clienthome" element={<ClientHome />} />
      <Route path="clientpasscheck/clienthome/gstdashboard" element={<GstDashboard />} />

      <Route path="clientdashboard" element={<ClientDashboard />} />
      <Route path="clientdashboard/clientincometax" element={<ClientDocFolder />} />
      <Route path="clientdashboard/clientincometax/clientfileview" element={<ClientFileView />} />

      
      <Route path="clientdashboard/gstfolder" element={<GstFolder />} />
      <Route path="clientdashboard/gstfolder/gstmonthly" element={<GstMonthly />} />
      <Route path="clientdashboard/gstfolder/gstmonthly/gstfile" element={<GstFileView />} />

      <Route path="clientdashboard/kyc" element={<KYC />} />
      
      <Route path="caprofile" element={<CAProfile />} />
      <Route path="caprofile/payment" element={<PaymentDetails />} />
      
      <Route path="investnow" element={<InvestNow />} />            
      <Route path="help" element={<ClientHelp />} />
      <Route path="changepass" element={<ClientPassChange />} />

    </Routes>
    </SidebarProvider>
  );
}

export default ClientPages;
