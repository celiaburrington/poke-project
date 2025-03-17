/**
 * Interface representing a User document, which contains:
 *
 * - _id - The unique identifier for the user. Optional field
 * - username - The username for the user
 * - password - The password for the user
 */
export interface User {
  _id?: string;
  username: string;
  password: string;
  date_joined: Date;
}

/**
 * Type representing a User object with their password omitted for security.
 */
export type SafeUser = Omit<User, "password">;
