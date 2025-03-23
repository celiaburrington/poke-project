import { Socket } from "socket.io-client";
import store from "../store/store";

export type PokeProjectSocket = Socket<ServerToClientEvents>;

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  example: (argument: string) => void;
}

/**
 * Type of our Application-wide state management Redux store
 */
export type AppStore = typeof store;

/**
 * Infer the `RootState` type from store
 */
export type RootState = ReturnType<AppStore["getState"]>;

/**
 * Infer the `AppDispatch` type from store
 */
export type AppDispatch = AppStore["dispatch"];
