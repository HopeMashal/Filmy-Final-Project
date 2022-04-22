import express from 'express';

import userRouter from './user.router';
import movieRouter from './movie.router';

const apiRouter = express.Router();

apiRouter.use('/', userRouter);
apiRouter.use('/', movieRouter);

export default apiRouter;
