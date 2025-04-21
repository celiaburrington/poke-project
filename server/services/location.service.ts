import LocationModel from '../models/location.model';
import PokemonModel from '../models/pokemon.model';
import { LocationResponse } from '../types/location.types';

/**
 * Fetches all locations with their encounter lists populated from the database.
 *
 * @returns {Promise<LocationResponse[]>} - The populated locations, or an error message
 */
export const fetchAllLocations = async (): Promise<LocationResponse[] | { error: string }> => {
  try {
    const result = await LocationModel.find().populate({
      path: 'encounter_list',
      model: PokemonModel,
    });

    if (!result || result.length === 0) {
      throw Error();
    }

    return result;
  } catch (error) {
    return { error: 'Failed to fetch locations' };
  }
};

/**
 * Finds a locations by id. Returns the Location encounter lists populated from the database.
 *
 * @returns {Promise<LocationResponse[]>} - The saved user, or an error message
 */
export const getEncounters = async (locationId: string): Promise<LocationResponse> => {
  try {
    const result = await LocationModel.findOne({ _id: locationId }).populate({
      path: 'encounter_list',
      model: PokemonModel,
    });

    if (!result) {
      throw Error('Failed to create new user');
    }

    return result;
  } catch (error) {
    return { error: 'Error when saving a user' };
  }
};

export const deleteEncounterFromLoc = async (
  locationId: string,
  pid: string,
): Promise<LocationResponse> => {
  try {
    const result = await LocationModel.findOneAndUpdate(
      { _id: locationId },
      { $pull: { encounter_list: pid } },
      { new: true },
    ).populate({
      path: 'encounter_list',
      model: PokemonModel,
    });

    if (!result) {
      throw Error('Failed to remove location');
    }

    return result;
  } catch (error) {
    return { error: 'Failed to remove location' };
  }
};

export const addEncounterToLoc = async (
  locationId: string,
  name: string,
): Promise<LocationResponse> => {
  try {
    const pokemon = await PokemonModel.findOne({ name });

    if (!pokemon) {
      return { error: 'Pokemon does not exist' };
    }

    const result = await LocationModel.findOneAndUpdate(
      { _id: locationId },
      { $addToSet: { encounter_list: pokemon._id } },
      { new: true },
    ).populate({
      path: 'encounter_list',
      model: PokemonModel,
    });

    if (!result) {
      throw Error('Failed to add pokemon to location');
    }

    return result;
  } catch (error) {
    return { error: 'Failed to add pokemon to location' };
  }
};
