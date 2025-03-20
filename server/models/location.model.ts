import mongoose, { Model } from 'mongoose';
import locationSchema from './schema/location.schema';
import { Location } from '../types/location.types';

/**
 * Mongoose model for the `Location` collection.
 *
 * @type {Model<Location>}
 */
const LocationModel: Model<Location> = mongoose.model<Location>('Location', locationSchema);

export default LocationModel;
