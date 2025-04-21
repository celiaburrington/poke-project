import { Request } from 'express';
import { ObjectId } from 'mongodb';

export type PokedexOrder = 'number' | 'bestMatch';

/**
 * Interface representing a Pokemon document.
 *
 * - `api_id`: The pokémon's ID number in PokéAPI. Also equal to the pokemon's national dex entry number.
 * - `name`: The pokémon's name.
 */
export interface Pokemon {
  _id?: ObjectId;
  api_id: number;
  name: string;
}

export interface EvolutionChain {
  name: string;
  api_id: number;
  sprite: string;
  evolves_to: EvolutionChain[];
}

/**
 * Interface representing a Pokemon with additional details from PokéAPI.
 *
 * - `api_id`: The pokémon's ID number in PokéAPI. Also equal to the pokemon's national dex entry number.
 * - `name`: The pokémon's name.
 * - `formatedName`: pokémon's name with formatting
 */
export interface PokemonDetails extends Pokemon {
  // from API/pokemon
  sprites: {
    default: string;
    shiny: string;
    official: string;
  };
  stats: { name: string; base_stat: number }[];
  types: { name: string; slot: number; api_id: number }[];
  // from API/pokemon-species
  formatedName: string;
  evolution_chain: EvolutionChain;
  flavor_text_entries: {
    flavor_text: string;
    version: string;
  }[];
  genus: string;
  generation: string;
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface GetPokemonDetailsRequest extends Request {
  params: {
    pid: string;
  };
}

export interface SearchPokemonRequest extends Request {
  query: {
    name: string;
    order: PokedexOrder;
    type: string;
    generation: string;
  };
}
