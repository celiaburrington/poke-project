import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { SafeUser } from './user.types';
import { Pokemon } from './pokemon.types';

export interface Favorite {
  _id?: ObjectId;
  user: SafeUser;
  pokemon: Pokemon;
}

export type FavoriteResponse = Favorite | { error: string };

export interface GetUsersFavoritesRequest extends Request {
  params: {
    uid: string;
  };
}

export interface GetPokemonFavoritesRequest extends Request {
  params: {
    pid: string;
  };
}

export interface AddFavoriteRequest extends Request {
  body: Favorite;
}

export interface DeleteFavoriteRequest extends Request {
  params: {
    uid: string;
    pid: string;
  };
}
