import { Pokemon } from "./pokemon.types";
import { Location } from "./location.types";
import { SafeUser } from "./user.types";

/**
 * Interface representing an Encounter document.
 *
 * - `user`: The User that encountered the Pokémon.
 * - `pokemon`: The Pokémon that was encountered.
 * - `location`: Where the encounter occured.
 * - `encountered_at`: The datetime the encounter occured.
 */
export interface Encounter {
  _id?: string;
  user: SafeUser;
  pokemon: Pokemon;
  location: Location;
  encountered_at: Date;
}
