import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Encounter collection.
 *
 * Each Encounter includes the following fields:
 * - `pokemon`: The Pokémon that was encountered. This field is required.
 * - `location`: Where the encounter occured. This field is required.
 * - `encountered_at`: The datetime the encounter occured. This field is required.
 */
const encounterSchema: Schema = new Schema(
  {
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
