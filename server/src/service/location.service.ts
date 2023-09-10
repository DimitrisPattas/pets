import { dbManager } from '../config/database';
import { Location } from '../entity/location.entity';

const dataSource = dbManager.getDataSource();

export const locationService = {
  createLocation: async (coordinates: string) => {
    try {
      const locationRepository = dataSource.getRepository(Location);
      return await locationRepository.save({ coordinates });
    } catch (error) {
      console.error('Error creating location:', error);
      throw new Error('Error creating location: ' + error.message);
    }
  },

  updateLocation: async (locationId: string, newCoordinates: string) => {
    try {
      const locationRepository = dataSource.getRepository(Location);
      const existingLocation = await locationRepository.findOneBy({
        id: locationId,
      });

      if (!existingLocation) {
        throw new Error('Location not found');
      }

      existingLocation.coordinates = newCoordinates;
      const updatedLocation = await locationRepository.save(existingLocation);

      return updatedLocation;
    } catch (error) {
      console.error('Error updating location:', error);
      throw new Error('Error updating location: ' + error.message);
    }
  },
};
