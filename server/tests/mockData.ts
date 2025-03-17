import { SafeUser, User } from '../types/user.types';

export const user: User = {
  username: 'mockUser',
  password: 'qwerty123',
  date_joined: new Date(),
};

export const safeUser: SafeUser = {
  username: 'mockUser',
  date_joined: new Date(),
};
