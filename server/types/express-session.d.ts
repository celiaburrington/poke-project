import 'express-session';
import { SafeUser } from './user.types';

/**
 * Add custom session field containing the SafeUser object of the logged in user (if any).
 */
declare module 'express-session' {
  interface SessionData {
    currentUser?: SafeUser;
  }
}
