import {IUser, User} from '../models/user';
import {hashPassword} from './authService';

async function updateUserEmail(userId: string, email: string) {
  try {
    const user = await User.findById(userId).exec();
    user.email = email;
    await user.save();
  } catch (error) {
    console.error('Unable to update user email', error);
  }
}

async function updateUserPassword(userId: string, password: string) {
  try {
    const user = await User.findById(userId).exec();
    user.password = await hashPassword(password);
    user.password_length = password.length;
    await user.save();
  } catch (error) {
    console.error('Unable to update user email', error);
  }
}

export {updateUserEmail, updateUserPassword};
