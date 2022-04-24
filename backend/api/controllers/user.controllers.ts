import User from '../../models/user';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { sendResetPasswordEmail } from '../../src/emails/user';
import { getUserData, getUsersData } from '../../services/user.services';
const app = express();
app.use(express.json());

export const postUser = async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();
    const genToken = await user.generateAuthToken();

    res.status(201).send({ user, genToken });
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersData();
    if (!users.length) {
      res.status(404).send('No Users Found');
    } else res.status(200).send(users);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserData(id);
    if (!user) {
      res.status(404).send('User Not Found');
    } else res.send(user);
  } catch (e) {
    res.send({ error: e });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY);
      const tokenUser = await User.findOne({ 'tokens.token': token });
      if (!tokenUser) {
        return res.status(400).send();
      } else return res.send(tokenUser);
    }

    const user = await User.findByCredentials(req.body.email, req.body.password);
    const genToken = await user.generateAuthToken();
    res.send(user);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
};
export const logout = async (req: Request | any, res: Response) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
export const logoutAll = async (req: Request | any, res: Response) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
export const viewProfile = async (req: Request | any, res: Response) => {
  res.send(req.user);
};

export const editUser = async (req: Request | any, res: Response) => {
  try {
    const newUser = req.body;
    for (const prop in newUser) {
      req.user[prop] = newUser[prop];
    }
    await req.user.save();
    res.send(req.user);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};
export const sendResetLink = async (req: Request, res: Response, next) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const token = await user.generateAuthToken();
    await sendResetPasswordEmail(user,token);
    console.log(`${process.env.DOMAIN}/rest/${token}`)
    res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
  } catch (e: any) {
    res.status(500).send(e);
  }
};
export const resetPassword = async (req: Request | any, res: Response, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user: any = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    const { password } = req.body;
    user.password = password;
    user.tokens.pop();
    await user.save();
    res.send({ user, password });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};
