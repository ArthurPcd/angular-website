import {model, Schema} from 'mongoose';

interface IUser {
  _id?: string;
  email: string;
  password: string;
  password_length: number;
}

const schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  password_length: {
    type: Number,
    required: true,
  },
});

const User = model<IUser>('User', schema);

export type {IUser};
export {User};
