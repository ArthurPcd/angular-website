import {IUser, User} from '../models/user';
import {JwtPayload, sign, verify} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

interface UserPayload {
  user: IUser;
}

interface AuthenticatedRequest extends Request {
  user: IUser;
}

function generateAccessToken(user: IUser): string {
  return sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}

function authenticateMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  const token = header?.split(' ')[1];

  if (!header?.startsWith('Bearer ') || !token)
    return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET, async (hasError, payload) => {
    const isUser = (jwt: string | JwtPayload): jwt is UserPayload => {
      return !!(jwt as UserPayload);
    };

    if (hasError || !isUser(payload))
      return res.sendStatus(401);
    req.user = await User.findOne({_id: payload.user._id}).exec();
    next();
  });
}

export {AuthenticatedRequest, generateAccessToken, authenticateMiddleware};
