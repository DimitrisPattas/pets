import { dbManager } from '../config/database';
import { Pet } from '../entity/pet.entity';

const dataSource = dbManager.getDataSource();

export const petService = {
  getAllPets: async () => {
    return await dataSource
      .getRepository(Pet)
      .find({ relations: ['owner', 'images', 'location'] });
  },

  getPetById: async (id: string) => {
    return await dataSource
      .getRepository(Pet)
      .findOne({ where: { id }, relations: ['images'] });
  },

  createPet: async (petData: Partial<Pet>) => {
    return await dataSource.getRepository(Pet).save(petData);
  },

  updatePet: async (id: string, petData: Partial<Pet>) => {
    await dataSource.getRepository(Pet).update(id, petData);
    return await dataSource
      .getRepository(Pet)
      .findOne({ where: { id }, relations: ['user', 'image', 'location'] });
  },

  deletePet: async (id: string) => {
    const pet = await dataSource.getRepository(Pet).findOneBy({ id });
    if (pet) {
      await dataSource.getRepository(Pet).remove(pet);
    }
    return pet;
  },
  updatePetLocation: async (pet: Pet) => {
    try {
      return await dataSource.getRepository(Pet).save(pet);
    } catch (error) {
      console.error('Error updating pet location:', error);
      throw new Error('Error updating pet location: ' + error.message);
    }
  },
};
