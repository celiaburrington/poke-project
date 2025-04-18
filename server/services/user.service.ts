import { SafeUser, UnsafeUserResponse, User, UserResponse, UserUpdates } from '../types/user.types';
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
  first_name: user.first_name,
  last_name: user.last_name,
  bio: user.bio,
  email: user.email,
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
 * Retrieves a user from the database by their id.
 *
 * @param {string} userId - The id of the user to find.
 * @returns {Promise<UserResponse>} - Resolves with the found user object (without the password) or an error message.
 */
export const getUserById = async (userId: string): Promise<UserResponse> => {
  try {
    const user = await UserModel.findById(userId).select('-password');

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

/**
 * Updates the user given by _userId_ and returns the result. Error message if unable to update.
 *
 * @param {string} userId - The id the user to update.
 * @param {UserUpdates} userUpdates - The fields to update.
 * @returns {Promise<UnsafeUserResponse>} - Resolves to the updated SafeUser object or an error message.
 */
export const updateUserDetails = async (
  userId: string,
  userUpdates: UserUpdates,
): Promise<UserResponse> => {
  try {
    if (!userUpdates) {
      return await getUserById(userId);
    }

    const user = await UserModel.findOneAndUpdate({ _id: userId }, userUpdates, { new: true });

    if (!user) {
      throw Error('User not found');
    }

    return toSafeUser(user);
  } catch (error) {
    return { error: `Error occurred when updating user: ${error}` };
  }
};
