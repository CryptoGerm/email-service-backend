import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { hashPassword } from '../utils/auth';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashPassword(this.password);
  next();
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return bcrypt.compareSync(password, passwordHash);
};

export const User = mongoose.model('user', userSchema);
