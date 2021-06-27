import dotEnv from 'dotenv';
import { join } from 'path';
import * as pkg from '../../package.json';

dotEnv.config({ path: join(__dirname, '../../.env') });

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION,
  },
  adminKey: process.env.ADMIN_KEY,
  app: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  port: Number(process.env.PORT),
  logging: {
    consoleLevel: 'debug',
  },
  sendGridKey: process.env.SENDGRID_API_KEY,
  db: {
    uri:
      process.env.NODE_ENV === 'development'
        ? `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`
        : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`,
    dbName: process.env.MONGO_DBNAME,
  },
  googleOAuth: {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  },
};

export default config;
