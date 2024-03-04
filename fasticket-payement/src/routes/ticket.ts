import express, { Request, Response } from 'express';
import axios from 'axios';
import { Ticket } from '../models/Ticket';

const router = express.Router();
let tickets: Ticket[] = [];

// Route pour créer un ticket
router.post('/:eventId', async (req: Request, res: Response) => {
    const { price, category } = req.body;
    const eventId = req.params.eventId;

    try {
        // Récupérer les détails de l'événement depuis votre première API
        const response = await axios.get(`http://localhost:5000/events/${eventId}`);
        const event = response.data;

        // Créer le ticket avec toutes les informations nécessaires
        const newTicket = {
            id: String(tickets.length + 1),
            eventId: eventId,
            eventName: event.title,
            date: event.startDate,
            location: event.location,
            price: price,
            category: category // Vous pouvez définir la catégorie du ticket ici si nécessaire
        };

        // Ajouter le ticket à la liste des tickets
        tickets.push(newTicket);

        // Répondre avec le ticket créé
        res.status(201).json(newTicket);
    } catch (error) {
        // Gérer les erreurs de récupération des détails de l'événement
        console.error('Error fetching event details:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des détails de l\'événement' });
    }

});

// Route pour récupérer tous les tickets
router.get('/', (req: Request, res: Response) => {
    // Vérifiez si des tickets sont disponibles
    if (tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found' });
    }

    // Renvoyer la liste de tickets sous forme de réponse JSON
    res.status(200).json(tickets);
});

export default router;
