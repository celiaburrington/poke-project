import { SafeUser, User, UserRole } from '../types/user.types';

export const user: User = {
  username: 'mockUser',
  password: 'qwerty123',
  role: UserRole.NewUser,
  date_joined: new Date(),
  encounters: [],
};

export const safeUser: SafeUser = {
  username: user.username,
  role: user.role,
  date_joined: user.date_joined,
  encounters: user.encounters,
};
