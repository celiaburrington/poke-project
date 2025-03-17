import { Request } from 'express';
import { ObjectId } from 'mongodb';

/**
 * Interface representing a User document, which contains:
 *
 * - _id - The unique identifier for the user. Optional field
 * - username - The username for the user
 * - password - The password for the user
 */
export interface User {
  _id?: ObjectId;
  username: string;
  password: string;
  date_joined: Date;
}

/**
 * Type representing a User object with their password omitted for security.
 */
export type SafeUser = Omit<User, 'password'>;

/**
 * Type representing possible responses for a User-related operation. Omits user password for security.
 */
export type UserResponse = SafeUser | { error: string };

/**
 * Type representing a unsafe response for a User-related operations that require checking a user's password.
 */
export type UnsafeUserResponse = User | { error: string };

/**
 * Interface for the request body when adding a new user.
 * - body - The user being added.
 */
export interface AddUserRequest extends Request {
  body: User;
}

/**
 * Interface for the request body when adding a new user.
 * - body - The user being added.
 */
export interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

/**
 * Interface for the request body when retrieving a user by their username.
 * - username - The username to retrieve.
 */
export interface GetUserRequest extends Request {
  params: {
    username: string;
  };
}
