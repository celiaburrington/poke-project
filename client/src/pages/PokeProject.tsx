import { Navigate, Route, Routes } from "react-router";
import { JSX } from "react";
import Home from "./Home";
import Login from "./Account/Login";
import Profile from "./Account/Profile";
import Search from "./Search";
import Explore from "./Explore";
import Signup from "./Account/Signup";
import { useAppSelector } from "../hooks/useTypedRedux";
import { Provider } from "react-redux";
import store from "../store/store";

/**
 * ProtectedRoute component accesses current user from Redux store. If currentUser is not null,
 * returns the child components. Otherwise, navigates user to Login page.
 */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAppSelector((state) => state.accountReducer);

  if (!currentUser) {
    return <Navigate to="/Login" />;
  }

  return children;
};

/**
 * Represents the main component of the application.
 */
function PokeProject() {
  return (
    <Provider store={store}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile/:uid" element={<h3>Profile Of Some User</h3>} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Details/:pid" element={<h3>Details for a Pokémon</h3>} />

        {/* Protected Routes */}
        <Route
          path="/Profile"
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path="/Explore/*"
          element={<ProtectedRoute children={<Explore />} />}
        />
      </Routes>
    </Provider>
  );
}

export default PokeProject;
