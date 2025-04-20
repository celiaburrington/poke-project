import { Pokemon } from "./pokemon.types";
import { SafeUser } from "./user.types";

export interface Favorite {
  _id?: string;
  user: SafeUser;
  pokemon: Pokemon;
}
