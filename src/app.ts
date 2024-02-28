import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHanlder';
import router from './app/modules/routes';
import handleNotFoundApi from './errors/handleNotFoundError';

const app: Application = express();
const server = http.createServer(app);

// socket creation
export const io = new Server(server);

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['https://circleup-client.vercel.app', 'http://localhost:3000'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Server Working successfully');
});

app.use('/api/v1/', router);
// Global Error handler
app.use(GlobalErrorHandler);

// handle not found api/ route
app.use(handleNotFoundApi);

export default app;
