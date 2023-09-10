import express, { Router } from 'express';
import { petController } from '../../controller/pet.controller';
import upload from '../../config/multer.config';

const router = Router();

router.get('/pets', petController.getAllPets);
router.get('/pets/:id', petController.getPetById);
router.post('/pets/user/:userId', petController.createPet);
router.put('/pets/:id', petController.updatePet);
router.delete('/pets/:id', petController.deletePet);
router.post(
  '/pets/upload-images/:petId',
  upload.array('images', 3),
  petController.uploadImage
);
router.delete('/pets/:petId/remove-image/:imageId', petController.removeImage);
router.post('/pets/:petId/create-location', petController.createLocation);
router.put('/pets/update-location/:locationId', petController.updateLocation);

router.use('/api/uploads', express.static('./uploads'));

export default router;
