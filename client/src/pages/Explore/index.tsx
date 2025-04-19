import { Route, Routes, useNavigate } from "react-router";
import ExplorePage from "./Explore";
import LocationPage from "./LocationPage";
import { useEffect, useState } from "react";
import { Location } from "../../types/location.types";
import { fetchLocations } from "../../services/locationService";

/**
 * Explore page allowing a User to navigate to a random Location.
 */
export default function Explore() {
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();

  /**
   * Navigates the user to a random location.
   */
  const navToRandomLocation = () => {
    if (!locations) {
      return;
    }
    const randLoc = Math.floor(Math.random() * locations.length);
    navigate(`/Explore/${locations[randLoc].name.replace(/\s/g, "")}`);
  };

  useEffect(() => {
    /**
     * Fetch all locations from the server.
     */
    const getLocations = async () => {
      try {
        const locs: Location[] = await fetchLocations();
        setLocations(locs);
      } catch (error) {
        console.log(error);
      }
    };

    getLocations();
  }, []);

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
