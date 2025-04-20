import express, { Request, Response } from 'express';
import { PokeProjectSocket } from '../types/types';
import {
  fetchRecentEncounters,
  getRecentPokemonEncounters,
  getUserEncountersWithPokemon,
} from '../services/encounter.service';
import {
  EncountersByPokemonRequest,
  UsersEncountersByPokemonRequest,
} from '../types/encounter.types';

const encounterController = (socket: PokeProjectSocket) => {
  const router = express.Router();

  /**
   * Fetches 10 most recent Encounters from the database with their encounter entries populated.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The HTTP Request object.
   * @param res The response object used to send back the result.
   *
   * @returns A Promise that resolves to void.
   */
  const fetchEncounters = async (req: Request, res: Response): Promise<void> => {
    try {
      const encounterResponses = await fetchRecentEncounters();

      if ('error' in encounterResponses) {
        throw new Error(encounterResponses.error);
      }

      const encounters = encounterResponses.map(loc => {
        if ('error' in loc) {
          throw new Error(loc.error);
        }
        return loc;
      });

      res.json(encounters);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches 10 most recent encounters for a specific Pokemon.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The EncountersByPokemonRequest object containing ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const fetchPokemonEncounters = async (
    req: EncountersByPokemonRequest,
    res: Response,
  ): Promise<void> => {
    const { pid } = req.params;

    try {
      const encounterResponse = await getRecentPokemonEncounters(pid);

      if ('error' in encounterResponse) {
        throw new Error(encounterResponse.error as string);
      }

      const encounters = encounterResponse.map(e => {
        if ('error' in e) {
          throw new Error(e.error);
        }
        return e;
      });

      res.json(encounters);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches all encounters a User has had with a specific Pokemon.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The UsersEncountersByPokemonRequest object containing ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getUserPokemonEncounters = async (
    req: UsersEncountersByPokemonRequest,
    res: Response,
  ): Promise<void> => {
    const { uid } = req.params;
    const { pid } = req.params;

    try {
      const encounterResponse = await getUserEncountersWithPokemon(uid, pid);

      if ('error' in encounterResponse) {
        throw new Error(encounterResponse.error as string);
      }

      const encounters = encounterResponse.map(e => {
        if ('error' in e) {
          throw new Error(e.error);
        }
        return e;
      });

      res.json(encounters);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.get('/fetchEncounters', fetchEncounters);
  router.get('/fetchPokemonEncounters/:pid', fetchPokemonEncounters);
  router.get('/getUsersPokemonEncounters/:uid/:pid', getUserPokemonEncounters);

  return router;
};

export default encounterController;
