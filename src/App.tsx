import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardTemplate from './Template/DashboardTemplate/DashboardTemplate';
import Home from './Page/Home/Home';
import TicketManagement from './Page/TicketManagement/TicketManagement';
import TicketControl from './Page/TicketControl/TicketControl';
import ListTicketPackage from './Page/ListTicketPackage/ListTicketPackage';
import AddTicketPackage from './Page/ListTicketPackage/AddTicketPackage/AddTicketPackage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<DashboardTemplate />}>
          <Route index path='' element={<Home />} />
          <Route path='ticketmanagement' element={<TicketManagement />} />
          <Route path='ticketcontrol' element={<TicketControl />} />
          <Route path='setting' element={<ListTicketPackage />} />
          <Route path='setting/addticketpackage' element={<AddTicketPackage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
