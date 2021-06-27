import chalk from 'chalk';
import moment from 'moment';

import logger from './logger';

export default () => {
  logger.info(
    chalk.magentaBright.bold(
      `[ Server stopped at ${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} Uptime: ${moment
        .duration(process.uptime() * 1000)
        .humanize()} ]`
    )
  );
  return process.exit(1);
};
