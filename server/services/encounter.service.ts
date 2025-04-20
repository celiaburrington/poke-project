import EncounterModel from '../models/encounter.model';
import LocationModel from '../models/location.model';
import PokemonModel from '../models/pokemon.model';
import UserModel from '../models/user.model';
import { Encounter, EncounterResponse } from '../types/encounter.types';

/**
 * Fetches 10 most recent encounters, populating the User, Location and Pokemon fields.
 *
 * @returns {Promise<EncounterResponse[] | { error: string }>} - The populated encounters, or an error message
 */
export const fetchRecentEncounters = async (): Promise<EncounterResponse[] | { error: string }> => {
  try {
    const result = await EncounterModel.find()
      .sort({ encountered_at: -1 })
      .limit(10)
      .populate([
        { path: 'user', model: UserModel, select: '-password' },
        {
          path: 'pokemon',
          model: PokemonModel,
        },
        {
          path: 'location',
          model: LocationModel,
        },
      ]);

    if (!result || result.length === 0) {
      throw Error();
    }

    return result;
  } catch (error) {
    return { error: 'Failed to fetch encounters' };
  }
};

/**
 * Fetches 10 most recent encounters with a specific pokemon, populating returned fields.
 *
 * @param pid - The database id of the pokemon to fetch encounters for
 * @returns {Promise<EncounterResponse[] | { error: string }>} - The populated encounters, or an error message
 */
export const getRecentPokemonEncounters = async (
  pid: string,
): Promise<EncounterResponse[] | { error: string }> => {
  try {
    const pokemon = await PokemonModel.findOne({ api_id: pid });

    if (!pokemon) {
      return [];
    }

    const result = await EncounterModel.find({ pokemon: pokemon._id })
      .sort({ encountered_at: -1 })
      .limit(10)
      .populate([
        { path: 'user', model: UserModel, select: '-password' },
        {
          path: 'pokemon',
          model: PokemonModel,
        },
        {
          path: 'location',
          model: LocationModel,
        },
      ]);

    if (!result || result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    return { error: `Failed to fetch encounters for Pokemon ${pid}` };
  }
};

/**
 * Fetches a User's encounters, populating the returned Encounter fields.
 *
 * @param {string} uid - The User to retrieve encounters for.
 * @returns {Promise<EncounterResponse[] | { error: string }>} - The populated encounters, or an error message
 */
export const getUserAllEncounters = async (
  uid: string,
): Promise<EncounterResponse[] | { error: string }> => {
  try {
    const result = await EncounterModel.find({ user: uid })
      .sort({ encountered_at: -1 })
      .populate([
        { path: 'user', model: UserModel, select: '-password' },
        {
          path: 'pokemon',
          model: PokemonModel,
        },
        {
          path: 'location',
          model: LocationModel,
        },
      ]);

    if (!result || result.length === 0) {
      throw Error();
    }

    return result;
  } catch (error) {
    return { error: `Failed to fetch encounters for User ${uid}` };
  }
};

/**
 * Fetches a User's encounters with a specific pokemon, populating the returned Encounter fields.
 *
 * @param {string} uid - The User to retrieve encounters for.
 * @param {string} pid - The Pokemon to retrieve encounters for.
 * @returns {Promise<EncounterResponse[] | { error: string }>} - The populated encounters, or an error message
 */
export const getUserEncountersWithPokemon = async (
  uid: string,
  pid: string,
): Promise<EncounterResponse[] | { error: string }> => {
  try {
    const result = await EncounterModel.find({ user: uid, pokemon: pid })
      .sort({ encountered_at: -1 })
      .populate([
        { path: 'user', model: UserModel, select: '-password' },
        {
          path: 'pokemon',
          model: PokemonModel,
        },
        {
          path: 'location',
          model: LocationModel,
        },
      ]);

    if (!result) {
      return [];
    }

    return result;
  } catch (error) {
    return { error: `Failed to fetch encounters for User ${uid}` };
  }
};

/**
 * Saves a new Encounter to the database.
 *
 * @param {Encounter} encounter - The Encounter to save
 * @returns {Promise<EncounterResponse>} - The saved user, or an error message if the save failed
 */
export const saveEncounter = async (encounter: Encounter): Promise<EncounterResponse> => {
  try {
    const result = await EncounterModel.create(encounter);

    if (!result) {
      throw Error('Failed to create new encounter');
    }

    const populatedResult = await EncounterModel.findOne({ _id: result._id }).populate([
      {
        path: 'user',
        model: UserModel,
        select: '-password',
      },
      {
        path: 'pokemon',
        model: PokemonModel,
      },
      {
        path: 'location',
        model: LocationModel,
      },
    ]);

    if (!populatedResult) {
      throw Error('Failed to fetch newly created encounter');
    }

    return populatedResult;
  } catch (error) {
    return { error: (error as Error).message };
  }
};
