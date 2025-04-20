import express, { Request, Response } from 'express';
import { PokeProjectSocket } from '../types/types';
import {
  fetchRecentEncounters,
  getRecentPokemonEncounters,
  getUserEncountersWithPokemon,
  saveEncounter,
} from '../services/encounter.service';
import {
  AddEncounterRequest,
  Encounter,
  EncountersByPokemonRequest,
  RandomEncounterRequest,
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

  const isEncounterValid = (body: Encounter) => !!body.user && !!body.pokemon;

  /**
   * Adds a new encounter to the database. The add encounter request is validated then saved.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The AddEncounterRequest object containing the encounter data.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const addEncounter = async (req: AddEncounterRequest, res: Response): Promise<void> => {
    if (!isEncounterValid(req.body)) {
      res.status(400).send('Invalid user');
      return;
    }

    const encounterInfo = req.body;

    try {
      const encounterFromDb = await saveEncounter(encounterInfo);

      if ('error' in encounterFromDb) {
        throw new Error(encounterFromDb.error as string);
      }

      res.json(encounterFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Adds a random encounter from the location sent in the request to the current user.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The RandomEncounterRequest object containing the location data.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const randomEncounter = async (req: RandomEncounterRequest, res: Response): Promise<void> => {
    const locationInfo = req.body;
    const randEncounter = Math.floor(Math.random() * locationInfo.encounter_list.length);
    const { currentUser } = req.session;
    if (!currentUser) {
      throw Error('Invalid session for this operation');
    }

    const newEncounter: Encounter = {
      user: currentUser,
      pokemon: locationInfo.encounter_list[randEncounter],
      location: locationInfo,
      encountered_at: new Date(),
    };

    try {
      const encounterFromDb = await saveEncounter(newEncounter);

      if ('error' in encounterFromDb) {
        throw new Error(encounterFromDb.error as string);
      }

      res.json(encounterFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.get('/fetchEncounters', fetchEncounters);
  router.get('/fetchPokemonEncounters/:pid', fetchPokemonEncounters);
  router.get('/getUsersPokemonEncounters/:uid/:pid', getUserPokemonEncounters);
  router.post('/addEncounter', addEncounter);
  router.post('/randomEncounter', randomEncounter);

  return router;
};

export default encounterController;
