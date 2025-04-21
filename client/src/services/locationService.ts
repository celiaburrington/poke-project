import { Location } from "../types/location.types";
import api from "./config";

const LOCATION_API_URL = `${import.meta.env.VITE_REMOTE_SERVER_URL}/location`;

/**
 * Function to fetch all locations from the server.
 *
 * @throws Error if there is an issue fetching locations.
 */
const fetchLocations = async (): Promise<Location[]> => {
  const res = await api.get(`${LOCATION_API_URL}/fetchLocations`);

  if (res.status !== 200) {
    throw new Error("Error fetching locations");
  }

  return res.data;
};

/**
 * Function to fetch a location by id from the server.
 *
 * @throws Error if there is an issue fetching locations.
 */
const getLocationById = async (locationId: string): Promise<Location> => {
  const res = await api.get(`${LOCATION_API_URL}/getLocation/${locationId}`);

  if (res.status !== 200) {
    throw new Error("Error getting location");
  }

  return res.data;
};

const addMonToLocation = async (
  locationId: string,
  name: string
): Promise<Location> => {
  const res = await api.put(
    `${LOCATION_API_URL}/addPokemon/${locationId}/${name}`
  );

  if (res.status !== 200) {
    throw new Error("Error adding encounter to location");
  }

  return res.data;
};

const removeMonFromLocation = async (
  locationId: string,
  pid: string
): Promise<Location> => {
  const res = await api.delete(
    `${LOCATION_API_URL}/deletePokemon/${locationId}/${pid}`
  );

  if (res.status !== 200) {
    throw new Error("Error deleting encounter from location");
  }

  return res.data;
};

export {
  fetchLocations,
  getLocationById,
  addMonToLocation,
  removeMonFromLocation,
};
