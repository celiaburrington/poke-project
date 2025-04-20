import { Encounter } from "../types/encounter.types";
import api from "./config";

const ENCOUNTER_API_URL = `${import.meta.env.VITE_REMOTE_SERVER_URL}/encounter`;

// router.get('/fetchEncounters', fetchEncounters);
// router.get('/fetchPokemonEncounters/:pid', fetchPokemonEncounters);

/**
 * Function to fetch most recent Encounters from the server.
 *
 * @returns List of Encounters
 * @throws Error if there is an issue fetching encounters.
 */
const fetchEncounters = async (): Promise<Encounter[]> => {
  const res = await api.get(`${ENCOUNTER_API_URL}/fetchEncounters`);

  if (res.status !== 200) {
    throw new Error("Error fetching encounters");
  }

  return res.data;
};

/**
 * Function to fetch most recent Encounters with a specific Pokémon from the server.
 *
 * @param pid - The pokemon's database id.
 * @returns List of Encounters
 * @throws Error if there is an issue fetching encounters.
 */
const getRecentPokemonEncounters = async (
  pid: string
): Promise<Encounter[]> => {
  const res = await api.get(
    `${ENCOUNTER_API_URL}/fetchPokemonEncounters/${pid}`
  );

  if (res.status !== 200) {
    throw new Error("Error fetching encounters");
  }

  return res.data;
};

const getUsersPokemonEncounters = async (
  uid: string,
  pid: string
): Promise<Encounter[]> => {
  const res = await api.get(
    `${ENCOUNTER_API_URL}/getUsersPokemonEncounters/${uid}/${pid}`
  );

  if (res.status !== 200) {
    throw new Error("Error fetching encounters");
  }

  return res.data;
};

export {
  fetchEncounters,
  getRecentPokemonEncounters,
  getUsersPokemonEncounters,
};
