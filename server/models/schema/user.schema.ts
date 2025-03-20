import { Schema } from 'mongoose';
import { UserRole } from '../../types/user.types';

/**
 * Mongoose schema for the User collection.
 *
 * Each User includes the following fields:
 * - `username`: The user's username. This field is required.
 * - `password`: The user's password. This field is required.
 * - `date_joined`: The date the user signed up. This field is required.
 * - `role`: The user's role. This field is required.
 * - `encounters`: A list of the pokemon encounters the user has had. This field is required.
 * - `first_name`: The user's first name. This field is not required.
 * - `last_name`: The user's last name. This field is not required.
 * - `email`: The user's email. This field is not required.
 * - `bio`: The user's profile bio. This field is not required.
 */
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date_joined: {
      type: Date,
      required: true,
      default: Date.now,
    },
    role: {
      type: String,
      enum: UserRole,
      required: true,
    },
    encounters: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Encounter' }],
      required: true,
      default: [],
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { collection: 'User' },
);

export default userSchema;
