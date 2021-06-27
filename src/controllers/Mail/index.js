import httpStatusCodes from 'http-status-codes';
import sendEmail from '../../utils/email';

import { Mail } from '../../models/Mail';

export const sendMail = async (req, res) => {
  const { _id } = req.user;
  const { to, cc, subject, mailBody } = req.body;
  if (!(to && subject)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'need all fields' });
  }
  try {
    const from = '500076395@stu.upes.ac.in';
    const mailSent = await sendEmail(to, from, cc, subject, mailBody);
    if (mailSent) {
      const mail = await Mail.create({ user: _id, to, from, cc, subject, mailBody, sent: true });
      return res.status(httpStatusCodes.OK).send({
        status: 'ok',
        data: {
          mailSent,
          mail,
        },
      });
    }
  } catch (error) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ data: error, status: 'error' });
  }
};
export const createMail = async (req, res) => {
  const { _id } = req.user;
  const { to, subject, schedule } = req.body;
  if (!(to && subject && schedule)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'need all fields' });
  }
  try {
    const newMail = new Mail({
      user: _id,
      scheduledMail: true,
      from: '500076395@stu.upes.ac.in',
      ...req.body,
    });
    const mail = await newMail.save();
    return res.status(httpStatusCodes.CREATED).send({ data: mail, status: 'ok' });
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ data: error, status: 'error' }).end();
  }
};
export const mailListScheduled = async (req, res) => {
  const { _id } = req.user;
  try {
    const mails = await Mail.find({ user: _id, sent: false });
    return res.status(httpStatusCodes.OK).send({ message: '', data: mails, status: 'ok' });
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ message: error, status: 'error' }).end();
  }
};
export const mailListSent = async (req, res) => {
  const { _id } = req.user;
  try {
    const mails = await Mail.find({ user: _id, sent: true });
    return res.status(httpStatusCodes.OK).send({ message: '', data: mails, status: 'ok' });
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ message: error, status: 'error' }).end();
  }
};
export const mailListScheduledSent = async (req, res) => {
  const { _id } = req.user;
  try {
    const mails = await Mail.find({ user: _id, sent: true, scheduledMail: true });
    return res.status(httpStatusCodes.OK).send({ message: '', data: mails, status: 'ok' });
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ message: error, status: 'error' }).end();
  }
};
