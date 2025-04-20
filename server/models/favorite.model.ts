import mongoose, { Model } from 'mongoose';
import favoriteSchema from './schema/favorite.schema';
import { Favorite } from '../types/favorite.types';

/**
 * Mongoose model for the `Favorite` collection.
 *
 * @type {Model<Favorite>}
 */
const FavoriteModel: Model<Favorite> = mongoose.model<Favorite>('Favorite', favoriteSchema);

export default FavoriteModel;
