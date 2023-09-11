import { Request, Response } from 'express';

import bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import {
  createUserValidation,
  loginUserValidation,
} from '../validation/user.validation';
import { userService } from '../service/user.service';
import { User } from '../entity/user.entity';

export const authController = {
  register: async (req: Request, res: Response) => {
    const user = req.body as User;

    const { error } = createUserValidation.validate(user);

    if (error) {
      return res.status(400).send(error.details);
    }

    const existingUser = await userService.getUserByEmail(user.email);
    if (existingUser) {
      return res.status(409).json({
        message:
          'User with this email already exists. Please use a different email address.',
      });
    }

    const createdUser = await userService.createUser(user);

    res.send(createdUser);
  },

  login: async (req: Request, res: Response) => {
    const { error } = loginUserValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }

    const { email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (!existingUser) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Incorrect email or password',
      });
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Incorrect email or password',
      });
    }

    const payload = {
      id: existingUser.id,
    };

    const token = sign(payload, process.env.SECRET_KEY);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
    });
  },

  logout: async (req: Request, res: Response) => {
    res.cookie('jwt', '', {
      maxAge: 0,
    });

    res.status(200).json({
      message: 'Logout successful',
    });
  },
};
