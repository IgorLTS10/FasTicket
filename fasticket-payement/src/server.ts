import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import ticketRoutes from './routes/ticket'; // Importez les routes des tickets depuis le fichier correspondant

const app: Application = express();
const port = 4000;

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

// Utilisez les routes des tickets
app.use('/tickets', ticketRoutes); // Préfixez les routes des tickets avec /api pour les distinguer des autres routes

app.get('/', (req: Request, res: Response) => {
    res.send('API, gestion des tickets');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
