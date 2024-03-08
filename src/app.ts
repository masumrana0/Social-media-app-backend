import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHanlder';
import router from './app/modules/routes';
import handleNotFoundApi from './errors/handleNotFoundError';

const app: Application = express();
export const server = http.createServer(app);

// socket creation

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

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

export const getReceiverSocketId = (receiverId: string) => {
  return userSoketMap[receiverId];
};

const userSoketMap: { [userId: string]: string } = {}; // {userId: soketID}

io.on('connection', soket => {
  console.log('a user connected', soket.id);
  const userId: string | undefined = soket.handshake.query.userId as
    | string
    | undefined;

  if (userId !== undefined) {
    userSoketMap[userId] = soket.id;
  }
  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSoketMap));

  console.log('the active user', userId);

  // soket.on() is used to listen to the events. can be used both on client and server side
  soket.on('disconnect', () => {
    console.log('user disconnected', soket.id);
    delete userSoketMap[userId as string];
    io.emit('getOnlineUsers', Object.keys(userSoketMap));
  });
});

app.use('/api/v1/', router);
// Global Error handler
app.use(GlobalErrorHandler);

// handle not found api/ route
app.use(handleNotFoundApi);

export default app;
