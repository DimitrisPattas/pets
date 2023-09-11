import { dbManager } from '../config/database';
import { User } from '../entity/user.entity';
import bcryptjs from 'bcryptjs';

const dataSource = dbManager.getDataSource();

export const userService = {
  getAllUsers: async () => {
    return await dataSource.getRepository(User).find();
  },

  getUserById: async (id: string) => {
    return await dataSource.getRepository(User).findOneBy({ id });
  },

  getUserByEmail: async (email: string) => {
    return await dataSource.getRepository(User).findOneBy({ email });
  },

  createUser: async (userData: Partial<User>) => {
    const { password, ...user } = await dataSource.getRepository(User).save({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: await bcryptjs.hash(userData.password, 10),
    });
    return user;
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    await dataSource.getRepository(User).update(id, userData);
    return await dataSource.getRepository(User).findOneBy({ id });
  },

  deleteUser: async (id: string) => {
    const user = await dataSource.getRepository(User).findOneBy({ id });
    if (user) {
      await dataSource.getRepository(User).remove(user);
    }
    return user;
  },
};
