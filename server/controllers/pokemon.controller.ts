import express, { Response } from 'express';
import { PokeProjectSocket } from '../types/types';
import { GetPokemonDetailsRequest } from '../types/pokemon.types';
import { getPokemonDetails } from '../services/pokemon.service';

const pokemonController = (socket: PokeProjectSocket) => {
  const router = express.Router();

  /**
   * Fetch pokemon details from PokéAPI
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserRequest object containing ID.
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

  // Routes
  router.get('/details/:pid', getDetails);

  return router;
};

export default pokemonController;
