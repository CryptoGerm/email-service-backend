import httpStatusCodes from 'http-status-codes';
import { OAuth2Client } from 'google-auth-library';

import { logger } from '../../lib';
import config from '../../config';

import { User } from '../../models/User';

import { generateToken, verifyToken } from '../../utils/auth';

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'need email and password' });
  }
  try {
    const user = await User.create(req.body);
    return res.status(httpStatusCodes.CREATED).send({ message: `${user.name} user created` });
  } catch (e) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ message: 'User already exists' }).end();
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ message: 'need email and password' });
  }
  try {
    const user = await User.findOne({ email }).select('email password name').exec();
    if (!user) {
      return res.status(httpStatusCodes.UNAUTHORIZED).send({ message: 'Invalid email' });
    }
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(httpStatusCodes.UNAUTHORIZED).send({ message: 'Invalid password' });
    }
    const token = generateToken(user);
    return res.status(httpStatusCodes.OK).json({
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    logger.debug(error.message);
    return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: error.message });
  }
};

export const protect = async (req, res, next) => {
  const token = req.get('x-access-token');
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(httpStatusCodes.UNAUTHORIZED).end();
  }
  const user = await User.findById(payload.id).select('-password').lean().exec();
  if (!user) {
    return res.status(httpStatusCodes.UNAUTHORIZED).end();
  }
  req.user = user;
  next();
};

export const googleAuth = async (req, res) => {
  try {
    const client = new OAuth2Client(config.googleOAuth.clientID);
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();
    const doc = await User.findOne({ email });
    if (!doc) {
      const user = await User.create({ name, email });
      const newToken = generateToken(user);
      return res.status(httpStatusCodes.OK).json({
        email,
        name,
        token: newToken,
      });
    }
    const newToken = generateToken(doc);
    return res.status(httpStatusCodes.OK).json({
      email,
      name,
      token: newToken,
    });
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ message: error }).end();
  }
};
