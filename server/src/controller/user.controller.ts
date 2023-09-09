import { Request, Response } from 'express';
import { userService } from '../service/user.service';

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userService.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const userData = req.body;
      const user = await userService.updateUser(userId, userData);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userService.deleteUser(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
