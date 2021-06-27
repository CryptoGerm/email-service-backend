import express from 'express';
import chalk from 'chalk';
import CORS from 'cors';

import { logger, morganLogs, gracefulExit, bodyParser, security, compression } from './lib';
import config from './config';

import db from './utils/db';
import scheduler from './utils/scheduler';

import routes from './routes/v1';

export default async () => {
  const APIversion = 'v1';
  process
    .on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit)
    .on('uncaughtException', gracefulExit)
    .on('unhandledRejection', gracefulExit);

  const app = express();
  security(app);
  compression(app);
  bodyParser(app);
  morganLogs(app);

  app.use(CORS());
  app.use(`/${APIversion}/`, routes);
  app.get('/', (req, res) => res.status(200).send("Hello from stuti's email service"));
  try {
    db();
    scheduler.start();
    app.listen(config.port, () => {
      logger.info(chalk.hex('#009688').bold(`[Server started on ${config.nodeEnv} environment on port ${config.port}]`));
    });
  } catch (error) {
    logger.error(error);
  }
};
