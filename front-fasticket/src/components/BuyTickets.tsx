import React from 'react';
import { useParams } from 'react-router-dom';
import './BuyTickets.css';

const BuyTickets: React.FC = () => {
  const { eventId } = useParams(); // Récupère l'id de l'événement depuis l'URL

  const ticketCategories = [
    { category: 'Catégorie 1', price: 100 },
    { category: 'Catégorie 2', price: 80 },
    { category: 'VIP', price: 200 },
  ];

  const buyTicket = (price: number, category: string) => {
    fetch(`http://localhost:4000/tickets/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, category }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert("Billet acheté avec succès !");
    })
    .catch(error => {
      console.error('Erreur lors de l\'achat du billet:', error);
      alert("Erreur lors de l'achat du billet.");
    });
  };

  return (
    <div className="tickets-container">
      {ticketCategories.map((ticket, index) => (
        <div className="ticket-card" key={index}>
          <h3>{ticket.category}</h3>
          <p>Prix: {ticket.price}€</p>
          <button onClick={() => buyTicket(ticket.price, ticket.category)} className="buy-ticket-btn">Acheter le billet</button>
        </div>
      ))}
    </div>
  );
};

export default BuyTickets;
