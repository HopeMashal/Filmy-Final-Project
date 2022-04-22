import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response } from 'express';

const authentication = async (req: Request | any, res: Response, next: Function) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default authentication;
