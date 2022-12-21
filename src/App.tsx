import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardTemplate from './Template/DashboardTemplate/DashboardTemplate';
import Home from './Page/Home/Home';
import TicketManagement from './Page/TicketManagement/TicketManagement';
import TicketControl from './Page/TicketControl/TicketControl';
import Setting from './Page/Setting/Setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<DashboardTemplate />}>
          <Route index path='' element={<Home />} />
          <Route path='ticketmanagement' element={<TicketManagement />} />
          <Route path='ticketcontrol' element={<TicketControl />} />
          <Route path='setting' element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
