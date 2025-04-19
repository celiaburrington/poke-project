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
import Session from "./Account/components/Session";
import PublicProfile from "./Account/PublicProfile";

/**
 * ProtectedRoute component accesses current user from Redux store. If currentUser is not null,
 * returns the child components. Otherwise, navigates user to page given by _redirect_.
 */
const ProtectedRoute = ({
  children,
  redirect,
}: {
  children: JSX.Element;
  redirect: string;
}) => {
  const { currentUser } = useAppSelector((state) => state.accountReducer);

  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to={`/${redirect}`} />;
  }

  return children;
};

/**
 * Represents the main component of the application.
 */
function PokeProject() {
  return (
    <Provider store={store}>
      <div className="mb-3"></div>
      <Session>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile/:uid" element={<PublicProfile />} />
          <Route path="/Search" element={<Search />} />
          <Route
            path="/Details/:pid"
            element={<h3>Details for a Pokémon</h3>}
          />

          {/* Protected Routes */}
          <Route
            path="/Profile"
            element={<ProtectedRoute redirect="Home" children={<Profile />} />}
          />
          <Route
            path="/Explore/*"
            element={<ProtectedRoute redirect="Login" children={<Explore />} />}
          />
        </Routes>
      </Session>
      <div className="mt-3"></div>
    </Provider>
  );
}

export default PokeProject;
