import { Navigate, Route, Routes } from "react-router";
import { JSX } from "react";
import Home from "./Home";
import { PokeProjectSocket } from "../types/types";
import { SafeUser } from "../types/user.types";
import UserContext from "../contexts/UserContext";
import usePokeProject from "../hooks/usePokeProject";
import LoginContext from "../contexts/LoginContext";
import Login from "./Account/Login";
import Profile from "./Account/Profile";
import Search from "./Search";
import Explore from "./Explore";
import Signup from "./Account/Signup";

const ProtectedRoute = ({
  user,
  socket,
  children,
}: {
  user: SafeUser | null;
  socket: PokeProjectSocket | null;
  children: JSX.Element;
}) => {
  if (!user || !socket) {
    return <Navigate to="/login" />;
  }

  return (
    <UserContext.Provider value={{ user, socket }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Represents the main component of the application.
 */
function PokeProject({ socket }: { socket: PokeProjectSocket | null }) {
  const { user, setUser } = usePokeProject();

  return (
    <LoginContext.Provider value={{ setUser }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:uid" element={<h3>Profile Of Some User</h3>} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:pid" element={<h3>Details for a Pokémon</h3>} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              user={user}
              socket={socket}
              children={<Profile />}
            />
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute
              user={user}
              socket={socket}
              children={<Explore />}
            />
          }
        />
      </Routes>
    </LoginContext.Provider>
  );
}

export default PokeProject;
