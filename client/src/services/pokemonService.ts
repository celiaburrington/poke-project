import { Pokemon, PokemonDetails } from "../types/pokemon.types";
import api from "./config";

const POKEMON_API_URL = `${import.meta.env.VITE_REMOTE_SERVER_URL}/pokemon`;

/**
 * Function retrieve PokemonDetails from the PokéAPI.
 *
 * @param api_id- The api id of the pokemon.
 * @throws Error if there is an issue.
 */
const getPokemonDetails = async (api_id: string): Promise<PokemonDetails> => {
  const res = await api.get(`${POKEMON_API_URL}/details/${api_id}`);

  console.log(res);
  if (res.status !== 200) {
    throw new Error("Error while getting Pokémon details");
  }

  return res.data;
};

/**
 * Function to search for pokemon by name or id from the PokéAPI.
 *
 *
 * @throws Error if there is an issue.
 */
const search = async (
  name = "",
  type = "",
  generation = "",
  order = ""
): Promise<Pokemon[]> => {
  const res = await api.get(
    `${POKEMON_API_URL}/search?name=${name}&type=${type}&generation=${generation}&order=${order}`
  );

  console.log(res);
  if (res.status !== 200) {
    throw new Error("Error searching for Pokémon");
  }

  return res.data;
};

export { getPokemonDetails, search };
