import express, { Response } from 'express';
import { AddUserRequest, GetUserRequest, LoginRequest, SafeUser, User } from '../types/user.types';
import { findFullUser, getUserByUsername, saveUser, toSafeUser } from '../services/user.service';
import { PokeProjectSocket } from '../types/types';

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
   * Logs in an existing user. The user is retrieved from the database and checked against the provided password.
   *
   * @param req - The request object containing the user data.
   * @param res - The HTTP response object.
   * @returns - The SafeUser object if the login is successful, otherwise an error message.
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

      res.status(200).json(safeUser);
    } catch (error) {
      res.status(500).send('Error while logging in');
    }
  };

  // Routes
  router.post('/addUser', addUser);
  router.get('/getUser/:username', getUser);
  router.post('/login', loginUser);

  return router;
};

export default userController;
