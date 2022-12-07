import { Schema, model } from 'mongoose';
import { IUser } from '../Interfaces/IUser';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true},
    firstName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const User = model('user', userSchema);

export default User;
