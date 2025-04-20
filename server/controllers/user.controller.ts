import express, { Request, Response } from 'express';
import {
  AddUserRequest,
  GetUserByIdRequest,
  GetUserEncountersRequest,
  GetUserRequest,
  LoginRequest,
  SafeUser,
  UpdateUserRequest,
  User,
} from '../types/user.types';
import {
  findFullUser,
  getUserById,
  getUserByUsername,
  saveUser,
  toSafeUser,
  updateUserDetails,
} from '../services/user.service';
import { PokeProjectSocket } from '../types/types';
import { getUserAllEncounters } from '../services/encounter.service';

const userController = (socket: PokeProjectSocket) => {
  const router = express.Router();

  /**
   * Checks if the provided user contains the required fields.
   *
   * @param user The user object to validate.
   *
   * @returns `true` if the user is valid, otherwise `false`.
   */
  function isUserValid(user: User): boolean {
    return !!user.username && !!user.password;
  }

  /**
   * Adds a new user to the database. The add user request and user are validated then saved.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The AddUserRequest object containing the user data.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const addUser = async (req: AddUserRequest, res: Response): Promise<void> => {
    if (!isUserValid(req.body)) {
      res.status(400).send('Invalid user');
      return;
    }

    const userInfo = req.body;

    try {
      const userFromDb = await saveUser(userInfo);

      if ('error' in userFromDb) {
        throw new Error(userFromDb.error as string);
      }

      res.json(userFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches a User from the database by their username.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserRequest object containing the username.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getUser = async (req: GetUserRequest, res: Response): Promise<void> => {
    const { username } = req.params;

    try {
      const userFromDb = await getUserByUsername(username);

      if ('error' in userFromDb) {
        throw new Error(userFromDb.error as string);
      }

      res.json(userFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches a User from the database by their ID.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserRequest object containing the user's ID.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getUserWithId = async (req: GetUserByIdRequest, res: Response): Promise<void> => {
    const { uid } = req.params;

    try {
      const userFromDb = await getUserById(uid);

      if ('error' in userFromDb) {
        throw new Error(userFromDb.error as string);
      }

      res.json(userFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Logs in an existing user. The user is retrieved from the database and checked against the provided password.
   *
   * @param req - The request object containing the user data.
   * @param res - The HTTP response object.
   */
  const loginUser = async (req: LoginRequest, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const user = await findFullUser(username);

      if ('error' in user) {
        res.status(404).send('User not found');
        return;
      }

      if (user.password !== password) {
        res.status(401).send('Invalid password');
        return;
      }

      const safeUser: SafeUser = toSafeUser(user);
      req.session.currentUser = safeUser;

      res.status(200).json(safeUser);
    } catch (error) {
      res.status(500).send('Error while logging in');
    }
  };

  /**
   * Logs out an existing user by destroying the current session.
   *
   * @param req - The request object.
   * @param res - The HTTP response object.
   */
  const logoutUser = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: 'Logout error' });
      } else {
        res.status(200).json({ message: 'Logged out' });
      }
    });
  };

  /**
   * Fetches a SafeUser from the current session. Returns status 401 if session's currentUser not yet set.
   *
   * @param req - The request object.
   * @param res - The HTTP response object.
   * @returns - The SafeUser object if the login is successful, otherwise an error message.
   */
  const userProfile = async (req: Request, res: Response): Promise<void> => {
    const { currentUser } = req.session;

    if (!currentUser) {
      res.status(401).send('Failed to fetch profile');
      return;
    }

    res.status(200).json(currentUser);
  };

  /**
   * Updates a User object in the database.
   *
   * @param req - The UpdateUserRequest object.
   * @param res - The HTTP response object.
   * @returns - The SafeUser object if the update is successful, otherwise an error message.
   */
  const updateUser = async (req: UpdateUserRequest, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { userUpdates } = req.body;

    try {
      let updatedUser;
      if (!userId) {
        const { currentUser } = req.session;
        if (!currentUser || !currentUser._id) {
          throw Error();
        }
        updatedUser = await updateUserDetails(currentUser._id.toString(), userUpdates);
      } else {
        updatedUser = await updateUserDetails(userId, userUpdates);
      }

      if ('error' in updatedUser) {
        throw Error();
      }

      req.session.currentUser = updatedUser;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send('Failed to update user');
    }
  };

  /**
   * Fetches a User's Encounters from the database with the encounter entries populated.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserEncountersRequest object.
   * @param res The response object used to send back the result.
   *
   * @returns A Promise that resolves to void.
   */
  const getUserEncounters = async (req: GetUserEncountersRequest, res: Response): Promise<void> => {
    const { uid } = req.params;

    try {
      const encounterResponse = await getUserAllEncounters(uid);

      if ('error' in encounterResponse) {
        throw new Error(encounterResponse.error as string);
      }

      const encounters = encounterResponse.map(e => {
        if ('error' in e) {
          throw new Error(e.error);
        }
        return e;
      });

      res.json(encounters);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.post('/addUser', addUser);
  router.get('/getUser/:username', getUser);
  router.get('/getUserWithId/:uid', getUserWithId);
  router.post('/login', loginUser);
  router.post('/logout', logoutUser);
  router.post('/userProfile', userProfile);
  router.put('/updateUser/:userId', updateUser);
  router.get('/getUserEncounters/:uid', getUserEncounters);

  return router;
};

export default userController;
