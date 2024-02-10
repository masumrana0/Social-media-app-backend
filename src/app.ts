import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHanlder';
import router from './app/modules/routes';
import handleNotFoundApi from './errors/handleNotFoundError';

const app: Application = express();

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: '*',
//   }),
// );

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://circleup-client.vercel.app'],
    credentials: true,
  }),
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/', (req, res) => {
  res.send('Server Working successfully');
});

app.use('/api/v1/', router);
// Global Error handler
app.use(GlobalErrorHandler);

// handle not found api/ route
app.use(handleNotFoundApi);

export default app;
