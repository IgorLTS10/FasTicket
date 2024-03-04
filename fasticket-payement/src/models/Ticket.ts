export interface Ticket {
    id: string;
    eventId: string; // ID de l'événement associé
    eventName: string; // Nom de l'événement associé
    date: Date;
    location: string;
    price: number;
    category: string;
}