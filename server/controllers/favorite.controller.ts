import express, { Response } from 'express';
import { PokeProjectSocket } from '../types/types';
import {
  AddFavoriteRequest,
  DeleteFavoriteRequest,
  Favorite,
  GetPokemonFavoritesRequest,
  GetUsersFavoritesRequest,
} from '../types/favorite.types';
import {
  deleteFavorite,
  getUsersFavorites,
  getUsersWhoFavorited,
  saveFavorite,
} from '../services/favorite.service';

const favoriteController = (socket: PokeProjectSocket) => {
  const router = express.Router();

  /**
   * Fetches a list of Users who favorites the Pokemon indicated by the given ID.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetPokemonFavoritesRequest object containing ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getFavoritesByPokemon = async (
    req: GetPokemonFavoritesRequest,
    res: Response,
  ): Promise<void> => {
    const { pid } = req.params;

    try {
      const favsResponse = await getUsersWhoFavorited(pid);

      if ('error' in favsResponse) {
        throw new Error(favsResponse.error as string);
      }

      const users = favsResponse.map(f => f.user);

      res.json(users);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches a User's Favorites from the database with the entries populated.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserEncountersRequest object.
   * @param res The response object used to send back the result.
   *
   * @returns A Promise that resolves to void.
   */
  const getFavoritesByUser = async (
    req: GetUsersFavoritesRequest,
    res: Response,
  ): Promise<void> => {
    const { uid } = req.params;

    try {
      const favsResponse = await getUsersFavorites(uid);

      if ('error' in favsResponse) {
        throw new Error(favsResponse.error as string);
      }

      const users = favsResponse.map(f => f.pokemon);

      res.json(users);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  const isFavoriteValid = (body: Favorite) => !!body.user && !!body.pokemon;

  /**
   * Adds a new Favorite entry to the database. The request is validated then saved.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The AddFavoriteRequest object containing the favorite data.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const addFavorite = async (req: AddFavoriteRequest, res: Response): Promise<void> => {
    if (!isFavoriteValid(req.body)) {
      res.status(400).send('Invalid favorite');
      return;
    }

    const favoriteInfo = req.body;

    try {
      const favorite = await saveFavorite(favoriteInfo);

      if ('error' in favorite) {
        throw new Error(favorite.error as string);
      }

      res.json(favorite);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Deletes a Favorite entry in the database.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The DeleteFavoriteRequest object containing the favorite ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const removeFavorite = async (req: DeleteFavoriteRequest, res: Response): Promise<void> => {
    const { uid, pid } = req.params;

    try {
      const result = await deleteFavorite(uid, pid);

      if ('error' in result) {
        throw new Error(result.error as string);
      }

      if (!result.acknowledged) {
        throw new Error('Failed to delete favorite');
      }
      res.json(result);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.get('/getFavoritesByPokemon/:pid', getFavoritesByPokemon);
  router.get('/getFavoritesByUser/:uid', getFavoritesByUser);
  router.post('/addFavorite', addFavorite);
  router.delete('/delete/:uid/:pid', removeFavorite);

  return router;
};

export default favoriteController;
