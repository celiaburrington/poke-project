import { Pokemon } from "./pokemon.types";
import { Location } from "./location.types";

/**
 * Interface representing an Encounter document.
 *
 * - `pokemon`: The Pokémon that was encountered.
 * - `location`: Where the encounter occured.
 * - `encountered_at`: The datetime the encounter occured.
 */
export interface Encounter {
  _id?: string;
  pokemon: Pokemon;
  location: Location;
  encountered_at: Date;
}
