import express, { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { petController } from '../../controller/pet.controller';
import upload from '../../config/multer.config';

const router = Router();

router.get('/pets', petController.getAllPets);
router.get('/pets/:id', petController.getPetById);
router.post('/pets/user/:userId', authMiddleware, petController.createPet);
router.put('/pets/:id', authMiddleware, petController.updatePet);
router.delete('/pets/:id', authMiddleware, petController.deletePet);
router.post(
  '/pets/upload-images/:petId',
  authMiddleware,
  upload.array('images', 3),
  petController.uploadImage
);
router.delete(
  '/pets/:petId/remove-image/:imageId',
  authMiddleware,
  petController.removeImage
);
router.post(
  '/pets/:petId/create-location',
  authMiddleware,
  petController.createLocation
);
router.put(
  '/pets/update-location/:locationId',
  authMiddleware,
  petController.updateLocation
);

router.use('/api/uploads', express.static('./uploads'));

export default router;
