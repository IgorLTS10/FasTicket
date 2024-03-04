import React, { useEffect, useState } from 'react';
import './EventCrud.css';
import TicketsTable from './TicketsTable';
import Modal from 'react-modal'

Modal.setAppElement('#root'); // Prévient les problèmes d'accessibilité

const EventsCrud: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

    // Fonction pour ouvrir la popup
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Fonction pour fermer la popup
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const target = event.target as typeof event.target & {
          title: { value: string };
          description: { value: string };
          startDate: { value: string };
          location: { value: string };
          type: { value: string };
          stock: { value: string }; // Assurez-vous que la valeur du stock est correctement gérée, peut nécessiter une conversion en nombre si votre API l'exige
        };
      
        // Création de l'objet eventData avec les valeurs du formulaire
        const eventData = {
          title: target.title.value,
          description: target.description.value,
          startDate: target.startDate.value,
          location: target.location.value,
          type: target.type.value,
          stock: parseInt(target.stock.value, 10) // Convertit la valeur du stock en nombre
        };
      
        // Envoi de eventData à l'API
        fetch('http://localhost:5000/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Spécifie le type de contenu de la requête comme JSON
          },
          body: JSON.stringify(eventData), // Convertit eventData en chaîne JSON
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Événement créé avec succès:', data);
          alert('Événement créé avec succès !');
          // Ici, vous pourriez vouloir mettre à jour l'état de votre application pour refléter le nouvel événement ajouté
          closeModal(); // Supposant que closeModal est une fonction pour fermer la popup
        })
        .catch(error => {
          console.error('Erreur lors de la création de l\'événement:', error);
          alert('Erreur lors de la création de l\'événement. Veuillez réessayer.');
        });
      };

  const deleteEvent = (eventId: string) => {
    fetch(`http://localhost:5000/events/${eventId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEvents(events.filter(event => event.id !== eventId)); // Mettre à jour l'état pour refléter la suppression
      alert("Événement supprimé avec succès");
    })
    .catch(error => console.error('Erreur lors de la suppression de l\'événement:', error));
  };  
  
  return (
    <div className="table-container">
        <button onClick={openModal} className="create-event-btn">Créer un nouvel événement</button>
      
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Créer un nouvel événement">
            <div className="modal-form">
            <form onSubmit={handleSubmit}>
            <label>Titre:</label>
            <input name="title" required />
            <label>Description:</label>
            <input name="description" required />
            <label>Date de début:</label>
            <input type="date" name="startDate" required />
            <label>Localisation:</label>
            <input name="location" required />
            <label>Type:</label>
            <input name="type" required />
            <label>Stock:</label>
            <input type="number" name="stock" required />
            <button type="submit">Créer</button>
            </form>
            <button onClick={closeModal} className="close-modal-btn">Fermer</button>
            </div>
        </Modal>
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Date de début</th>
          <th>Lieu</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{event.startDate}</td>
            <td>{event.location}</td>
            <td>{event.type}</td>
            <td>
            <button onClick={() => console.log('Ouvrir la popup de modification pour', event.id)} className="edit-btn">Modifier</button>
            <button onClick={() => deleteEvent(event.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <TicketsTable />
    </div>
  );
};

export default EventsCrud;
