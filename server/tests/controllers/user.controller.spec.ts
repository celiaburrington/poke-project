import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import * as util from '../../services/user.service';
import { SafeUser, User, UserResponse } from '../../types/user.types';

const mockUser: User = {
  _id: new mongoose.Types.ObjectId(),
  username: 'mockUser',
  password: 'qwerty123',
  date_joined: new Date(),
};

const mockSafeUser: SafeUser = {
  _id: mockUser._id,
  username: 'mockUser',
  date_joined: new Date(),
};

const mockUserJSONResponse = {
  _id: mockUser._id?.toString(),
  username: 'mockUser',
  date_joined: mockUser.date_joined.toISOString(),
};

const saveUserSpy = jest.spyOn(util, 'saveUser');
const getUserByUsernameSpy = jest.spyOn(util, 'getUserByUsername');
const findFullUserSpy = jest.spyOn(util, 'findFullUser');

describe('User Controller Tests', () => {
  describe('POST /addUser', () => {
    it('should create a new user with given fields', async () => {
      const mockRequestBody = {
        username: 'mockUser',
        password: 'qwerty123',
      };

      saveUserSpy.mockResolvedValueOnce(mockSafeUser as UserResponse);

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserJSONResponse);
      expect(saveUserSpy).toHaveBeenCalledWith(mockRequestBody);
    });

    it('should return response status 400 if given invalid request w/out username', async () => {
      const mockRequestBody = {
        password: 'qwerty123',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 400 if given invalid request with empty username', async () => {
      const mockRequestBody = {
        username: '',
        password: 'qwerty123',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 400 if given invalid request w/out password', async () => {
      const mockRequestBody = {
        username: 'mockUser',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 400 if given invalid request with empty password', async () => {
      const mockRequestBody = {
        username: 'mockUser',
        password: '',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 500 if error occurs while saving the user', async () => {
      const mockRequestBody = {
        username: 'mockUser',
        password: 'qwerty123',
      };

      saveUserSpy.mockResolvedValueOnce({ error: 'Database error' });

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(500);
    });
  });

  describe('GET /getUser/:username', () => {
    it('should return a user with the given username', async () => {
      getUserByUsernameSpy.mockResolvedValueOnce(mockSafeUser as UserResponse);

      const response = await supertest(app).get(`/user/getUser/${mockUser.username}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserJSONResponse);
      expect(getUserByUsernameSpy).toHaveBeenCalledWith(mockUser.username);
    });

    it('should return status 500 if error occurs finding user', async () => {
      getUserByUsernameSpy.mockResolvedValueOnce({ error: 'Database error' });

      const response = await supertest(app).get(`/user/getUser/${mockUser.username}`);

      expect(response.status).toBe(500);
    });

    it('should return status 404 if username not provided', async () => {
      const response = await supertest(app).get(`/user/getUser/`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /login', () => {
    it('should login an existing user', async () => {
      findFullUserSpy.mockResolvedValueOnce(mockUser);
      // Making the request
      const response = await supertest(app).post('/user/login').send({
        username: mockUser.username,
        password: mockUser.password,
      });

      // Asserting the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserJSONResponse);
    });

    it('should return 404 if error finding user', async () => {
      findFullUserSpy.mockResolvedValueOnce({ error: 'User not found' });
      // Making the request
      const response = await supertest(app).post('/user/login').send({
        username: 'fakeUser',
        password: 'abc123',
      });

      // Asserting the response
      expect(response.status).toBe(404);
    });

    it('should return 401 if password is incorrect', async () => {
      findFullUserSpy.mockResolvedValueOnce(mockUser);
      // Making the request
      const response = await supertest(app).post('/user/login').send({
        username: mockUser.username,
        password: 'Wrong Password',
      });

      // Asserting the response
      expect(response.status).toBe(401);
    });

    it('should return status 404 if username not provided', async () => {
      const response = await supertest(app).post(`/user/getUser/`);
      expect(response.status).toBe(404);
    });
  });
});
