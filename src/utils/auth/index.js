/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../../config';

export const hashPassword = (password) => bcrypt.hashSync(password, 8);

export const generateToken = (user) =>
  jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes,
  });

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
