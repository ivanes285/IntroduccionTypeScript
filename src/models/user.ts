import { Schema, model } from 'mongoose';
import { IUser } from '../Interfaces/IUser';

const userSchema = new Schema<IUser>(
  {
    email: { type: 'string', required: true, trim: true, unique: true },
    password: { type: 'string', required: true},
    firstName: { type: 'string', trim: true },
    lastName: { type: 'string', required: true, trim: true },
    avatar: { type: 'string' },
  },
  { timestamps: true, versionKey: false }
);

const User = model('user', userSchema);

export default User;
