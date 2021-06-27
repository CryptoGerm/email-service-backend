import { createLogger, format, transports } from 'winston';
import config from '../config';

const options = {
  console: {
    level: config.logging.consoleLevel,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
const logger = createLogger({
  level: 'debug',
  transports: [new transports.Console(options.console)],
  format: format.combine(format.colorize(), format.simple()),
  exitOnError: false,
});

export default logger;
