import sgMail from '@sendgrid/mail';
import config from '../../config';

export default async (recipient, sender, cc, emailTypeSubject, emailTypeBody) => {
  sgMail.setApiKey(config.sendGridKey);
  const msg = {
    to: recipient,
    from: sender,
    cc,
    subject: emailTypeSubject,
    html: emailTypeBody,
  };
  const response = await sgMail.send(msg);
  return response;
};
