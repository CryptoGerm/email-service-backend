import { SchemaTypes, Schema, model } from 'mongoose';

const mailSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    cc: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    mailBody: {
      type: String,
    },
    schedule: {
      type: String,
      required: false,
    },
    scheduledMail: {
      type: Boolean,
      default: false,
    },
    sent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Mail = model('mail', mailSchema);
