import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Encounter collection.
 *
 * Each Encounter includes the following fields:
 * - `user`: The User that encountered the Pokémon. This field is required.
 * - `pokemon`: The Pokémon that was encountered. This field is required.
 * - `location`: Where the encounter occured. This field is required.
 * - `encountered_at`: The datetime the encounter occured. This field is required.
 */
const encounterSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon', required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    encountered_at: {
      type: Date,
      required: true,
    },
  },
  { collection: 'Encounter' },
);

export default encounterSchema;
