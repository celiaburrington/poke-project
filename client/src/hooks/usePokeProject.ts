import { useState } from "react";
import { SafeUser } from "../types/user.types";

/**
 * Custom hook to manage the state and logic of PokéProject.
 *
 * @param socket - the WebSocket connection associated with the current user.
 * @returns user - the user currently logged in
 * @returns setUser - function to set the currently logged in user
 */
const usePokeProject = () => {
  const [user, setUser] = useState<SafeUser | null>(null);

  return { user, setUser };
};

export default usePokeProject;
