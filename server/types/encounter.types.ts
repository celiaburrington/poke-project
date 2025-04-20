import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { Pokemon } from './pokemon.types';
import { Location } from './location.types';
import { SafeUser } from './user.types';

/**
 * Interface representing an Encounter document.
 *
 * - `user`: The User that encountered the Pokémon.
 * - `pokemon`: The Pokémon that was encountered.
 * - `location`: Where the encounter occured.
 * - `encountered_at`: The datetime the encounter occured.
 */
export interface Encounter {
  _id?: ObjectId;
  user: SafeUser;
  pokemon: Pokemon;
  location: Location;
  encountered_at: Date;
}

export type EncounterResponse = Encounter | { error: string };

/**
 * Interface for the request body when retrieving encounters for a specific Pokemon from the database.
 * - pid - The pokemon database id.
 */
export interface EncountersByPokemonRequest extends Request {
  params: {
    pid: string;
  };
}

export interface UsersEncountersByPokemonRequest extends Request {
  params: {
    uid: string;
    pid: string;
  };
}

export interface AddEncounterRequest extends Request {
  body: Encounter;
}

export interface RandomEncounterRequest extends Request {
  body: Location;
}
