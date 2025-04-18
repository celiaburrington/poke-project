import { useEffect, useState } from "react";
import { setCurrentUser } from "../../../store/reducers/account.reducer";
import { useDispatch } from "react-redux";
import { userProfile } from "../../../services/userService";

/**
 * Initializes a Users Session.
 */
export default function Session({ children }: { children: JSX.Element }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Attempts to fetch a User from the server.
     */
    const fetchProfile = async () => {
      try {
        const currentUser = await userProfile();
        dispatch(setCurrentUser(currentUser));
      } catch (error) {
        console.error(error);
      }
      setPending(false);
    };

    fetchProfile();
  }, []);

  if (pending) {
    return (
      <div className="text-center text-primary">
        <div className="spinner-border m-5" role="status" />
      </div>
    );
  }
  return children;
}
