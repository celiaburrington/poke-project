import mongoose, { Model } from 'mongoose';
import userSchema from './schema/user.schema';
import { User } from '../types/user.types';

/**
 * Mongoose model for the `User` collection.
 *
 * @type {Model<User>}
 */
const UserModel: Model<User> = mongoose.model<User>('User', userSchema);

export default UserModel;
