import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { userService } from '../service/user.service';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jwt = req.headers['x-access-token'] as string;

    const payload: any = verify(jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }

    req['user'] = await userService.getUserById(payload.id);

    next();
  } catch (e) {
    return res.status(401).send({
      message: 'Unauthorized',
    });
  }
};
