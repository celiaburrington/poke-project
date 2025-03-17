import { Socket } from "socket.io-client";

export type PokeProjectSocket = Socket<ServerToClientEvents>;

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  example: (argument: string) => void;
}
