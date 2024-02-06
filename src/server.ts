/**
 * Title: 'Initial Project with professtional Error Handling setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 18-01-2024
 *
 */

import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { Server } from 'http';
// import { logger, errorLogger } from './shared/logger';

process.on('uncaughtException', () => {
  console.log('uncaughtException detected ...');
  process.exit(1);
});

let server: Server;

const Run = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database is connected');
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('something is wrong', error);
  }

  process.on('unhandledRejection', (reason, promise) => {
    console.log(
      `Unhandle Rejection is detected resion ${reason}  , and promise ${promise} we are closing our server`,
    );
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

Run();

process.on('SIGTERM', () => {
  console.log('Sigterm is Recived');
  if (server) {
    server.close();
  }
});
