import express, { Application } from 'express';
import cors from 'cors'
import router from './app/router';
import globalErrHandler from './app/middleware/globalErrorHandling';
import notFound from './app/middleware/notFound';


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api',router)

// GENERIC RESPONSE
app.get('/', (req, res) => {
    res.send('Hey ! Developers World');
  });
  
  // GLOBAL ERR HANDLER
  app.use(globalErrHandler);
  
  //NOT-FOUND
  app.use(notFound);

export default app;