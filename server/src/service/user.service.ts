import { dbManager } from '../config/database';
import { User } from '../entity/user.entity';

const dataSource = dbManager.getDataSource();

export const userService = {
  getAllUsers: async () => {
    return await dataSource.getRepository(User).find();
  },

  getUserById: async (id: number) => {
    return await dataSource.getRepository(User).findOneBy({ id });
  },

  createUser: async (userData: Partial<User>) => {
    const user = dataSource.getRepository(User).create(userData);
    return await dataSource.getRepository(User).save(user);
  },

  updateUser: async (id: number, userData: Partial<User>) => {
    await dataSource.getRepository(User).update(id, userData);
    return await dataSource.getRepository(User).findOneBy({ id });
  },

  deleteUser: async (id: number) => {
    const user = await dataSource.getRepository(User).findOneBy({ id });
    if (user) {
      await dataSource.getRepository(User).remove(user);
    }
    return user;
  },
};
