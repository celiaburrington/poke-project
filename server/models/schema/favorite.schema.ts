import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Favorite collection.
 *
 * Each Favorite entry includes the following fields:
 * - `user`: The User that favorited the Pokémon. This field is required.
 * - `pokemon`: The Pokémon that was favorited. This field is required.
 */
const favoriteSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon', required: true },
  },
  { collection: 'Favorite' },
);

export default favoriteSchema;
