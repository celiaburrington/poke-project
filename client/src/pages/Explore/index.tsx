import { Route, Routes } from "react-router";
import ExplorePage from "./Explore";
import { ENCOUNTER_LISTS, LOCATIONS } from "./testLocations";
import LocationPage from "./LocationPage";

/**
 * Explore page allowing a User to navigate to a random Location.
 */
export default function Explore() {
  // TODO: fetch locations from server
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      {LOCATIONS.map((loc, i) => (
        <Route
          path={loc.name.replace(/\s/g, "")}
          element={
            <LocationPage
              location={{ ...loc, encounter_list: ENCOUNTER_LISTS[i] }}
            />
          }
        />
      ))}
    </Routes>
  );
}
