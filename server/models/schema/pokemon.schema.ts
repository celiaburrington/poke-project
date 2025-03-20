import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Pokemon collection.
 *
 * Each Pokemon includes the following fields:
 * - `api_id`: The pokémon's ID number in PokéAPI. Also equal to the pokemon's national dex entry number.
 *             This field is required and must be unique.
 * - `name`: The pokémon's name. This field is required and unique.
 */
const pokemonSchema: Schema = new Schema(
  {
    api_id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { collection: 'Pokemon' },
);

export default pokemonSchema;
