import express, { Response } from 'express';
import { PokeProjectSocket } from '../types/types';
import { GetPokemonDetailsRequest, Pokemon, SearchPokemonRequest } from '../types/pokemon.types';
import {
  filterPokemonByGeneration,
  filterPokemonByName,
  filterPokemonByType,
  getPokedex,
  getPokemonDetails,
} from '../services/pokemon.service';

const pokemonController = (socket: PokeProjectSocket) => {
  const router = express.Router();

  /**
   * Fetch pokemon details from PokéAPI
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetPokemonDetailsRequest object containing ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getDetails = async (req: GetPokemonDetailsRequest, res: Response): Promise<void> => {
    const { pid } = req.params;

    try {
      const details = await getPokemonDetails(pid);

      if ('error' in details) {
        throw new Error(details.error as string);
      }

      res.json(details);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Performs a seach returning matching Pokemon.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The SearchPokemonRequest object containing search parameters.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const search = async (req: SearchPokemonRequest, res: Response): Promise<void> => {
    const { name, order, type, generation } = req.query;

    try {
      let dex: Pokemon[] = await getPokedex();

      if (name) {
        dex = filterPokemonByName(name, order, dex);
      }
      if (type) {
        dex = await filterPokemonByType(type, dex);
      }
      if (generation) {
        dex = await filterPokemonByGeneration(generation, dex);
      }

      res.json(dex);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.get('/details/:pid', getDetails);
  router.get('/search', search);

  return router;
};

export default pokemonController;
