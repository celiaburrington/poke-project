import { Schema } from 'mongoose';
import { LocationName } from '../../types/location.types';

/**
 * Mongoose schema for the Location collection.
 *
 * Each Location includes the following fields:
 * - `name`: The locations's name. This field is required and unique.
 * - `description`: A text description of the location. This field is required.
 * - `encounter_list`: The Pokemon possible to encounter in the location. This field is required.
 */
const locationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      enum: LocationName,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    encounter_list: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }],
      required: true,
    },
  },
  { collection: 'Location' },
);

export default locationSchema;
