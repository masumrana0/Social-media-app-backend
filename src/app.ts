/**
 * Title: 'Initial Project with professtional Error Handling setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 18-01-2024
 *
 */

import express, { Application } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHanlder';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Error handler
app.use(GlobalErrorHandler);

export default app;
