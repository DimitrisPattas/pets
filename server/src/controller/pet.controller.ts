import { Request, Response } from 'express';
import { petService } from '../service/pet.service';
import { imageService } from '../service/image.service';
import { locationService } from '../service/location.service';
import { userService } from '../service/user.service';
import { Pet } from '../entity/pet.entity';

export const petController = {
  getAllPets: async (req: Request, res: Response) => {
    try {
      const pets = await petService.getAllPets();
      res.json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getPetById: async (req: Request, res: Response) => {
    try {
      const petId = req.params.id;
      const pet = await petService.getPetById(petId);
      if (pet) {
        res.json(pet);
      } else {
        res.status(404).json({ message: 'Pet not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createPet: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req['user']['id']);
      if (user) {
        const petData = req.body as Pet;
        petData.owner = user;
        const pet = await petService.createPet(petData);
        res.json(pet);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePet: async (req: Request, res: Response) => {
    try {
      const petId = req.params.id;
      const petData = req.body;
      const pet = await petService.updatePet(petId, petData);
      if (pet) {
        res.json(pet);
      } else {
        res.status(404).json({ message: 'Pet not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deletePet: async (req: Request, res: Response) => {
    try {
      const petId = req.params.id;
      const pet = await petService.deletePet(petId);
      if (pet) {
        res.json(pet);
      } else {
        res.status(404).json({ message: 'Pet not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  uploadImage: async (req: Request, res: Response) => {
    try {
      const { petId } = req.params;
      const pet = await petService.getPetById(petId);

      if (pet) {
        const uploadedImages = req.files as Express.Multer.File[];
        const imagePaths = uploadedImages.map((image) => image.filename);
        // TODO rename to imageName
        for (const imagePath of imagePaths) {
          await imageService.saveImage(imagePath, pet);
        }
        res.json({ message: 'Image(s) uploaded successfully' });
      } else {
        res.status(404).json({ message: 'Pet not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  removeImage: async (req: Request, res: Response) => {
    try {
      const { imageId } = req.params;

      // Retrieve the image's file path from the database
      const image = await imageService.getImageById(imageId);

      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Call the image service to remove the image from the database and file system
      const removed = await imageService.removeImage(image.id, image.imageName);

      if (removed) {
        res.json({ message: 'Image removed successfully' });
      } else {
        res.status(500).json({ message: 'Failed to remove image' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createLocation: async (req: Request, res: Response) => {
    try {
      const { petId } = req.params;
      const { coordinates } = req.body;

      const newLocation = await locationService.createLocation(coordinates);

      const pet = await petService.getPetById(petId);
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }

      pet.location = newLocation;
      await petService.updatePetLocation(pet);

      res.json({
        message: 'Location created and associated with pet successfully',
        location: newLocation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateLocation: async (req: Request, res: Response) => {
    try {
      const { locationId } = req.params;
      const { coordinates } = req.body;

      // Update the location coordinates
      const updatedLocation = await locationService.updateLocation(
        locationId,
        coordinates
      );

      res.json({
        message: 'Location updated successfully',
        location: updatedLocation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
