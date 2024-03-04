import React, { useEffect, useState } from 'react';
import './TicketsTable.css';

const TicketsTable: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/tickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Erreur lors de la récupération des tickets:', error));
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>ID de l'événement</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.price}</td>
              <td>{ticket.category}</td>
              <td>{ticket.eventId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsTable;
