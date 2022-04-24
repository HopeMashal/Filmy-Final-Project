import { Request, Response } from 'express';

const authorization = async (req: Request | any, res: Response, next: Function) => {
  try {
    if (req.user.accessLevel >= 1) {
      next();
    } else res.status(401).send({ error: 'You Are Unauthorised For This Action' });
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export default authorization;
