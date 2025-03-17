import { createContext } from "react";
import { PokeProjectSocket } from "../types/types";
import { SafeUser } from "../types/user.types";

/**
 * Interface represents the context type for user-related data and a WebSocket connection.
 *
 * - user - the current user.
 * - socket - the WebSocket connection associated with the current user.
 */
export interface UserContextType {
  user: SafeUser;
  socket: PokeProjectSocket;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
