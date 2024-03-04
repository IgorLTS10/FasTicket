import express, { Request, Response } from 'express';
import { Event } from '../models/Event';

const router = express.Router();
let events: Event[] = [];

// Créer un événement
router.post('/', (req: Request, res: Response) => {
    const { title, description, startDate, location, type, stock } = req.body;
    if (!title || !description || !startDate || !location || !type || stock === undefined) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    const newEvent: Event = { id: String(events.length + 1), title, description, startDate, location, type, stock };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Obtenir tous les événements
router.get('/', (req: Request, res: Response) => {
    if (events.length === 0) {
        return res.status(404).json({ message: 'Aucun événement trouvé' });
    }
    res.status(200).json(events);
});

router.get('/:id', (req: Request, res: Response) => {
    // Récupérer l'ID de l'événement à partir des paramètres de la requête
    const eventId: string = req.params.id;
    
    // Rechercher l'événement dans le tableau d'événements
    const event: Event | undefined = events.find(event => event.id === eventId);

    // Si l'événement n'est pas trouvé, renvoyer une réponse 404
    if (!event) {
        return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Si l'événement est trouvé, renvoyer les informations de l'événement
    res.status(200).json(event);
});

// Mettre à jour un événement
router.put('/:id', (req: Request, res: Response) => {
    const eventId: string = req.params.id;
    const { title, description, startDate, location, type, stock } = req.body;
    const eventToUpdate: Event | undefined = events.find(event => event.id === eventId);
    if (!eventToUpdate) {
        return res.status(404).json({ message: 'Événement non trouvé' });
    }
    if (!title || !description || !startDate || !location || !type || stock === undefined) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    eventToUpdate.title = title;
    eventToUpdate.description = description;
    eventToUpdate.startDate = startDate;
    eventToUpdate.location = location;
    eventToUpdate.type = type;
    eventToUpdate.stock = stock;
    res.status(200).json(eventToUpdate);
});

// Supprimer un événement
router.delete('/:id', (req: Request, res: Response) => {
    const eventId: string = req.params.id;
    const eventIndex: number = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
        return res.status(404).json({ message: 'Événement non trouvé' });
    }
    events.splice(eventIndex, 1);
    res.status(204).send();
});

// Obtenir les événements par type
router.get('/type/:type', (req: Request, res: Response) => {
    const eventType = req.params.type;
    const filteredEvents = events.filter(event => event.type === eventType);
    if (filteredEvents.length === 0) {
        return res.status(404).json({ message: 'Aucun événement trouvé pour ce type' });
    }
    res.status(200).json(filteredEvents);
});

export default router;
