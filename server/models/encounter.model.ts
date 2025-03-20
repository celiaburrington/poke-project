import mongoose, { Model } from 'mongoose';
import encounterSchema from './schema/encounter.schema';
import { Encounter } from '../types/encounter.types';

/**
 * Mongoose model for the `Encounter` collection.
 *
 * @type {Model<Encounter>}
 */
const EncounterModel: Model<Encounter> = mongoose.model<Encounter>('Encounter', encounterSchema);

export default EncounterModel;
