import { SafeUser, User, UserUpdates } from "../types/user.types";
import api from "./config";

const USER_API_URL = `${import.meta.env.VITE_REMOTE_SERVER_URL}/user`;

/**
 * Function to add a new user.
 *
 * @param u - The user object to add.
 * @throws Error if there is an issue creating the new user.
 */
const addUser = async (u: User): Promise<SafeUser> => {
  const res = await api.post(`${USER_API_URL}/addUser`, u);

  if (res.status !== 200) {
    throw new Error("Error while creating a new user");
  }

  return res.data;
};

/**
 * Function to log in a user.
 *
 * @param credentials - The user's login credentials.
 * @throws Error if there is an issue logging in the user.
 */
const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<SafeUser> => {
  const res = await api.post(`${USER_API_URL}/login`, credentials);

  if (res.status === 200) {
    return res.data;
  }
  if (res.status === 401) {
    throw new Error("Invalid username or password");
  } else if (res.status === 404) {
    throw new Error("User not found");
  } else {
    throw new Error("Error while logging in");
  }
};

/**
 * Function to log out a user.
 *
 * @throws Error if there is an issue logging out the user.
 */
const logoutUser = async (): Promise<void> => {
  const res = await api.post(`${USER_API_URL}/logout`);

  if (res.status !== 200) {
    throw new Error("Error logging out");
  }
};

/**
 * Function to fetch current users profile.
 *
 * @throws Error if there is an issue fetching.
 */
const userProfile = async (): Promise<SafeUser> => {
  const res = await api.post(`${USER_API_URL}/userProfile`);

  if (res.status !== 200) {
    throw new Error("Error while fetching current user's profile");
  }

  return res.data;
};

/**
 * Function to update a user's profile.
 *
 * @throws Error if there is an issue updating.
 */
const updateCurrentUser = async (
  userId: string,
  userUpdates: UserUpdates
): Promise<SafeUser> => {
  const res = await api.put(`${USER_API_URL}/updateUser/${userId}`, {
    userUpdates: userUpdates,
  });

  if (res.status !== 200) {
    throw new Error("Error while updating user");
  }

  return res.data;
};

/**
 * Function to fetch a user by an ID.
 *
 * @throws Error if there is an issue finding user.
 */
const getUserById = async (uid: string): Promise<SafeUser> => {
  const res = await api.get(`${USER_API_URL}/getUserWithId/${uid}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching user");
  }

  return res.data;
};

export {
  addUser,
  loginUser,
  logoutUser,
  userProfile,
  updateCurrentUser,
  getUserById,
};
