import { Favorite } from "../types/favorite.types";
import { Pokemon } from "../types/pokemon.types";
import { SafeUser } from "../types/user.types";
import api from "./config";

const FAVORITE_API_URL = `${import.meta.env.VITE_REMOTE_SERVER_URL}/favorite`;

const getUsersWhoFavorite = async (pid: string): Promise<SafeUser[]> => {
  const res = await api.get(`${FAVORITE_API_URL}/getFavoritesByPokemon/${pid}`);

  if (res.status !== 200) {
    throw new Error("Error fetching users who favorite");
  }

  return res.data;
};

const getUsersFavorites = async (uid: string): Promise<Pokemon[]> => {
  const res = await api.get(`${FAVORITE_API_URL}/getFavoritesByUser/${uid}`);

  if (res.status !== 200) {
    throw new Error("Error fetching users favorite pokemon");
  }

  return res.data;
};

const addFavorite = async (favorite: Favorite): Promise<Favorite> => {
  const res = await api.post(`${FAVORITE_API_URL}/addFavorite`, favorite);

  if (res.status !== 200) {
    throw new Error("Error adding favorite entry");
  }

  return res.data;
};

const deleteFavorite = async (uid: string, pid: string): Promise<Favorite> => {
  const res = await api.delete(`${FAVORITE_API_URL}/delete/${uid}/${pid}`);

  if (res.status !== 200) {
    throw new Error("Error deleting favorite entry");
  }

  return res.data;
};

export { getUsersWhoFavorite, getUsersFavorites, addFavorite, deleteFavorite };
