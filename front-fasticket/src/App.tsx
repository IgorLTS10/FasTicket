import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AllEvents from './components/AllEvents';
import BuyTickets from './components/BuyTickets'; // Importez votre nouveau composant de page
import EventsCrud from './components/EventCrud';
import EventsByType from './components/EventsByType';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/AllEvents" Component={AllEvents} />
          <Route path="/buy-tickets/:eventId" element={<BuyTickets />} />
          <Route path="/events-crud" element={<EventsCrud />} />
          <Route path="/events/type/:type" element={<EventsByType />} />
          <Route path="/categories" />
          <Route path="/about" />
          <Route path="/contact" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
