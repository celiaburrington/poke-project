import { Server } from 'socket.io';

export type PokeProjectSocket = Server<ServerToClientEvents>;

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  example: (argument: string) => void;
}
