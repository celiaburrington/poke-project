import { Route, Routes } from "react-router";
import ExplorePage from "./Explore";
import LocationPage from "./LocationPage";
import useExplore from "../../hooks/useExplore";

/**
 * Explore page allowing a User to navigate to a random Location.
 */
export default function Explore() {
  const { locations, navToRandomLocation } = useExplore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ExplorePage locations={locations} goExplore={navToRandomLocation} />
        }
      />
      {locations.map((loc) => (
        <Route
          path={loc.name.replace(/\s/g, "")}
          element={
            <LocationPage location={loc} goExplore={navToRandomLocation} />
          }
        />
      ))}
    </Routes>
  );
}
