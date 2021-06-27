import chalk from 'chalk';
import stream from 'stream';
import morgan from 'morgan';
import config from '../config';
import logger from './logger';

export default (app) => {
  if (String(config.nodeEnv) === 'development') {
    const myStream = new stream.Stream();
    myStream.writable = true;
    myStream.write = (data) => {
      logger.debug(data.substring(0, data.lastIndexOf('\n')));
    };
    app.use(
      morgan(
        (tokens, req, res) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          [
            chalk.hex('#34ace0')(tokens.method(req, res)),
            chalk.hex('#ffb142')(tokens.status(req, res)),
            chalk.hex('#ff5252')(tokens.url(req, res)),
            chalk.hex('#2ed573')(`${tokens['response-time'](req, res)} ms`),
            chalk.hex('#f78fb3')(`@ ${tokens.date(req, res)}`),
          ].join(' '),
        { stream: myStream }
      )
    );
  }
};
