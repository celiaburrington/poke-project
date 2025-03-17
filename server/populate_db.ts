import mongoose from 'mongoose';
import UserModel from './model/user';
import { User } from './types/user.types';

// Pass URL of mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/poke_project)
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
  throw new Error('ERROR: You need to specify a valid mongodb URL as the first argument');
}

const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * Creates a new User document in the database.
 *
 * @param username
 * @param password
 *
 * @returns A Promise that resolves to the created User document.
 * @throws An error if any of the parameters are invalid.
 */
async function userCreate(username: string, password: string): Promise<User> {
  if (username === '' || password === '') throw new Error('Invalid User Format');
  const userDetail: User = {
    username: username,
    password: password,
    date_joined: new Date(),
  };
  return await UserModel.create(userDetail);
}
