import { DeleteResult } from 'mongoose';
import FavoriteModel from '../models/favorite.model';
import PokemonModel from '../models/pokemon.model';
import UserModel from '../models/user.model';
import { Favorite, FavoriteResponse } from '../types/favorite.types';

/**
 * Fetches all user's who have favorited this pokemon, populating returned fields.
 *
 * @param pid - The id of the pokemon to fetch favorites for
 * @returns {Promise<Favorite[] | { error: string }>} - The populated favorites, or an error message
 */
export const getUsersWhoFavorited = async (
  pid: string,
): Promise<Favorite[] | { error: string }> => {
  try {
    const pokemon = await PokemonModel.findOne({ api_id: pid });

    if (!pokemon) {
      return [];
    }

    const result = await FavoriteModel.find({ pokemon: pokemon._id }).populate([
      { path: 'user', model: UserModel, select: '-password' },
    ]);

    if (!result || result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    return { error: `Failed to fetch favorites for Pokemon ${pid}` };
  }
};

/**
 * Fetches a User's Favorites, populating the returned Encounter fields.
 *
 * @param {string} uid - The User to retrieve favorites for.
 * @returns {Promise<Favorite[] | { error: string }>} - The populated encounters, or an error message
 */
export const getUsersFavorites = async (uid: string): Promise<Favorite[] | { error: string }> => {
  try {
    const result = await FavoriteModel.find({ user: uid }).populate([
      {
        path: 'pokemon',
        model: PokemonModel,
      },
    ]);

    if (!result || result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    return { error: `Failed to fetch favorites for User ${uid}` };
  }
};

/**
 * Saves a new Favorite entry to the database.
 *
 * @param {Favorite} favorite - The Favorite object to save
 * @returns {Promise<FavoriteResponse>} - The saved entry, or an error message if the save failed
 */
export const saveFavorite = async (favorite: Favorite): Promise<FavoriteResponse> => {
  try {
    const result = await FavoriteModel.create(favorite);

    if (!result) {
      throw Error('Failed to add new favorite entry');
    }

    return result;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Deletes a Favorite entry in the database.
 *
 * @param {string} uid - The User ID of the Favorite object to delete
 * @param {string} pid - The Pokemon ID of the Favorite object to delete
 * @returns {Promise<DeleteResult | { error: string }>} - The delete result, or an error message if error
 */
export const deleteFavorite = async (
  uid: string,
  pid: string,
): Promise<DeleteResult | { error: string }> => {
  try {
    const result = await FavoriteModel.deleteOne({ user: uid, pokemon: pid });

    if (!result) {
      throw Error('Failed to delete favorite entry');
    }

    return result;
  } catch (error) {
    return { error: (error as Error).message };
  }
};
