import { Server } from 'socket.io';

export type PokeProjectSocket = Server<ServerToClientEvents>;

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  example: (argument: string) => void;
}

/**
 * Type representing a Location where Pokémon can be encountered.
 */
export type Location = {
  id: number;
  name: string;
};
