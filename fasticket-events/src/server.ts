import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/event';

const app: Application = express();
const port = 5000;

let eventsInMemory: any[] = [];

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.use('/events', cors(), eventRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API, gestion des événements');
});

app.get('/events/search/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;
    const filteredEvents = eventsInMemory.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    res.json(filteredEvents);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
