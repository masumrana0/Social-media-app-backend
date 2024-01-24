/**
 * Title: 'Initial Project with professtional Error Handling setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 18-01-2024
 *
 */

import cors from 'cors';
import express, { Application } from 'express';

import GlobalErrorHandler from './app/middlewares/GlobalErrorHanlder';
import router from './app/modules/routes';
import handleNotFoundApi from './errors/handleNotFoundError';

const app: Application = express();

app.use(cors());  

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server Working successfully');
});

app.use('/api/v1/', router);
// Global Error handler
app.use(GlobalErrorHandler);

// handle not found api/ route
app.use(handleNotFoundApi);

export default app;
