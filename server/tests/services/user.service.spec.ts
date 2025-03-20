import UserModel from '../../models/user.model';
import { findFullUser, getUserByUsername, saveUser, toSafeUser } from '../../services/user.service';
import { SafeUser, User } from '../../types/user.types';
import { user, safeUser } from '../mockData';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

describe('User model', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('toSafeUser', () => {
    it('should return the given user without the password field', () => {
      const result = toSafeUser(user);
      expect(result).toEqual(safeUser);
    });
  });

  describe('saveUser', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should return the saved user', async () => {
      mockingoose(UserModel).toReturn(user, 'create');

      const savedUser = (await saveUser(user)) as SafeUser;

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toEqual(user.username);
    });

    it('should return error message if error saving User', async () => {
      jest
        .spyOn(UserModel, 'create')
        .mockRejectedValueOnce(() => new Error('Error saving document'));

      const result = await saveUser(user);

      expect('error' in result).toBeTruthy();
    });
  });

  describe('getUserByUsername', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should return the user with the given username', async () => {
      mockingoose(UserModel).toReturn(safeUser, 'findOne');

      const fetchedUser = (await getUserByUsername(user.username)) as SafeUser;

      expect(fetchedUser.username).toEqual(user.username);
    });

    it('should return error message if user not found', async () => {
      mockingoose(UserModel).toReturn(null, 'findOne');

      const result = await getUserByUsername(user.username);

      expect('error' in result).toBeTruthy();
    });

    it('should return error message if error occurs when finding user', async () => {
      mockingoose(UserModel).toReturn(new Error('Database error'), 'findOne');

      const result = await getUserByUsername(user.username);

      expect('error' in result).toBeTruthy();
    });
  });

  describe('getFullUser', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should return the user with the given username', async () => {
      mockingoose(UserModel).toReturn(user, 'findOne');

      const fetchedUser = (await findFullUser(user.username)) as User;

      expect(fetchedUser.username).toEqual(user.username);
      expect(fetchedUser.password).toEqual(user.password);
    });

    it('should return error message if user not found', async () => {
      mockingoose(UserModel).toReturn(null, 'findOne');

      const result = await findFullUser(user.username);

      expect('error' in result).toBeTruthy();
    });

    it('should return error message if error occurs when finding user', async () => {
      mockingoose(UserModel).toReturn(new Error('Database error'), 'findOne');

      const result = await findFullUser(user.username);

      expect('error' in result).toBeTruthy();
    });
  });
});
