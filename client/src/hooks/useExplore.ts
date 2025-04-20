import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocations } from "../services/locationService";
import { Location } from "../types/location.types";

/**
 * Custom hook to populate locations from the database and handle 'traveling' to random locations.
 */
const useExplore = () => {
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

  return {
    locations,
    navToRandomLocation,
  };
};

export default useExplore;
