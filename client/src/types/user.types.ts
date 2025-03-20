import { Encounter } from "./encounter.types";

/**
 * UserRole enum enumerating user roles.
 */
export enum UserRole {
  NewUser = "NewUser",
  Admin = "Admin",
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
  _id?: string;
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
 * Type representing a User object with their password omitted for security.
 */
export type SafeUser = Omit<User, "password">;
