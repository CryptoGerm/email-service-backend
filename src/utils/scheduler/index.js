import * as cron from 'node-cron';
import _map from 'lodash/map';

import sendEmail from '../email';

import { Mail } from '../../models/Mail';

export default cron.schedule('* */5 * * *', async () => {
  const mails = await Mail.find({ scheduledMail: true });
  _map(mails, (item) =>
    cron.schedule(item.schedule, async () => {
      const { to, cc, subject, mailBody } = item;
      const from = '500076395@stu.upes.ac.in';
      const res = await sendEmail(to, from, cc, subject, mailBody);
      if (res) {
        const doc = item;
        doc.sent = true;
        await doc.save();
      }
    })
  );
});
