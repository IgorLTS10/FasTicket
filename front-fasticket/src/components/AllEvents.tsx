import React, { useEffect, useState } from 'react';
import './AllEvents.css'; // Assurez-vous d'importer la feuille de style CSS correcte
import { Link } from 'react-router-dom'; // Importez Link de react-router-dom

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="cards-container">
      {events.map(event => (
        <div className="card" key={event.id}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>Date: {event.startDate}</p>
        <p>Lieu: {event.location}</p>
        <p>Type: {event.type}</p>
        <p>Stock: {event.stock}</p>
        <Link to={`/buy-tickets/${event.id}`} className="buy-tickets-btn">Acheter des billets</Link>
      </div>
      ))}
    </div>
  );
};

export default AllEvents;
