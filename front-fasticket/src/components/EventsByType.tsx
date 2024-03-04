import React, { useEffect, useState } from 'react';
import './EventsByType.css'; // Assurez-vous d'importer la feuille de style CSS correcte
import { Link, useParams } from 'react-router-dom'; // Importez Link de react-router-dom

const EventsByType: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const { type } = useParams<{ type: string }>();
  
    useEffect(() => {
      fetch(`http://localhost:5000/events/type/${type}`)
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error('Erreur lors de la récupération des événements:', error));
    }, [type]);

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

export default EventsByType;
