import { dbManager } from '../config/database';
import { Image } from '../entity/image.entity';
import { Pet } from '../entity/pet.entity';

const fs = require('fs').promises;
const path = require('path');
const dataSource = dbManager.getDataSource();

export const imageService = {
  saveImage: async (imageName: string, pet: Pet) => {
    try {
      const image = new Image();
      image.imageName = imageName;
      image.pet = pet;
      const newImage = await dataSource.getRepository(Image).save(image);
      return newImage;
    } catch (error) {
      throw new Error('Error saving image: ' + error.message);
    }
  },
  getImageById: async (imageId: string) => {
    try {
      const imageRepository = dataSource.getRepository(Image);
      return await imageRepository.findOneBy({ id: imageId });
    } catch (error) {
      console.error('Error getting image by ID:', error);
      throw new Error('Error getting image by ID: ' + error.message);
    }
  },
  // Remove an image by its ID and file path
  removeImage: async (imageId: string, imageName: string) => {
    try {
      const imageRepository = dataSource.getRepository(Image);
      const imagePath = path.join('uploads', imageName);

      await imageRepository.delete(imageId);

      await fs.unlink(imagePath);
      return true;
    } catch (error) {
      console.error('Error removing image:', error);
      throw new Error('Error removing image: ' + error.message);
    }
  },
};
