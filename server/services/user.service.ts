import { SafeUser, UnsafeUserResponse, User, UserResponse } from '../types/user.types';
import UserModel from '../models/user.model';

// type checking utility for type-safe access to error code
const isMongoError = (error: unknown): error is { code?: number } =>
  typeof error === 'object' && error !== null && 'code' in error;

/**
 * Util to convert a User object to a SafeUser by omitting the User's password.
 *
 * @param {User} user - The user to make safe
 * @returns {SafeUser} - The safe user
 */
export const toSafeUser = (user: User): SafeUser => ({
  _id: user._id,
  username: user.username,
  role: user.role,
  date_joined: user.date_joined,
  encounters: user.encounters,
});

/**
 * Saves a new user to the database.
 *
 * @param {User} user - The user to save
 * @returns {Promise<UserResponse>} - The saved user, or an error message if the save failed
 */
export const saveUser = async (user: User): Promise<UserResponse> => {
  try {
    const result = await UserModel.create(user);

    if (!result) {
      throw Error('Failed to create new user');
    }

    return toSafeUser(result);
  } catch (error) {
    if (isMongoError(error)) {
      if (error.code === 11000) {
        // return specific message if error code matched MongoDB duplicate key error
        return { error: 'Username must be unique' };
      }
    }
    return { error: 'Error when saving a user' };
  }
};

/**
 * Retrieves a user from the database by their username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<UserResponse>} - Resolves with the found user object (without the password) or an error message.
 */
export const getUserByUsername = async (username: string): Promise<UserResponse> => {
  try {
    const user = await UserModel.findOne({ username }).select('-password');

    if (!user) {
      throw Error('User not found');
    }

    return user;
  } catch (error) {
    return { error: `Error occurred when finding user: ${error}` };
  }
};

/**
 * Searches the database for a user with the given username. Returns full User or error message
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<UnsafeUserResponse>} - Resolves with the found User object or an error message.
 */
export const findFullUser = async (username: string): Promise<UnsafeUserResponse> => {
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw Error('User not found');
    }

    return user;
  } catch (error) {
    return { error: `Error occurred when finding user: ${error}` };
  }
};
