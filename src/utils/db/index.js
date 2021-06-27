import chalk from 'chalk';
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import { logger } from '../../lib';
import config from '../../config';

export default async (url = config.db.uri) => {
  if (mongoose.connection.readyState !== 1) {
    logger.info(`Connecting to Mongo ${url}...`);
    mongoose.connect(
      url,
      {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          logger.error('Could not connect to MongoDB!');
        }
        mongoose.set('debug', true);
      }
    );
    mongoose.connection.on('error', (err) => {
      if (err.message.code === 'ETIMEDOUT') {
        logger.warn('Mongo connection timeout!', err);
        setTimeout(() => {
          mongoose.createConnection(config.db.uri, config.db.options);
        }, 1000);
        return;
      }
      logger.error('Could not connect to MongoDB!');
      return logger.error(err);
    });
    autoIncrement.initialize(mongoose.connection);

    mongoose.connection.once('open', () => {
      logger.info(chalk.yellow.bold('Mongo DB connected.'));
    });
  } else {
    logger.info('Mongo already connected.');
  }
};
