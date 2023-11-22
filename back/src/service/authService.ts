import {retrieveUser, saveUser} from '../repository/userRepository';
import {genSalt, hash, compare} from 'bcrypt';
import {IUser, User} from '../models/user';
import {generateAccessToken} from '../middleware/auth';

const EMAIL_REGEX: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const PASSWORD_CHARACTERS: string = '@?:-_~&=+/*%*^\\!.,;<>"\'()[]{}$';
const PASSWORD_LENGTH: number = 8;

type Credentials = {
  email: string;
  password: string;
}

const isString = (object: string | object): object is string => {
  return typeof object === 'string';
};

function reject(reason: string | Error): Promise<never> {
  if (isString(reason))
    return Promise.reject(new Error(reason));
  return Promise.reject(reason);
}

async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);

  return await hash(password, salt);
}

async function userExists(email: string): Promise<boolean> {
  return await retrieveUser(email)
    .then(() => {
      return true;
    }).catch(() => {
      return false;
    });
}

function isValidCredentials(credentials: Credentials): boolean {
  const email = credentials.email.trim();
  const password = credentials.password.trim();

  const validEmail: boolean = EMAIL_REGEX.test(email);
  const validPasswordLength: boolean = password.length >= PASSWORD_LENGTH;
  const specialCharacters: string[] = password.split('')
    .filter(character => PASSWORD_CHARACTERS.includes(character));

  return (validEmail && validPasswordLength && specialCharacters.length > 0);
}

async function register(credentials: Credentials): Promise<IUser> {
  const exists = await userExists(credentials.email);

  if (exists)
    return reject('User with this email already exists');
  if (!isValidCredentials(credentials))
    return reject('Invalid credentials');
  return saveUser({
    email: credentials.email,
    password: await hashPassword(credentials.password),
    password_length: credentials.password.length
  });
}

async function login(credentials: Credentials): Promise<string> {
  return retrieveUser(credentials.email)
    .then(async (user: IUser) => {
      const validCredentials = await compare(credentials.password, user.password);

      if (!validCredentials)
        return reject('Invalid credentials');
      return generateAccessToken(user);
    })
    .catch(reason => {
      return reject(reason);
    });
}

export type {Credentials};
export {isString, register, login, hashPassword};
