import express, { Request, Response } from 'express';
import { PokeProjectSocket } from '../types/types';
import { GetLocationRequest } from '../types/location.types';
import { fetchAllLocations, getEncounters } from '../services/location.service';

const locationController = (socket: PokeProjectSocket) => {
  const router = express.Router();

  /**
   * Fetches all Locations from the database with their encounter entries populated.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The HTTP Request object.
   * @param res The response object used to send back the result.
   *
   * @returns A Promise that resolves to void.
   */
  const fetchLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const locationResponses = await fetchAllLocations();

      if ('error' in locationResponses) {
        throw new Error(locationResponses.error);
      }

      const locations = locationResponses.map(loc => {
        if ('error' in loc) {
          throw new Error(loc.error);
        }
        return loc;
      });

      res.json(locations);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches a Location from the database by its id.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserRequest object containing ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getLocationById = async (req: GetLocationRequest, res: Response): Promise<void> => {
    const { locationId } = req.params;

    try {
      const location = await getEncounters(locationId);

      if ('error' in location) {
        throw new Error(location.error as string);
      }

      res.json(location);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.get('/fetchLocations', fetchLocations);
  router.get('/getLocation/:locationId', getLocationById);

  return router;
};

export default locationController;
