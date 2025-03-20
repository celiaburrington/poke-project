import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { Encounter } from './encounter.types';

/**
 * UserRole enum enumerating user roles.
 */
export enum UserRole {
  NewUser = 'NewUser',
  Admin = 'Admin',
}

/**
 * Interface representing a User document.
 *
 * Each User includes the following fields:
 * - `username`: The user's username.
 * - `password`: The user's password.
 * - `date_joined`: The date the user signed up.
 * - `role`: The user's role.
 * - `encounters`: A list of the pokemon encounters the user has had.
 * - `first_name`: The user's first name. (Optional)
 * - `last_name`: The user's last name. (Optional)
 * - `email`: The user's email. (Optional)
 * - `bio`: The user's profile bio. (Optional)
 */
export interface User {
  _id?: ObjectId;
  username: string;
  password: string;
  date_joined: Date;
  role: UserRole;
  encounters: Encounter[];
  // Profile details
  first_name?: string;
  last_name?: string;
  bio?: string;
  email?: string;
}

/**
 * Type representing a User with their password omitted for security.
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
