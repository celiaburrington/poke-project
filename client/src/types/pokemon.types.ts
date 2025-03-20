/**
 * Interface representing a Pokemon document.
 *
 * - `api_id`: The pokémon's ID number in PokéAPI. Also equal to the pokemon's national dex entry number.
 * - `name`: The pokémon's name.
 */
export interface Pokemon {
  _id?: string;
  api_id: number;
  name: string;
}
