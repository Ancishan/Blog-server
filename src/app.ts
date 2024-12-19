import express, { Application } from 'express';
import cors from 'cors'
import router from './app/router';


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api',router)

export default app;