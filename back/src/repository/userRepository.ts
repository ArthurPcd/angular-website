import {IUser, User} from '../models/user';

async function retrieveUser(email: string): Promise<IUser> {
  const find = await User.findOne({email: email}).exec();

  if (find === null)
    return Promise.reject(new Error('Unable to find user with this email'));
  return find as IUser;
}

async function saveUser(user: IUser): Promise<IUser> {
  const saved = await new User(user).save();

  return saved as IUser;
}

export {retrieveUser, saveUser};
