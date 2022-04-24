import express from 'express';
import {
  getAllUsers,
  getUser,
  logout,
  postUser,
  login,
  logoutAll,
  viewProfile,
  editUser,
  deleteUser,
  resetPassword,
  sendResetLink,
} from '../controllers/user.controllers';
import authentication from '../../middleware/authentication';

const userRouter = express.Router();

userRouter.post('/users/forgotPassword', sendResetLink);
userRouter.put(`/users/resetPassword/:token`, resetPassword);
userRouter.post('/users/login', login);
userRouter.post('/users/logout', authentication, logout);
userRouter.post('/users/logoutAll', authentication, logoutAll);
userRouter.get('/users/me', authentication, viewProfile);
userRouter.put('/users', authentication, editUser);
userRouter.delete('/users/:id', authentication, deleteUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', postUser);

export default userRouter;
